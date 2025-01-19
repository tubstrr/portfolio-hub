<script setup>
const { video_url } = defineProps({
  video_url: {
    type: [String, Boolean],
    default: false,
  },
});
</script>

<template>
  <div class="asset-card">
    <video muted autoplay loop>
      <source :src="`/projects/${video_url}`" type="video/mp4" />
    </video>
  </div>
</template>

<style lang="scss">
.asset-card {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: clip;
  border: 1px solid var(--project-color);
  border-radius: 0.25rem;
  box-shadow: 5px 10px 15px -10px var(--alt-background);

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
