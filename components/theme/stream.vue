<template>
  <h1>Bad</h1>
</template>
<!-- <script>
// Libraries
import { h } from "vue";
import { useStreamStore } from "@/stores/stream";
import { storeToRefs } from "pinia";
import { LazyHydrationWrapper } from "vue3-lazy-hydration";

// Composables

// Components
import Content from "@/components/theme/content";

export default {
  setup() {
    const streamStore = useStreamStore();
    const { stream } = storeToRefs(streamStore);

    const blocks = [];
    let chainedHTML = "";
    let tabIndex = 0;

    const addContentBlock = (html, index) => {
      const component = h(
        Content,
        { "v-once": true, html, key: index },
        "",
      );
      const lazy = h(LazyHydrationWrapper, () => component);

      lazy.isStatic = true;
      lazy.isOnce = true;

      blocks.push(lazy);
      tabIndex++;
      chainedHTML = "";
    };

    stream.value.forEach((block) => {
      const isBlock = block?.type === "custom";

      if (!isBlock) chainedHTML = chainedHTML + block.html;
      else {
        // Push any HTML into it's own block content block
        if (chainedHTML.length) addContentBlock(chainedHTML, tabIndex);

        const attributes = {
          class: `block block-${block.name}`,
          key: tabIndex,
          fields: block.fields,
          blockId: `block-${block.name}-${tabIndex}`,
        };

        // Find the component, and create it
        const component = h(resolveComponent(block.name), attributes);
        const lazy = h(
          LazyHydrationWrapper,
          { "when-visible": { "root-margin": "50px" } },
          () => component,
        );
        if (tabIndex !== 0) blocks.push(lazy);
        else blocks.push(component);

        tabIndex++;
      }
    });

    // Catch the last pieces of HTML
    if (chainedHTML.length) addContentBlock(chainedHTML, tabIndex);

    // Render everything out into a main tag
    return () => h("section", { class: "theme-stream" }, blocks);
  },
};
</script> -->
