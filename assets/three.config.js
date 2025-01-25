export const config = {
  blobs: [{
    id: "pink_blob",
    init: {
      position: { x: 0, y: 0, z: 0 },
      morph: { x: 0, y: 0, z: 0 },
    },
    attributes: {
      radius: 10,
      segments: {
        width: 64,
        height: 64,
      },
      color: "pink",
    },
  }],
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
