<script setup>
const props = defineProps({
  items: {
    type: Object,
    required: false,
  },
  bullets: {
    type: Boolean,
    required: false,
    default: true,
  },
  single: {
    type: Boolean,
    required: false,
    default: false,
  },
  bulletStyle: {
    type: String,
    required: false,
    default: "primary",
    validator: (value) => {
      return ["primary", "secondary"].includes(value);
    },
  },
  arrowPrefix: {
    type: String,
    required: false,
    default: "chevron",
  },
});

const { items, bullets, bulletStyle, single } = toRefs(props);
const isSingle = ref(single.value);

// Variables
const active = ref(0);

const itemsRef = ref([]);
const itemHeight = ref("auto");
const itemsWrapperRef = ref(null);
const scrollWidth = ref({});

const { $bus } = useNuxtApp();
const observer = ref(null);

const debounceTimeout = ref(null);
const debounce = (index) => {
  clearTimeout(debounceTimeout.value);
  // 60fps is 1 frame every 16ms
  const frame = 16;
  debounceTimeout.value = setTimeout(() => {
    setItemHeight(index);
  }, frame * 4);
};

const setUpIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
  };

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        active.value = parseInt(entry.target.dataset.index);
      }
    });
  }, options);

  itemsRef.value.forEach((item) => {
    observer.value.observe(item);
  });
};

const setScrollWidth = (pass = 0) => {
  if (pass > 10) return;
  const width = itemsWrapperRef.value.getBoundingClientRect().width;
  if (width === 0) return setTimeout(() => setScrollWidth(pass + 1), 100);
  scrollWidth.value.scroll =
    itemsWrapperRef.value.getBoundingClientRect().width;
  return scrollWidth.value.scroll;
};

const updateActive = (index) => {
  let value = parseInt(index);

  // Make an infinite loop for arrows
  if (index < 0) value = items.value.length - 1;
  else if (index >= items.value.length) value = 0;

  // Get the scroll width
  const scrollTo = scrollWidth.value.scroll * value;
  itemsWrapperRef.value.scrollTo({
    left: scrollTo,
    behavior: "smooth",
  });
  // Update Active
  active.value = value;

  // NOTE: Since we are listing to the scroll event,
  // we don't need to update the height here.
  // See debounce function above.
};

const setItemHeight = (index, depth = 0) => {
  const item = itemsRef.value[index];
  if (depth > 100) return;
  if (!item) return setTimeout(() => setItemHeight(index, depth + 1), 100);
  const currentItemHeight = item.offsetHeight;
  if (currentItemHeight === 0) {
    return setTimeout(() => setItemHeight(index, depth + 1), 100);
  }
  itemHeight.value = `${currentItemHeight + 20}px`;
};

if (items.value.length <= 1) {
  isSingle.value = true;
}

const debounceTimer = ref(null);
const checkHeight = () => {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    setItemHeight(active.value);
  }, 500);
};

// Lifecycle
onMounted(() => {
  checkHeight();
  const resizeObserver = new ResizeObserver(() => {
    checkHeight();
  });

  resizeObserver.observe(itemsWrapperRef.value);
  resizeObserver.observe(itemsRef.value[0]);

  setUpIntersectionObserver();
  setScrollWidth();
  setTimeout(() => {
    setItemHeight(0);
  }, 250);
  $bus.on("resize", ($event) => {
    setScrollWidth();
  });
  itemsWrapperRef.value.addEventListener(
    "scroll",
    () => debounce(active.value),
  );
});

onBeforeUnmount(() => {
  if (process.client) {
    itemsRef.value = [];
    itemsWrapperRef.value = null;
    scrollWidth.value = {};
    if (observer.value) {
      observer.value.disconnect();
    }
    $bus.off("resize");
    if (itemsWrapperRef.value) {
      itemsWrapperRef.value.removeEventListener(
        "scroll",
        () => debounce(active.value),
      );
    }
  }
});
</script>

<template>
  <section
    class="theme-carousel"
    :class='isSingle ? "single" : ""'
    :style="`--height: ${itemHeight};`"
  >
    <ul class="carousel-inner" ref="itemsWrapperRef">
      <li
        v-for="(item, index) in items"
        :key="item"
        class="carousel-item"
        ref="itemsRef"
        :data-index="index"
      >
        <slot name="item" v-bind="[item, index]" />
      </li>
    </ul>
    <div class="scroll-container">
      <button
        :class='["arrow left", bulletStyle]'
        @click="updateActive(active - 1)"
      >
        <TSvg :type="`${arrowPrefix}Left`" />
      </button>
      <ul v-if="bullets && !isSingle" :class='["bullets", bulletStyle]'>
        <li v-for="index in items.length" :key="`bullet-${index}`">
          <button
            class="bullet"
            :class="{ active: active === index - 1 }"
            @click="updateActive(index - 1)"
          />
        </li>
      </ul>
      <button
        :class='["arrow right", bulletStyle]'
        @click="updateActive(active + 1)"
      >
        <TSvg :type="`${arrowPrefix}Right`" />
      </button>
    </div>
  </section>
</template>

<style lang="scss">
.theme-carousel {
  position: relative;
  width: calc(100% + 2rem);
  margin-left: -1rem;

  .carousel-inner {
    display: flex;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;
    align-items: flex-start;
    height: var(--height);
    transition: height 350ms ease;

    &::-webkit-scrollbar {
      display: none;
    }

    .carousel-item {
      flex: 0 0 100%;
      scroll-snap-align: start;
      padding: 0 1rem;
    }
  }

  .scroll-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
    position: relative;
    margin-top: 1rem;
    * {
      z-index: 1;
    }
  }

  .arrows {
    position: relative;
    display: flex;
    gap: 5rem;
    margin-bottom: 0.5rem;
    .arrow {
      height: 2rem;
      width: 1rem;
      color: black;
      position: relative;
      svg {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .bullets {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
    max-width: 80vw;

    &.primary {
      .bullet {
        display: inline-block;
        width: 5.5rem;
        height: 2px;
        background-color: #dedede;
        transition: 200ms ease-in-out;
        cursor: pointer;

        &:hover,
        &.active {
          background-color: black;
        }
      }
    }
    &.secondary {
      .bullet {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #dedede;
        border: 1px solid #adadad;
        transition: opacity 0.2s ease-in-out;
        cursor: pointer;

        &:hover,
        &.active {
          opacity: 1;
          background-color: black;
          border: none;
        }
      }
    }
  }

  &.single {
    .arrow {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .carousel {
    overflow: hidden;
    .arrow {
      --offset: calc(100% + 0.333em);
    }
    .bullets.primary {
      .bullet {
        width: 2rem;
      }
    }
  }
}
</style>
