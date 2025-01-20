<template>
  <Block name="projects">
    <div class="container">
      <div class="inner-container">
        <h2>Portfolio</h2>
        <ProjectsAccordion />
      </div>
    </div>
  </Block>
</template>

<style lang="scss">
#block-projects {
  overflow: visible;
  margin-top: calc(var(--vh, 1vh) * 100);
  .container {
    .inner-container {
      > h2 {
        margin-bottom: 0.5em;
      }
    }
  }
}
</style>
