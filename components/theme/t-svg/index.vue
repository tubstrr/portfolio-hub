<script setup>
const { type } = defineProps({
  id: {
    type: [String, Boolean],
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: "none",
  },
});
</script>

<template>
  <component
    v-if='type != "none"'
    :is="type"
    :id="id || null"
    :data-type="type"
    class="theme-svg"
  />
</template>
