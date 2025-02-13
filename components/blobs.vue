<script setup>
// Libraries
import { useTheme } from "@/composables/useTheme";

// Composables / Data
import { initScene } from "@/composables/three";
import { destroyScene } from "@/composables/three/helpers";

import { config } from "@/assets/three.config";

// Variables
const theme = useTheme();

onMounted(() => {
  initScene({ config, theme: theme.value });
});

onBeforeUnmount(() => {
  destroyScene();
});
</script>

<template>
  <canvas id="background_canvas" ref="canvas" v-aos />
</template>

<style>
#background_canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: var(--background);
  min-width: calc(100 * var(--vw));
  min-height: calc(100 * var(--vh));

  opacity: 0;
}
#background_canvas.v-aos-entered {
  opacity: 1;
  transition: 2s ease 1s;
}
</style>
