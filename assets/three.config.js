export const config = {
  blobs: [{
    id: "pink_blob",
    init: {
      position: { x: 40, y: 0, z: 50 },
      morph: { x: 0, y: 0, z: 0 },
    },
    attributes: {
      radius: 10,
      segments: {
        width: 128,
        height: 128,
      },
      color: "pink",
    },
    animation: {
      loop: {
        rotation: { x: .5, y: 0, z: 0 },
      },
      perlin: {
        factor: 0.1,
        strength: {
          x: [1, 3],
          y: [1, 5],
          z: [1, 2],
        },
      },
    },
  }],
  scene: {
    background_alpha: 1,
    camera: {
      fov: 75,
      near: 0.1,
      far: 10000,
      position: { x: 0, y: 0, z: 100 },
    },
    lights: [
      {
        type: "ambient",
        color: 0xffffff,
        // color: 0x000000,
        intensity: 1,
      },
      {
        type: "hemisphere",
        skyColor: 0x000000,
        groundColor: 0xffffff,
        intensity: 1,
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "directional",
        color: 0xffffff,
        intensity: .5,
        target: { x: 0, y: 0, z: 0 },
        position: { x: -500, y: 10, z: 200 },
      },
      {
        type: "directional",
        color: 0x000000,
        intensity: 1,
        target: { x: 0, y: 0, z: 0 },
        position: { x: 500, y: -10, z: 200 },
      },
    ],
  },
  colors: {
    "dark-mode": {
      background: "#242424",
      header_background: "#191919",
      white: "#000",
      black: "#ebebeb",
      gray: "#363636",
      pink: "#d56cd2",
      green: "#159d72",
      blue: "#85b2e5",
      alt_white: "#ebebeb",
      alt_black: "#000",
      alt_gray: "#c5c5c5",
    },
    "light-mode": {
      background: "#f8f8f8",
      header_background: "#fff",
      white: "#ebebeb",
      black: "#000",
      gray: "#c5c5c5",
      pink: "#c200bf",
      green: "#008059",
      blue: "#4273b3",
      alt_white: "#000",
      alt_black: "#ebebeb",
      alt_gray: "#363636",
    },
  },
};
