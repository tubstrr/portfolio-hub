<script setup>
// Composables
import { scrollIntoView } from "@/composables/helpers/client-only/scroll";
const skipToContent = () => {
  if (process.server) return;

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
  top: 0;
  left: 0;
  z-index: 11;

  .skip-link {
    color: rgb(255, 255, 255);
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 700;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    background: rgb(9, 52, 118);
    padding: 8px;
  }
}
</style>
