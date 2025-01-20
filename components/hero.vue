<template>
  <Block name="hero">
    <div class="container">
      <div class="content">
        <h2 class="h1">Howdy <span class="wave">👋</span></h2>
        <p>
          My name is Jonathan Knoll, I’ve been working as a software engineer
          for the better part of a decade now; I’ve gone from hacking WordPress
          templates for local businesses to leading a team of developers on
          projects for fortune 500 companies.
        </p>
      </div>
    </div>
  </Block>
</template>

<style lang="scss">
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    .content {
      max-width: 600px;
      .wave {
        display: inline-block;
      }
      &:hover {
        .wave {
          animation: wave ease-in-out 1200ms;
        }
      }
    }
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    20% {
      transform: rotate(-10deg);
    }
    40% {
      transform: rotate(20deg);
    }
    60% {
      transform: rotate(-10deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}
</style>
