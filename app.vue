<script setup>
// Composables
import { setupTheme } from "@/composables/useTheme";
const { $bus } = useNuxtApp();

// Content
import { categories } from "@/assets/cms";

// Consts
const DEBUG = true;

const hasStarted = ref(false);

const heroBlock = ref(null);
const projectsBlock = ref(null);
const bioBlock = ref(null);

const heroBlockMeta = ref({});
const projectsBlockMeta = ref({});
const bioBlockMeta = ref({});
const scrollY = ref(0);
const animationState = ref("showing-hero");
const progress = ref(0);

// Methods
const getPercentage = (value, total) => (value / total) * 100;

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

const updateAnimationState = () => {
  if (!window.animationState) window.animationState = { state: "showing-hero" };

  window.animationState.scrollY = window.scrollY;

  const heroBlockRect = heroBlock?.value?.$el?.getBoundingClientRect();
  const projectsBlockRect = projectsBlock?.value?.$el?.getBoundingClientRect();
  const bioBlockRect = bioBlock?.value?.$el?.getBoundingClientRect();

  const screenHeight = window.innerHeight;
  const halfScreen = screenHeight / 2;
  const quarterScreen = halfScreen / 2;
  const threeFourthsScreen = halfScreen + quarterScreen;

  const showHero = heroBlockRect.top <= 0;
  const transitioningToProjects = heroBlockRect.bottom <= threeFourthsScreen;
  const showProjects = projectsBlockRect.top <= halfScreen;
  const transitioningToBio = projectsBlockRect.bottom <= quarterScreen;
  const showBio = bioBlockRect.top <= 0;

  const states = [
    [showBio, "showing-bio"],
    [transitioningToBio, "transitioning-to-bio"],
    [showProjects, "showing-projects"],
    [transitioningToProjects, "transitioning-to-projects"],
    [showHero, "showing-hero"],
  ];

  window.animationState.state = states.find(([condition]) => condition)?.[1] ||
    "showing-hero";

  if (window.animationState.state.includes("transitioning-to")) {
    const to = window.animationState.state.split("-to-").pop();
    let distanceToGo = 0;

    switch (to) {
      case "bio":
        distanceToGo = bioBlockRect.top;
        if (distanceToGo < 0) {
          window.animationState.progress = 1;
        } else {
          const startPixels = screenHeight + screenHeight +
            projectsBlockRect.height - quarterScreen;
          const endPixels = screenHeight + quarterScreen; // 3500~
          const normalize = getPercentage(
            window.scrollY - startPixels,
            endPixels,
          );
          window.animationState.progress = Math.max(0, normalize);
        }
        break;
      case "projects":
        distanceToGo = projectsBlockRect.top;
        if (distanceToGo < 0) {
          window.animationState.progress = 1;
        } else {
          const startPixels = quarterScreen;
          const endPixels = heroBlockRect.height + screenHeight -
            threeFourthsScreen;
          const normalize = getPercentage(
            window.scrollY - startPixels,
            endPixels,
          );
          window.animationState.progress = Math.max(0, normalize);
        }
        break;
    }
  } else {
    window.animationState.progress = 0;
  }

  if (DEBUG) {
    progress.value = window.animationState.progress;
    animationState.value = window.animationState.state;

    heroBlockMeta.value = {
      top: heroBlockRect.top,
      bottom: heroBlockRect.bottom,
      height: heroBlockRect.height,
    };

    projectsBlockMeta.value = {
      top: projectsBlockRect.top,
      bottom: projectsBlockRect.bottom,
      height: projectsBlockRect.height,
    };

    bioBlockMeta.value = {
      top: bioBlockRect.top,
      bottom: bioBlockRect.bottom,
      height: bioBlockRect.height,
    };
    scrollY.value = window.scrollY;
  }
};

// Lifecycle
setupTheme();

onMounted(() => {
  window.addEventListener("scroll", forceAssetPreload);
  updateAnimationState();
  window.addEventListener("scroll", updateAnimationState);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", forceAssetPreload);
  window.removeEventListener("scroll", updateAnimationState);
});
</script>

<template>
  <div id="root">
    <MetaActions />

    <Header />
    <main id="main" tabindex="-1">
      <ClientOnly>
        <pre
          class="debug"
        >
{
  "animationState": {{animationState}},
  "progress": {{progress}},
  "scrollY": {{scrollY}},
  "heroBlock": {{heroBlockMeta}},
  "projectsBlock": {{projectsBlockMeta}},
  "bioBlock": {{bioBlockMeta}}
}</pre
        >
      </ClientOnly>
      <Blobs />
      <Hero ref="heroBlock" />
      <Projects ref="projectsBlock" />
      <Bio ref="bioBlock" />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/main.scss";

:root {
  --vw: 1vw;
  --vh: calc(
    (100vh - env(safe-area-inset-bottom) - env(safe-area-inset-top)) / 100
  );
}

#root, html {
  // background: var(--white);
  background: var(--header-background);
}

#main {
  background: var(--background);
  position: relative;

  section.section {
    min-height: 100vh;
  }
}

pre.debug {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: var(--white);
  padding: 1rem;
  font-size: 1rem;
  font-family: monospace;
  border: 1px solid var(--black);
  border-radius: 0.5rem;
  margin: 1rem;
  opacity: 0.5;
  pointer-events: none;
}
</style>
