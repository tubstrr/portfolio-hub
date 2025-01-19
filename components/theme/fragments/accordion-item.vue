<script setup>
// Helpers
import { makeUID } from "@/composables/helpers/makeUID";

// Props
const { index, speed, single } = defineProps({
  index: {
    type: Number,
    required: true,
  },
  speed: {
    type: Number,
    required: false,
    default: 400,
  },
  single: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const { $bus } = useNuxtApp();
const open = ref(false);
const hide = ref(false);

const ID = makeUID();

const toggle = () => {
  if (single) {
    $bus.emit("close-accordions", ID);
  }
  if (open.value) {
    hide.value = true;
    setTimeout(() => {
      open.value = false;
      hide.value = false;
    }, speed);
    return;
  } else {
    hide.value = false;
    open.value = true;
    return;
  }
};

onMounted(() => {
  if (single) {
    $bus.on("close-accordions", (id) => {
      if (id === ID) {
        return;
      }
      hide.value = true;
      setTimeout(() => {
        open.value = false;
        hide.value = false;
      }, speed);
    });
  }
});

onBeforeUnmount(() => {
  if (single) {
    $bus.off("close-accordions");
  }
});
</script>

<!-- I use v-show for the inner body content because if there are any links inside it and the item is closed, there will be no focus trap. -->
<!-- You could use aria-hidden, but this would still allow hidden links to be focusable, so you'd have to loop through and manually set tabindexes on all the links. -->
<template>
  <li
    class="accordion-item"
    :class='`${open ? "opened" : "closed"} ${hide ? "hide" : ""}`'
  >
    <button
      :aria-expanded="open.toString()"
      :aria-controls='"sect" + index'
      @click="toggle"
      class="accordion-button"
    >
      <slot name="title" />
    </button>

    <div
      role="region"
      :id='"sect" + index'
      class="wrapper"
      :style="`--speed: ${speed}ms ease-in-out;`"
    >
      <div class="body-inner">
        <slot name="body" />
      </div>
    </div>
  </li>
</template>

<style lang="scss">
.theme-accordion {
  .accordion-item {
    .accordion-button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }

    .wrapper {
      overflow: hidden;
      display: grid;
      grid-template-rows: 0fr;
      transition: var(--speed);

      .body-inner {
        overflow: hidden;
      }
    }

    &.opened {
      .wrapper {
        grid-template-rows: 1fr;
      }
    }

    &.hide {
      .wrapper {
        grid-template-rows: 0fr;
      }
    }

    &.closed {
      .wrapper {
        .body-inner {
          display: none;
        }
      }
    }
  }
}
</style>
