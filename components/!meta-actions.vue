<script setup>
// Composables
import { scrollIntoView } from "@/composables/helpers/client-only/scroll";
const skipToContent = () => {
  if (import.meta.server) return;

  const anchor = document.getElementById("main");
  if (anchor) {
    anchor.focus();
    scrollIntoView(anchor);
  }
};
</script>

<template>
  <div class="meta-actions">
    <a
      @click.prevent="skipToContent"
      href="#main"
      class="skip-link sr-only sr-only-focusable"
    >Skip to Content</a>
  </div>
</template>

<style lang="scss">
.meta-actions {
  position: fixed;
  z-index: 999;
  background: var(--alt-background);
  color: var(--alt-text);

  * {
    color: var(--alt-text);
  }

  &:active,
  &:focus,
  &:focus-within {
    padding: 1rem 0.5rem;
  }
}
</style>
