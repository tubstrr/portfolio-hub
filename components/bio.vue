<script setup>
// Content
import { bioHTML } from "@/assets/cms";
</script>

<template>
  <Block name="bio">
    <div class="media-wrapper">
      <div class="media">
        <img src="/me.webp" />
      </div>
    </div>
    <div class="container">
      <div class="content">
        <h2>A bit about me 😊</h2>
        <THtml :html="bioHTML" />
      </div>
    </div>
  </Block>
</template>

<style lang="scss">
#block-bio {
  margin-top: calc(var(--vh, 1vh) * 100);
  position: relative;
  .container {
    position: relative;
    display: grid;
    grid-template-columns: 80ch auto;
    gap: 1rem;
    z-index: 1;
    padding-bottom: 6rem;

    .content {
      position: relative;
      max-width: 65ch;
      margin-left: auto;
      margin-top: calc(var(--vh, 1vh) * 25);

      * + * {
        margin-top: 1rem;
      }

      .theme-html {
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: -10%;
          left: 0;
          width: 110%;
          height: 120%;
          z-index: -1;
          background: var(--background);
          filter: blur(4rem);
          opacity: 0.9;
        }
      }
    }
  }

  .media-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .media {
    position: sticky;
    top: 6rem;
    left: 100%;
    width: 50%;
    height: auto;
    aspect-ratio: 15 / 11;
    z-index: 0;
    filter: grayscale(1);

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
