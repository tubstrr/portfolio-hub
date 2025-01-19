<script setup>
const { $bus } = useNuxtApp();
const props = defineProps({
  opened: {
    type: Boolean,
    required: true,
  },
});

// Props
const { opened } = toRefs(props);

// Emits
const emit = defineEmits(["close"]);

// Events
const handleClose = () => {
  emit("close");
};

// Watchers
watch(opened, (value) => {
  if (value) $bus.emit("scroll-lock");
  else $bus.emit("scroll-unlock");
});
</script>

<template>
  <Teleport to="body" v-if="opened">
    <FocusTrap>
      <div class="theme-modal" @click.self="handleClose">
        <div class="body">
          <button @click="handleClose" class="close">
            <slot name="close" />
          </button>
          <slot name="content" />
        </div>
      </div>
    </FocusTrap>
  </Teleport>
</template>

<style lang="scss">
.theme-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;

  backdrop-filter: blur(5px);

  cursor: pointer;
  overflow-y: auto;

  .body {
    cursor: auto;
    position: relative;

    .close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
