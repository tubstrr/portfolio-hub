<script setup>
// Libraries
import * as THREE from "three";
import { useTheme } from "@/composables/useTheme";

// Composables / Data
import { initScene } from "@/composables/three";
import { config } from "@/assets/three.config";

// Variables
const { $bus } = useNuxtApp();
const theme = useTheme();
const renderer = ref(null);
const colors = ref(config.colors[theme.value]);
const state = ref({ config, theme, colors });

// Lifecycle
$bus.on("theme:change", (payload) => {
  const mode = payload + "-mode";
  colors.value = config.colors[mode];

  const bg = new THREE.Color(colors.value.background);
  if (renderer.value) renderer.value.setClearColor(bg, 1);
});

onMounted(() => {
  initScene(state);

  // const scene = new THREE.Scene();

  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   1000,
  // );

  // function animate() {
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  //   renderer.value.render(scene, camera);
  // }

  // renderer.value = new THREE.WebGLRenderer({ canvas: background_canvas });
  // renderer.value.setSize(window.innerWidth, window.innerHeight);
  // renderer.value.setAnimationLoop(animate);
  // const bg = new THREE.Color(colors.value.background);
  // renderer.value.setClearColor(bg, 1);

  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  // camera.position.z = 5;
  // console.log("🍤 ~ onMounted ~ state:", state.value);
});

onBeforeUnmount(() => {
  $bus.off("theme:change");

  // window.removeEventListener("resize", () => {
  //   renderer.value.setSize(window.innerWidth, window.innerHeight);
  // });
});
</script>

<template>
  <canvas id="background_canvas" ref="canvas" />
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
}
</style>
