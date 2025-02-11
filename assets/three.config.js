export const config = {
  blobs: [
    // Tan Blob
    {
      id: "tan_blob",
      init: {
        position: { x: 0, y: -90, z: 10 },
        morph: { x: 50, y: 20, z: 20 },
      },
      attributes: {
        radius: 50,
        detail: 2,
        deformation: .75,
        color: "tan",
      },
      animation: {
        reduction: 50000,
        loop: {
          rotation: { x: .025, y: 0.0, z: 0.0 },
        },
      },
    },
    // Tan Blob 2
    {
      id: "tan_blob_2",
      init: {
        position: { x: 75, y: 50, z: 15 },
        morph: { x: 25, y: 25, z: 15 },
      },
      attributes: {
        radius: 100,
        detail: 1,
        deformation: .75,
        color: "tan",
      },
      animation: {
        reduction: 100000,
        loop: {
          rotation: { x: .025, y: 0.0, z: 0.0 },
        },
      },
    },
    // Pink Blob
    {
      id: "pink_blob",
      init: {
        position: { x: 20, y: 5, z: 75 },
        morph: { x: 12, y: 3, z: 3 },
      },
      attributes: {
        radius: 50,
        detail: 1,
        deformation: .5,
        color: "pink",
      },
      animation: {
        reduction: 25000,
        loop: {
          rotation: { x: .025, y: 0.0, z: 0.0 },
        },
      },
    },
    // Pink 2
    // {
    //   id: "pink_blob_2",
    //   init: {
    //     position: { x: -18, y: -10, z: 85 },
    //     morph: { x: -.5, y: -.5, z: -.5 },
    //   },
    //   attributes: {
    //     radius: 25,
    //     detail: 2,
    //     deformation: .5,
    //     color: "pink",
    //   },
    //   animation: {
    //     reduction: 15000,
    //     loop: {
    //       rotation: { x: .025, y: 0.0, z: 0.0 },
    //     },
    //   },
    // },
    // Green Blob
    {
      id: "green_blob",
      init: {
        position: { x: 10, y: -5, z: 85 },
        morph: { x: 2, y: 5, z: 2 },
      },
      attributes: {
        radius: 50,
        detail: 1,
        deformation: .2,
        color: "green",
      },
      animation: {
        reduction: 25000,
        loop: {
          // rotation: { x: 0.025, y: 0.025, z: -0.025 },
          rotation: { x: 0.00, y: 0.00, z: 0.00 },
        },
      },
    },
    // Blue Blob
    {
      id: "blue_blob",
      init: {
        position: { x: 40, y: -15, z: 60 },
        morph: { x: 7, y: 7, z: 7 },
      },
      attributes: {
        radius: 50,
        detail: 1,
        deformation: .5,
        color: "blue",
      },
      animation: {
        reduction: 100000,
        loop: {
          rotation: { x: 0.00, y: 0.0, z: 0.00 },
        },
      },
    },
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
      // pink: "#d56cd2",
      pink: "#ff59a1",
      green: "#159d72",
      blue: "#85b2e5",
      tan: "#e4c5a9",
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
      // pink: "#c200bf",
      pink: "#ff59a1",
      // green: "#008059",
      green: "#bddbd3",
      blue: "#4273b3",
      tan: "#fce6d2",
      alt_white: "#000",
      alt_black: "#ebebeb",
      alt_gray: "#363636",
    },
  },
};
