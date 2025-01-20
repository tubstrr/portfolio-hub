<script setup>
const { name } = defineProps(["name"]);
</script>

<template>
  <section class="block" :class="name" :id="`block-${name}`" tabindex="-1">
    <slot />
  </section>
</template>

<style>
.block {
  max-width: calc(100 * var(--vw));
  overflow: clip;
}
</style>
