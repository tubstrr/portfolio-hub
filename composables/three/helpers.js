import { updateBackground, updateBlobColors } from "@/composables/three";

export const grabBus = () => {
  const { $bus } = useNuxtApp();
  if (!$bus) return new Error("No bus provided");
  return $bus;
};

export const resizeRendererToDisplaySize = () => {
  if (!window.three_state) return;
  const { renderer, camera } = window.three_state;
  if (!renderer || !camera) return new Error("No renderer or camera provided");

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  return;
};

export const initLifecycle = (config) => {
  const $bus = grabBus();

  $bus.on("theme:change", (payload) => {
    const mode = payload + "-mode";

    const state = window.three_state;
    if (state) {
      state.colors = config.colors[mode];

      const { renderer, colors } = state;
      updateBackground(renderer, colors.background);
      updateBlobColors(mode);
    }
  });

  window.addEventListener("resize", resizeRendererToDisplaySize);
};

export const destroyScene = () => {
  const $bus = grabBus();

  $bus.off("theme:change");
  window.removeEventListener("resize", resizeRendererToDisplaySize);
};

export const getColor = (config, theme, color) => {
  if (!config) throw new Error("No config provided");
  if (!theme) throw new Error("No theme provided");
  if (!color) throw new Error("No color provided");

  const { colors } = config;
  if (!colors) throw new Error("No colors provided");

  const currentColors = colors[theme];
  if (!currentColors) throw new Error("No currentColors provided");

  return currentColors[color];
};

export const makeRotations = (loopRotation, sphereRotation) => {
  const dampener = 100;
  return {
    x: (loopRotation.x / dampener) + sphereRotation.x,
    y: (loopRotation.y / dampener) + sphereRotation.y,
    z: (loopRotation.z / dampener) + sphereRotation.z,
  };
};

export const randomize = (min, max) => {
  return Math.random() * (max - min) + min;
};
