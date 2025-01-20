<script setup>
const { $bus } = useNuxtApp();

const { video_url } = defineProps({
  video_url: {
    type: [String, Boolean],
    default: false,
  },
});

const showVideo = ref(false);

const checkURL = (url) => {
  return window.assetsResolved && window.assetsResolved[url] || false;
};

const allowVideo = computed(() => {
  if (import.meta.server) return false;
  const hasClass = document.documentElement.classList.contains(
    "force-asset-preload",
  );

  const hasVideo = checkURL(`/projects/${video_url}`);

  return hasClass || showVideo.value || hasVideo;
});

$bus.on("force-asset-preload-finished", () => {
  showVideo.value = true;
});
$bus.on("asset-resolved", (payload) => {
  if (payload === `/projects/${video_url}`) showVideo.value = true;
});

const mp4ToWebP = (url) => {
  return url.replace(".mp4", ".webp");
};

onBeforeUnmount(() => {
  $bus.off("force-asset-preload-finished");
  $bus.off("asset-resolved");
});
</script>

<!-- https://frame-extractor.com/ s -->
<template>
  <div class="asset-card">
    <video
      v-if="allowVideo"
      muted
      autoplay
      loop
      :poster="`/projects/${mp4ToWebP(video_url)}`"
    >
      <source :src="`/projects/${video_url}`" type="video/mp4" />
    </video>
    <TImage v-else :src="`/projects/${mp4ToWebP(video_url)}`" />
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

  .theme-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    // position: absolute;
    // top: 0;
    // left: 0;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    // position: absolute;
    // top: 0;
    // left: 0;
  }
}
</style>
