<script setup>
const { button, label, link, icon, title } = defineProps({
  button: {
    type: [Object, Boolean],
    required: false,
    default: false,
  },
  label: {
    type: [String, Boolean],
    required: false,
    default: false,
  },
  link: {
    type: [String, Boolean],
    required: false,
    default: false,
  },
  icon: {
    type: [String, Boolean],
    required: false,
    default: false,
  },
  title: {
    type: [String, Boolean],
    required: false,
    default: false,
  },
});

const text = computed(() => {
  if (label) return label;
  if (button) return button.label;
  return "";
});

const buttonTitle = computed(() => {
  if (button) return button.title;
  if (title) return title;
  return false;
});

const href = computed(() => {
  if (link) return link;
  if (button) return button.url;
  return false;
});

const target = computed(() => {
  if (button) return button.target;
  return false;
});
</script>

<template>
  <TLink
    v-if="href"
    class="theme-button base"
    :href="href"
    :target='target ? "_blank" : false'
    :title="buttonTitle || null"
  >
    <span class="wrapper">
      <THtml :html="text" tag="span" />
      <span v-if="icon" class="icon-wrapper">
        <TSvg :type="icon" />
      </span>
    </span>
    <slot />
  </TLink>
  <button v-else class="theme-button base" :title="title || null">
    <span class="wrapper">
      <THtml :html="text" tag="span" />
      <span v-if="icon" class="icon-wrapper">
        <TSvg :type="icon" />
      </span>
    </span>
    <slot />
  </button>
</template>
