// Libraries
import * as THREE from "three";

// Composables
import { getColor, initLifecycle } from "@/composables/three/helpers";

// Functions
export const updateBackground = (renderer, color) => {
  if (!renderer) throw new Error("No renderer provided");
  if (!color) throw new Error("No color provided");

  const bg = new THREE.Color(color);
  renderer.setClearColor(bg, 1);
};

export const updateBlobColors = (theme) => {
  const { scene, config } = window.three_state;
  if (!scene) throw new Error("No scene provided");
  if (!config) throw new Error("No config provided");

  const currentColors = config.colors[theme];
  if (!currentColors) throw new Error("No currentColors provided");

  for (const blob of config.blobs) {
    const sphere = scene.getObjectByName(blob.id);
    if (sphere) {
      const color = getColor(config, theme, blob.attributes.color);
      sphere.material.color.set(color);
    }
  }
};

export const animationLoop = () => {
  if (!window.three_state) return;
  const { renderer, scene, camera } = window.three_state;
  if (!renderer || !scene || !camera) {
    throw new Error("No renderer, scene, or camera provided");
  }

  renderer.render(scene, camera);
};

export const createCamera = (config) => {
  const { camera: cameraConfig } = config.scene;
  const camera = new THREE.PerspectiveCamera(
    cameraConfig.fov,
    window.innerWidth / window.innerHeight,
    cameraConfig.near,
    cameraConfig.far,
  );
  // Position camera
  camera.position.x = cameraConfig.position.x;
  camera.position.y = cameraConfig.position.y;
  camera.position.z = cameraConfig.position.z;

  return camera;
};

export const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({
    canvas: background_canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animationLoop);
  renderer.setPixelRatio(window.devicePixelRatio * 2);

  renderer.outputEncoding = THREE.LinearEncoding;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  return renderer;
};

export const createLights = () => {
  const { scene, config } = window.three_state;
  if (!scene) throw new Error("No scene provided");
  if (!config) throw new Error("No config provided");

  const { lights } = config.scene;
  if (!lights) throw new Error("No lights provided");

  for (const light of lights) {
    if (light.type === "ambient") {
      const ambientLight = new THREE.AmbientLight(light.color, light.intensity);
      scene.add(ambientLight);
    } else if (light.type === "point") {
      const pointLight = new THREE.PointLight(
        light.color,
        light.intensity,
        light.distance,
        light.decay,
      );
      pointLight.position.set(
        light.position.x,
        light.position.y,
        light.position.z,
      );
      scene.add(pointLight);
    } else if (light.type === "directional") {
      const directionalLight = new THREE.DirectionalLight(
        light.color,
        light.intensity,
      );
      directionalLight.target.position.set(
        light.target.x,
        light.target.y,
        light.target.z,
      );
      directionalLight.position.set(
        light.position.x,
        light.position.y,
        light.position.z,
      );
      scene.add(directionalLight);
    } else if (light.type === "hemisphere") {
      const hemisphereLight = new THREE.HemisphereLight(
        light.skyColor,
        light.groundColor,
        light.intensity,
      );
      hemisphereLight.position.set(
        light.position.x,
        light.position.y,
        light.position.z,
      );
      scene.add(hemisphereLight);
    }
  }
};

export const createObjects = () => {
  const { scene, config, theme } = window.three_state;
  if (!scene) throw new Error("No scene provided");
  if (!config) throw new Error("No config provided");
  if (!theme) throw new Error("No theme provided");

  const { colors, blobs } = config;
  if (!colors) throw new Error("No colors provided");
  if (!blobs) throw new Error("No blobs provided");

  const currentColors = colors[theme];

  for (const blob of config.blobs) {
    const geometry = new THREE.SphereGeometry(
      blob.attributes.radius,
      blob.attributes.segments.width,
      blob.attributes.segments.height,
    );
    const blob_color = new THREE.Color(
      getColor(config, theme, blob.attributes.color),
    );
    const material = new THREE.MeshLambertMaterial(
      { color: blob_color },
    );
    const sphere = new THREE.Mesh(geometry, material);
    sphere.name = blob.id;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(
      blob.init.position.x,
      blob.init.position.y,
      blob.init.position.z,
    );
    // sphere.position.x = blob.init.position.x;
    // sphere.position.y = blob.init.position.y;
    // sphere.position.z = blob.init.position.z;
    scene.add(sphere);
  }
};

export const initScene = (state) => {
  window.three_state = state;

  const { config, theme } = window.three_state;

  const scene = new THREE.Scene();
  const camera = createCamera(config);
  const renderer = createRenderer();
  const colors = config.colors[theme];
  updateBackground(renderer, colors.background);

  window.three_state = {
    ...window.three_state,
    scene,
    camera,
    renderer,
  };

  createLights();
  createObjects();

  initLifecycle(config);
  return window.three_state;
};
