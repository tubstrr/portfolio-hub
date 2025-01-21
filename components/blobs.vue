<script setup>
// Libraries
import * as THREE from "three";
import { useTheme } from "@/composables/useTheme";
const { $bus } = useNuxtApp();

// Variables
const theme = useTheme();
const renderer = ref(null);
const colors = {
  "dark-mode": "#242424",
  "light-mode": "#f8f8f8",
};

// Lifecycle
$bus.on("theme:change", (payload) => {
  console.log("🍤 ~ $bus.on ~ payload:", payload);
  const bg = new THREE.Color(colors[payload + "-mode"]);
  renderer.value.setClearColor(bg, 1);
});

onMounted(() => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.value.render(scene, camera);
  }

  renderer.value = new THREE.WebGLRenderer({ canvas: three });
  renderer.value.setSize(window.innerWidth, window.innerHeight);
  renderer.value.setAnimationLoop(animate);
  const bg = new THREE.Color(colors[theme.value]);
  console.log("🍤 ~ onMounted ~ theme.value:", theme.value);
  console.log("🍤 ~ onMounted ~ colors[theme.value]:", colors[theme.value]);
  renderer.value.setClearColor(bg, 1);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;
});

onMounted(() => {
  // window.addEventListener("resize", () => {
  //   console.log("🍤 ~ window.addEventListener ~ resize");
  //   setTimeout(() => {
  //     renderer.value.setSize(window.innerWidth, window.innerHeight);
  //   }, 100);
  //   renderer.value.setSize(window.innerWidth, window.innerHeight);
  // });
});

onBeforeUnmount(() => {
  $bus.off("theme:change");

  // window.removeEventListener("resize", () => {
  //   renderer.value.setSize(window.innerWidth, window.innerHeight);
  // });
});
</script>

<template>
  <canvas id="three" ref="canvas" />
</template>

<style>
#three {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: var(--background);
  min-width: calc(100 * var(--vw));
  min-height: calc(100 * var(--vh));
}
</style>
