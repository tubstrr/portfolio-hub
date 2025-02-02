// Libraries
import * as THREE from "three";
import SimplexNoise from "@/assets/scripts/simplex_noise.js";

// Composables
import {
  getColor,
  initLifecycle,
  makeRotations,
  randomize,
} from "@/composables/three/helpers";

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

export const updatePerlinNoise = (sphere, geometry, config) => {
  const noise = new SimplexNoise();
  const vertices = geometry.attributes.position;

  const { factor, strength } = config;

  // Apply noise to vertices
  for (let i = 0; i < vertices.count; i++) {
    const x = vertices.getX(i);
    const y = vertices.getY(i);
    const z = vertices.getZ(i);

    // Generate noise based on vertex position
    const values = {
      x: randomize(strength.x[0], strength.x[1]),
      y: randomize(strength.y[0], strength.y[1]),
      z: randomize(strength.z[0], strength.z[1]),
    };
    const noiseValue = noise.noise3D(
      randomize(x, strength.x[1]),
      randomize(y, strength.y[1]),
      randomize(z, strength.z[1]),
    );

    // Modify position with noise
    // const factor = 0.2; // Control bumpiness
    vertices.setXYZ(
      i,
      x + noiseValue * factor,
      y + noiseValue * factor,
      z + noiseValue * factor,
    );
  }

  // Update geometry after modifications
  vertices.needsUpdate = true;
  geometry.computeVertexNormals();
};

export const handleBlobAnimations = (time) => {
  const { scene, config } = window.three_state;
  if (!scene) throw new Error("No scene provided");
  if (!config) throw new Error("No config provided");

  for (const blob of config.blobs) {
    const sphere = scene.getObjectByName(blob.id);
    if (sphere) {
      sphere.material.uniforms.time.value = time;
      const { loop } = blob.animation;

      const geometry = window.three_state.blob_geometries[blob.id];
      // updatePerlinNoise(sphere, geometry, blob.animation.perlin);

      if (loop) {
        if (loop.rotation) {
          const rotations = makeRotations(loop.rotation, sphere.rotation);
          const { x, y, z } = rotations;
          sphere.rotation.set(x, y, z);
        }
      }
    }
  }
};

export const animationLoop = (time) => {
  if (!window.three_state) return;
  const { renderer, scene, camera } = window.three_state;
  if (!renderer || !scene || !camera) {
    throw new Error("No renderer, scene, or camera provided");
  }

  handleBlobAnimations(time);

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

    window.three_state.blob_geometries = window.three_state.blob_geometries ||
      {};
    window.three_state.blob_geometries[blob.id] = geometry;

    const blob_color = new THREE.Color(
      getColor(config, theme, blob.attributes.color),
    );

    // GLSL Perlin Noise Function (Improved version)
    const perlinNoise = `
vec3 mod289(vec3 x) { return x - floor(x / 289.0) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x / 289.0) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
float perlin(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);

    vec4 a = permute(permute(permute(i.x + vec4(0.0, 1.0, 0.0, 1.0)) + i.y) + i.z);
    float res = mix(mix(mix(dot(f - vec3(0,0,0), vec3(1,1,1)),
                            dot(f - vec3(1,0,0), vec3(-1,1,1)), u.x),
                        mix(dot(f - vec3(0,1,0), vec3(1,-1,1)),
                            dot(f - vec3(1,1,0), vec3(-1,-1,1)), u.x), u.y),
                    mix(mix(dot(f - vec3(0,0,1), vec3(1,1,-1)),
                            dot(f - vec3(1,0,1), vec3(-1,1,-1)), u.x),
                        mix(dot(f - vec3(0,1,1), vec3(1,-1,-1)),
                            dot(f - vec3(1,1,1), vec3(-1,-1,-1)), u.x), u.y), u.z);
    return res;
}`;

    // Vertex Shader (Deforms sphere using Perlin noise)
    const vertexShader = `
uniform float time;
uniform float noiseScale; 
uniform float displacementStrength;
varying vec3 vNormal;
varying vec2 vUv;
varying float vNoise;

${perlinNoise} // Include Perlin function

// Multi-octave noise function for more detail
float fractalNoise(vec3 pos) {
    float value = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;
    
    for (int i = 0; i < 4; i++) { // 4 Octaves
        value += amplitude * perlin(pos * frequency);
        frequency *= 2.0; // Increase frequency
        amplitude *= 0.5; // Reduce amplitude
    }
    return value;
}

void main() {
    vNormal = normal;
    vUv = uv;

    // Generate noise value with animation
    // float noiseValue = fractalNoise(position * noiseScale + time * 0.3);
    float noiseValue = fractalNoise(position * noiseScale  * 0.3);
    vNoise = noiseValue; // Pass noise to fragment shader

    // Apply noise-based displacement
    vec3 newPosition = position + normal * noiseValue * displacementStrength;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}`;

    // Fragment Shader (Color Variation Based on Noise)
    const fragmentShader = `
varying vec3 vNormal;
varying vec2 vUv;
varying float vNoise;
void main() {
    vec3 light = normalize(vec3(1.0, 1.0, 1.0));
    float intensity = dot(vNormal, light) * 0.5 + 0.5;
    
    // Color variation based on noise
    vec3 baseColor = mix(vec3(0.1, 0.4, 0.8), vec3(1.0, 0.5, 0.2), vNoise);
    
    gl_FragColor = vec4(intensity * baseColor, 1.0);
}`;

    // Create ShaderMaterial with customizable noise scale and strength
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0.0 },
        noiseScale: { value: 100 }, // Higher = more fine details
        displacementStrength: { value: 1 }, // Stronger deformation
      },
    });
    // const material = new THREE.MeshLambertMaterial(
    //   { color: blob_color },
    // );
    const sphere = new THREE.Mesh(geometry, material);
    sphere.name = blob.id;
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    sphere.position.set(
      blob.init.position.x,
      blob.init.position.y,
      blob.init.position.z,
    );
    sphere.scale.set(
      blob.init.morph.x + sphere.scale.x,
      blob.init.morph.y + sphere.scale.y,
      blob.init.morph.z + sphere.scale.z,
    );

    // // Initialize Perlin noise
    // updatePerlinNoise(sphere, geometry, blob.animation.perlin);

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
