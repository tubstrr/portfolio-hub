<template>
  <h1>Bad</h1>
</template>
<!-- <script setup>
import { baseVideoObject } from "@/composables/helpers/reuseableObjects";

const { video, type } = defineProps({
  video: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "html",
  },
});

let htmlVideo;
if (type === "html") htmlVideo = { ...baseVideoObject, ...video };
</script>

<template>
  <section class="theme-video">
    <template v-if='type === "html"'>
      <video
        :controls="htmlVideo.controls"
        :muted="htmlVideo.muted"
        :autoplay="htmlVideo.autoplay"
        :loop="htmlVideo.loop"
        :poster="htmlVideo.poster"
        :disablepictureinpicture="htmlVideo.disablepictureinpicture"
        :preload="htmlVideo.preload"
      >
        <source :src="htmlVideo.url" :type="htmlVideo.type" />
      </video>
    </template>
  </section>
</template> -->
