import * as THREE from "three";
import { config as RAW_CONFIG } from "@/assets/three.config";

export const animationLoop = () => {
  if (!window.three_state) return;
  const { cube, renderer, scene, camera } = window.three_state;
  if (!cube || !renderer || !scene || !camera) return;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

export const resizeRendererToDisplaySize = () => {
  if (!window.three_state) return;
  const { renderer } = window.three_state;
  renderer.setSize(window.innerWidth, window.innerHeight);
  return;
};

export const initScene = (state) => {
  window.three_state = state.value;

  const { config, colors } = window.three_state;
  if (!config) return new Error("No config provided");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer({ canvas: background_canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animationLoop);

  const bg = new THREE.Color(colors.background);
  renderer.setClearColor(bg, 1);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  window.three_state = {
    ...window.three_state,
    scene,
    camera,
    renderer,
    cube,
  };

  window.addEventListener("resize", resizeRendererToDisplaySize);

  return window.three_state;
};
