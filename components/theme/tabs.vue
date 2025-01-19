<script setup>
import { scrollIntoView } from "@/composables/helpers/client-only/scroll";

const { labelledbyID, tabs } = defineProps({
  labelledbyID: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array,
    required: true,
  },
});

const activeTabIndex = ref(1);
const getClasses = (index) => {
  return {
    tab: true,
    "is-hidden": activeTabIndex.value !== index,
    left: activeTabIndex.value > index,
    right: activeTabIndex.value < index,
  };
};

const handleClick = (index) => {
  activeTabIndex.value = index;

  if (process.server) return;

  const tablist = document.getElementById(`${labelledbyID}-button-wrapper`);
  const activeButton = document.getElementById(`${labelledbyID}-tab-${index}`);

  if (activeButton) {
    activeButton.focus();
    scrollIntoView(activeButton);
    const buttonWidth = activeButton.clientWidth;
    tablist.scrollLeft = buttonWidth * (index - 1);
  }

  // Scroll tablist horizontally to button index

  updateHeight();
};

const height = ref(0);
const updateHeight = () => {
  if (process.server) return;

  const tab = document.getElementById(
    `${labelledbyID}-tabpanel-${activeTabIndex.value}`,
  );
  if (tab) {
    height.value = tab.clientHeight;
  }
};

const debounceTimer = ref(null);
const checkHeight = () => {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    updateHeight();
  }, 500);
};

const tabsWrapper = ref(null);
onMounted(() => {
  checkHeight();
  const resizeObserver = new ResizeObserver(() => {
    checkHeight();
  });

  resizeObserver.observe(tabsWrapper.value);
});

onBeforeUnmount(() => {
  if (process.client) {
    tabsWrapper.value = null;
  }
});

const prev = () => {
  if (activeTabIndex.value > 1) {
    handleClick(activeTabIndex.value - 1);
  } else {
    handleClick(tabs.length);
  }
};
const next = () => {
  if (activeTabIndex.value < tabs.length) {
    handleClick(activeTabIndex.value + 1);
  } else {
    handleClick(1);
  }
};
</script>

<template>
  <section class="theme-tabs" ref="tabsWrapper">
    <div
      role="tablist"
      :aria-labelledby="labelledbyID"
      class="tab-names"
      :id="`${labelledbyID}-button-wrapper`"
    >
      <button
        v-for="(item, index) in tabs"
        :id="`${labelledbyID}-tab-${index + 1}`"
        type="button"
        role="tab"
        :tabindex="activeTabIndex == index + 1 ? 0 : -1"
        :aria-selected='`${activeTabIndex == index + 1 ? "true" : "false"}`'
        :aria-controls="`${labelledbyID}-tabpanel-${index + 1}`"
        :class="{ active: activeTabIndex == index + 1 }"
        @click="handleClick(index + 1)"
        @keyup.left="prev"
        @keyup.right="next"
      >
        <slot name="tab-title" v-bind="[item, index + 1]" />
      </button>
    </div>

    <div class="tab-container" :style="`--height: ${height}px`">
      <div
        :ref="`tabpanel-${index + 1}`"
        v-for="(item, index) in tabs"
        :id="`${labelledbyID}-tabpanel-${index + 1}`"
        :tabindex="activeTabIndex == index + 1 ? 0 : -1"
        role="tabpanel"
        :aria-hidden='`${activeTabIndex == index + 1 ? "false" : "true"}`'
        :aria-labelledby="`tab-${index + 1}`"
        :class="getClasses(index + 1)"
      >
        <slot name="tab-content" v-bind="[item, index + 1]" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@use "@/assets/styles/variables/breakpoints" as *;

.theme-tabs {
  .tab-container {
    height: var(--height);
    transition: 350ms ease;
    position: relative;
    overflow-x: clip;
    width: 100%;
    .tab {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: 500ms ease 250ms;
      transform: translate(0, 0);
      opacity: 1;
      &.is-hidden {
        opacity: 0;
      }
      &.left {
        transform: translate(-100%, 0);
      }
      &.right {
        transform: translate(100%, 0);
      }
    }
  }
  @media (max-width: $tablet) {
    .tab-names[role="tablist"] {
      flex-wrap: nowrap;
      justify-content: flex-start;

      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: none;
      scrollbar-width: none;
      align-items: flex-end;

      &::-webkit-scrollbar {
        display: none;
      }

      button {
        flex-shrink: 0;
        scroll-snap-align: center;
        width: 55%;
      }
    }
  }
}
</style>
