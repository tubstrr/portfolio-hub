<script>
export default {
  props: {
    html: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <section class="container">
    <theme-html
      v-if="html"
      class="theme-content block block-content"
      tag="section"
      :html="html"
    />
  </section>
</template>
