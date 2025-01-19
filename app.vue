<script setup>
import { setupTheme } from "@/composables/useTheme";

// const theme =
setupTheme();
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
  background: var(--background);
}

#main {
  position: relative;

  section.section {
    min-height: 100vh;
  }
}
</style>
