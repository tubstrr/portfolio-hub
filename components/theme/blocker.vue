<script setup>
// Variables
const loading = ref(true);

// Nuxt Hooks
useNuxtApp().hook("page:finish", () => {
  loading.value = false;
});
</script>

<template>
  <div id="blocker" v-if="loading" />
</template>

<style lang="scss">
#blocker {
  background-color: black;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999999;
  display: block;
  opacity: 0.01;
}
</style>
