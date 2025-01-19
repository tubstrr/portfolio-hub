<script setup>
const { name } = defineProps(["name"]);
</script>

<template>
  <section class="block" :class="name" :id="`block-${name}`" tabindex="-1">
    <slot />
  </section>
</template>
