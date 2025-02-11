export const config = {
  blobs: [
    {
      id: "pink_blob",
      init: {
        position: { x: 4, y: -3, z: 95 },
        morph: { x: 2, y: 6, z: 2 },
      },
      attributes: {
        radius: 100,
        detail: .5,
        deformation: .2,
        color: "pink",
      },
      animation: {
        reduction: 150000,
        loop: {
          rotation: { x: .025, y: 0.0, z: 0.0 },
        },
      },
    },
    {
      id: "green_blob",
      init: {
        position: { x: -30, y: -30, z: 70 },
        morph: { x: 25, y: 15, z: 15 },
      },
      attributes: {
        radius: 150,
        detail: 1,
        deformation: .5,
        color: "green",
      },
      animation: {
        reduction: 150000,
        loop: {
          // rotation: { x: 0.025, y: 0.025, z: -0.025 },
          rotation: { x: 0.00, y: 0.00, z: 0.00 },
        },
      },
    },
    // {
    //   id: "blue_blob",
    //   init: {
    //     position: { x: 75, y: -20, z: 20 },
    //     morph: { x: 25, y: 50, z: 25 },
    //   },
    //   attributes: {
    //     radius: 100,
    //     detail: 1,
    //     deformation: 1.5,
    //     color: "blue",
    //   },
    //   animation: {
    //     reduction: 1000000,
    //     loop: {
    //       rotation: { x: 0.05, y: 0.0, z: 0.025 },
    //     },
    //   },
    // },
  ],
  scene: {
    background_alpha: 1,
    camera: {
      fov: 75,
      near: 0.1,
      far: 10000,
      position: { x: 0, y: 0, z: 100 },
    },
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
