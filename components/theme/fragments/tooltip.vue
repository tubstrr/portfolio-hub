<script setup>
const { position, alignment, padding } = defineProps({
  position: {
    type: String,
    default: "top",
    validator: (value) => ["top", "right", "bottom", "left"].includes(value),
  },
  alignment: {
    type: String,
    default: "center",
    validator: (value) => ["start", "center", "end"].includes(value),
  },
  padding: {
    type: Number,
    default: 20,
  },
});

const showing = ref(false);
const triggerRef = ref(null);
const tooltipRef = ref(null);

const toggleBubble = () => {
  showing.value = !showing.value;
};

const closeAndFocus = () => {
  showing.value = false;
  triggerRef.value.focus();
};

onMounted(() => {
  if (process.client) {
    document.addEventListener("click", function (e) {
      if (showing.value) {
        nextTick(() => {
          if (!tooltipRef?.value?.contains(e.target)) {
            closeAndFocus();
          }
        });
      }
    });
  }
});
</script>

<template>
  <div
    class="theme-tooltip"
    ref="tooltipRef"
    :data-position="position"
    :data-alignment="alignment"
  >
    <button
      type="button"
      aria-label="More Information"
      class="toggle-button"
      @click="toggleBubble"
      @keyup.esc="closeAndFocus"
      ref="triggerRef"
      :style="`padding: ${padding}px`"
    >
      <slot name="trigger" />
    </button>
    <div class="tooltip-bubble" role="status" v-show="showing">
      <button
        class="x-button"
        type="button"
        aria-label="Close help text bubble"
        @click="closeAndFocus"
      >
        <span aria-hidden="true">&#x2715;</span>
      </button>
      <div class="tooltip-inner">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.theme-tooltip {
  position: relative;
  display: inline-block;

  button.toggle-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .tooltip-bubble {
    position: absolute;
    padding: 20px;

    .x-button {
      position: absolute;
      right: 2px;
      top: 2px;
    }

    .tooltip-inner {
      position: relative;
    }
  }

  &[data-position="top"][data-alignment="start"] {
    .tooltip-bubble {
      bottom: 100%;
      left: 0;
    }
  }

  &[data-position="top"][data-alignment="center"] {
    .tooltip-bubble {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &[data-position="top"][data-alignment="end"] {
    .tooltip-bubble {
      bottom: 100%;
      right: 0;
    }
  }

  &[data-position="right"][data-alignment="start"] {
    .tooltip-bubble {
      top: 0;
      left: 100%;
    }
  }

  &[data-position="right"][data-alignment="center"] {
    .tooltip-bubble {
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
    }
  }

  &[data-position="right"][data-alignment="end"] {
    .tooltip-bubble {
      bottom: 0;
      left: 100%;
    }
  }

  &[data-position="bottom"][data-alignment="start"] {
    .tooltip-bubble {
      top: 100%;
      left: 0;
    }
  }

  &[data-position="bottom"][data-alignment="center"] {
    .tooltip-bubble {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &[data-position="bottom"][data-alignment="end"] {
    .tooltip-bubble {
      top: 100%;
      right: 0;
    }
  }

  &[data-position="left"][data-alignment="start"] {
    .tooltip-bubble {
      top: 0;
      right: 100%;
    }
  }

  &[data-position="left"][data-alignment="center"] {
    .tooltip-bubble {
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
    }
  }

  &[data-position="left"][data-alignment="end"] {
    .tooltip-bubble {
      bottom: 0;
      right: 100%;
    }
  }
}
</style>
