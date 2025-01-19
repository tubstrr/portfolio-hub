<script setup>
const {
  image,
  src,
  alt,
  lazy,
  quality,
  forceLoad,
  width,
  height,
  mod,
  isTransparent,
} = defineProps({
  image: {
    type: Object,
    required: false,
    default: {},
  },
  src: {
    type: String,
    required: false,
    default: null,
  },
  alt: {
    type: String,
    required: false,
    default: null,
  },
  lazy: {
    type: Boolean,
    required: false,
    default: true,
  },
  quality: {
    type: Number,
    required: false,
    default: 50,
  },
  forceLoad: {
    type: Boolean,
    required: false,
    default: false,
  },
  height: {
    type: [Number, Boolean],
    required: false,
    default: false,
  },
  width: {
    type: [Number, Boolean],
    required: false,
    default: false,
  },
  mod: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  isTransparent: {
    type: Boolean,
    required: false,
    default: false,
  },
  sizes: {
    type: String,
    required: false,
    default: "100vw",
  },
});

const loadingValue = lazy ? "lazy" : "eager";

// Setup URL
let url = image?.src || image?.url || src;

// Define URLs to remove:
// NuxtImage should resolve the correct URL for the environment
// based on the providers base URL
const config = useRuntimeConfig();
const { image_urls_to_remove } = config.public;
const urlsToRemove = image_urls_to_remove.split(",");

// Check if the URL contains any of the URLs to remove
const shouldRemove = urlsToRemove.some((url) => {
  return image?.src?.includes(url) || image?.url?.includes(url) ||
    src?.includes(url);
});

if (shouldRemove) {
  // Remove the URL from the image src
  urlsToRemove.forEach((aUrl) => {
    url = url.replace(aUrl, "");
  });
}

const lowerCase = url.toLowerCase();
const transparent = isTransparent || lowerCase?.includes(".png") ||
  lowerCase?.includes(".svg") || lowerCase?.includes(".gif");
const shouldPreload = lazy && !forceLoad && !transparent;

const hasImage = image || src;

const maxWidth = 1920;
let setWidth = width * 2 || maxWidth || null;
if (setWidth && setWidth > maxWidth) {
  setWidth = maxWidth;
}

const baseModifier = {
  w: setWidth,
  q: quality,
  h: height || null,
  fit: "max",
  fm: "webp",
  fo: "face",
  ...mod,
};
</script>

<template>
  <div class="theme-image">
    <nuxt-picture
      v-if="hasImage && shouldPreload"
      :quality="quality"
      loading="eager"
      :src="url"
      :alt="alt || image.alt || null"
      :modifiers='{ ...baseModifier, w: 10, h: "auto", q: 1 }'
      :sizes="sizes"
    />
    <nuxt-picture
      v-if="hasImage && shouldPreload"
      :loading="loadingValue"
      :src="url"
      :alt="alt || image.alt || null"
      class="full-sized-image"
      :modifiers="{ ...baseModifier }"
      :sizes="sizes"
    />
    <nuxt-picture
      v-if="hasImage && !shouldPreload"
      loading="eager"
      :src="url"
      :alt="alt || image.alt || null"
      :modifiers="{ ...baseModifier }"
      :sizes="sizes"
    />
  </div>
</template>

<style lang="scss">
.theme-image {
  position: relative;
  transition: clip-path 650ms ease-in-out;

  picture {
    &.full-sized-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    display: block;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
