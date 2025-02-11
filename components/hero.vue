<template>
  <Block name="hero">
    <div class="container">
      <div class="inner-container">
        <div class="content" v-aos>
          <div>
            <h2 class="h1">Hey <span class="wave">👋</span></h2>
            <!-- <h1>I noticed you prefer Dark mode!!!!</h1> -->
            <p>
              My name is Jonathan Knoll, and I'm a software engineer with nearly
              a decade of experience, starting out by hacking WordPress
              templates for small businesses all the way to leading teams on
              Fortune 500 projects.
            </p>
          </div>
        </div>
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

      div {
        transition: 1500ms ease-in-out 500ms;
        opacity: 0;
        transform: translateX(-2%);
        clip-path: polygon(0 100%, 0 50%, 100% 50%, 0 50%, 0 0);
      }
      &.v-aos-entered div {
        opacity: 1;
        transform: translateX(0);
        clip-path: polygon(0 100%, 100% 100%, 100% 50%, 100% 0, 0 0);
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
