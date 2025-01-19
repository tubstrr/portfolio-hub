<template>
  <div class="theme-focus-lock">
    <div :tabindex="tabindex" @focus='focusOut("start")'></div>

    <slot></slot>

    <div :tabindex="tabindex" @focus='focusOut("end")'></div>
  </div>
</template>

<script setup>
const props = defineProps({
  showing: {
    type: Boolean,
    required: true,
  },
});

const focusLockRef = ref(null);

const tabindex = computed(() => {
  return showing.value ? 0 : -1;
});

const focusOut = (fromDirection) => {
  if (showing.value) {
    const focusable = focusLockRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = focusable[1];
    const lastFocusable = focusable[focusable.length - 2];

    if (fromDirection === "start") {
      lastFocusable.focus();
    } else {
      firstFocusable.focus();
    }
  }
};
</script>
