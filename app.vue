<script setup>
// Composables
import { setupTheme } from "@/composables/useTheme";
const { $bus } = useNuxtApp();

// Content
import { categories } from "@/assets/cms";

// Consts
const hasStarted = ref(false);

// Methods
const resolveURL = (url) => {
  $bus.emit("asset-resolved", url);
  window.assetsResolved[url] = true;
};

const forceLoadImage = async (url) => {
  const img = new Image();
  window.assetsResolved[url] = false;
  img.src = url;

  return new Promise((resolve) => {
    img.onload = resolve;
    img.onerror = resolve;
    img.onabort = resolve;
    resolveURL(url);
  });
};

const forceLoadVideo = async (url) => {
  const video = document.createElement("video");
  window.assetsResolved[url] = false;
  video.src = url;
  return new Promise((resolve) => {
    video.oncanplaythrough = resolve;
    video.load();
    video.onabort = resolve;
    video.onerror = resolve;
    resolveURL(url);
  });
};

const forceAssetPreload = () => {
  if (hasStarted.value) return;
  hasStarted.value = true;
  $bus.emit("force-asset-preload-start");
  window.assetsResolved = {};

  const video_assets = [];
  const posters_assets = [];

  for (const category of categories) {
    for (const project of category.projects) {
      if (project.video_url) {
        video_assets.push(`/projects/${project.video_url}`);
        posters_assets.push(
          `/projects/${project.video_url.replace(".mp4", ".webp")}`,
        );
      }
    }
  }

  async function loadAssets() {
    for (const url of posters_assets) {
      await forceLoadImage(url);
    }

    for (const url of video_assets) {
      await forceLoadVideo(url);
    }
  }

  loadAssets().then(() => {
    $bus.emit("force-asset-preload-finished");
    document.documentElement.classList.add("force-asset-preload");
  });
};

const setViewPort = () => {
  const root = document.documentElement;
  root.style.setProperty("--vh", `${window.innerHeight / 100}px`);
  root.style.setProperty("--vw", `${window.innerWidth / 100}px`);
};

// Lifecycle
setupTheme();

onMounted(() => {
  window.addEventListener("scroll", forceAssetPreload);
  window.addEventListener("resize", setViewPort);
  setViewPort();
});
</script>

<template>
  <div id="root">
    <MetaActions />

    <Header />
    <main id="main" tabindex="-1">
      <Hero />
      <Projects />
      <Bio />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/main.scss";

:root {
  --vw: 1vw;
}

#root, html {
  // background: var(--white);
  background: var(--header-background);
  body {}
}

#main {
  background: var(--background);
  position: relative;

  section.section {
    min-height: 100vh;
  }
}
</style>
