<script setup>
import {
  checkActive,
  formatUrl,
  testInternalLink,
  testLinkScheme,
  testRelativeLink,
  testValidDomains,
} from "@/composables/helpers/links";

const { href, replace, button, target, windowed } = defineProps({
  href: {
    type: String,
    required: true,
  },
  replace: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Object,
    default: null,
  },
  target: {
    type: [String, Boolean],
    default: false,
  },
  windowed: {
    type: Boolean,
    default: false,
  },
});

const internal = ref(false);
const relative = ref(false);

const url = ref(href);
// Check if the link has a valid scheme, if so, we shouldn't open in a new tab
const validScheme = testLinkScheme(url.value);
const validDomain = testValidDomains(url.value);

// If the link is relative, it's internal
// Else we test if it's a valid URL, and then check if it's host is internal
relative.value = testRelativeLink(url.value);
if (relative.value) internal.value = true;
else internal.value = testInternalLink(url.value);

// If the link is internal, we format it
if (internal.value) url.value = formatUrl(url.value, relative.value);

const replaceState = () => {
  history.replaceState({}, null, url.value);
};

const route = useRoute();
const active = ref(false);

const updateActive = () => {
  if (internal.value) active.value = checkActive(url.value, route.path);
};

updateActive();

watch(route, () => {
  updateActive();
});

const openWindow = () => {
  window.open(url.value, "_blank", "width=500,height=500");
};

const setActiveClass = () => {
  if (active.value == 1) return "theme-active-link";
  if (active.value == 2) return "theme-current-active-link";
  return "";
};
</script>

<template>
  <a
    v-if="replace"
    :href="url"
    class="theme-link replace"
    @click.prevent="replaceState()"
  >
    <slot />
  </a>
  <a
    v-else-if="windowed"
    class="theme-link window"
    :href="url"
    @click.prevent="openWindow()"
  >
    <slot />
  </a>
  <NuxtLink
    :to="url"
    v-else-if="internal"
    :class="`theme-link internal-link ${setActiveClass()}`"
  >
    <slot />
  </NuxtLink>
  <span v-else-if="!validScheme && !validDomain">
    <slot />
  </span>
  <a
    :href='"https://" + url'
    :target='target ? target : "_blank"'
    v-else-if="!validScheme"
    class="theme-link external-link"
  >
    <slot />
  </a>
  <a
    :href="url"
    :target='target ? target : "_blank"'
    v-else
    class="theme-link external-link"
  >
    <slot />
  </a>
</template>
