<script setup>
import { updateTheme, useTheme } from "@/composables/useTheme";

const menuOpened = ref(false);
const theme = useTheme();

const toggleMenu = () => {
  if (menuOpened.value) closeMenu();
  else openMenu();
};

const closeMenu = () => {
  menuOpened.value = false;
};

const openMenu = () => {
  menuOpened.value = true;
};

const toggleTheme = () => {
  updateTheme(theme.value, true);
};

const scrollTo = (position, offset = 0) => {
  if (typeof position !== "number") {
    position = document.getElementById(position).offsetTop;
  }

  if (offset === "nav") {
    offset = document.getElementById("navigation").offsetHeight;
    setTimeout(() => {
      closeMenu();
    }, 750);
    // menuOpened.value = false;
  }

  window.scrollTo({
    top: position - offset,
    behavior: "smooth",
  });
};

const activeTheme = computed(() => {
  return theme.value === "dark-mode" ? "dark-mode" : "light-mode";
});

const menuClass = computed(() => {
  let classes = "closed";
  if (menuOpened.value) classes = "open";
  return classes;
});
</script>

<template>
  <nav id="navigation">
    <div class="container">
      <div class="inner-container">
        <h1 class="h6">
          <button title="Scroll to top of site" @click="scrollTo(0)">
            Jonathan Knoll
          </button>
        </h1>
        <div class="toggles">
          <button @click="toggleTheme" class="theme">
            <TSvg type="sun" class="sun" />
            <TSvg type="moon" class="moon" />
          </button>
          <button
            @click="toggleMenu"
            class="sub-menu-toggle"
            :class="menuClass"
          >
            <span class="pills">
              <span class="pill one" />
              <span class="pill two" />
            </span>
            <!-- Menu -->
          </button>
        </div>
      </div>
    </div>
    <div class="sub-menu" :class="{ open: menuOpened }">
      <div class="container">
        <div class="inner-container">
          <ul class="sub-nav">
            <li>
              <button
                title="Scroll to the hero"
                @click='scrollTo("block-hero", "nav")'
                style="--symbol: '👋'"
              >
                Intro
              </button>
            </li>
            <li>
              <button
                title="Scroll to the projects"
                @click='scrollTo("block-projects", "nav")'
                style="--symbol: '👈'"
              >
                Portfolio
              </button>
            </li>
            <li>
              <button
                title="Scroll to the bio"
                @click='scrollTo("block-bio", "nav")'
                style="--symbol: '😊'"
              >
                Bio
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
@use "@/assets/styles/variables/sizing.scss" as *;
:root {
  --header-height: 3.5rem;
}
#navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(var(--vw) * 100);
  background: var(--header-background);
  padding: 1rem 0;
  // border-bottom: var(--border);
  z-index: 2;
  height: var(--header-height);
  transition: 300ms ease;

  .container {
    .inner-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .toggles {
        display: flex;
        gap: 1.5rem;
        --transition: 250ms ease-in-out;
        button {
          width: 1rem;
          aspect-ratio: 1;
          position: relative;
          transition: var(--transition);

          svg {
            color: var(--text);
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transition: var(--transition);

            &.sun {
              opacity: 1;
            }

            &.moon {
              opacity: 0;
            }
          }

          &:hover {
            opacity: 0.75;
            scale: 1.15;
          }
        }

        .sub-menu-toggle {
          width: auto;
          aspect-ratio: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 0.8rem;

          .pills {
            width: 0.8rem;
            aspect-ratio: 1;
            display: inline-block;
            position: relative;
            --height: 1px;
            .pill {
              width: 100%;
              position: absolute;
              height: var(--height);
              border-radius: calc(var(--height) / 2);
              background: var(--text);
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              top: calc(50% + -0.2rem - var(--height) / 2);
              transition: var(--transition);

              &.two {
                top: calc(50% + 0.2rem - var(--height) / 2);
              }
            }
          }
          &.closed {
            &:hover {
              .pill {
                transform: translate(-50%) rotate(-90deg);
                top: calc(50% - var(--height) / 2);
                &.two {
                  transform: translate(-50%) rotate(0deg);
                }
              }
            }
          }
          &.open {
            .pill {
              top: calc(50% - var(--height) / 2);
              transform: translate(-50%) rotate(-135deg);
              &.two {
                top: calc(50% - var(--height) / 2);
                transform: translate(-50%) rotate(-45deg);
              }
            }
          }

          &:hover {
            opacity: 0.8;
            scale: 1;
          }
        }
      }
    }
  }

  .sub-menu {
    position: absolute;
    top: 100%;
    width: 100%;
    background: var(--header-background);
    border-bottom: var(--border);
    // opacity: 0;
    user-select: none;
    pointer-events: none;
    z-index: -1;

    display: grid;
    grid-template-rows: 0fr;
    transition: 300ms ease;

    box-shadow: 0px 10px 10px -5px var(--drop-shadow);

    * {
      opacity: 0;
    }

    .container {
      overflow: hidden;
      padding: 0;

      .sub-nav {
        flex-direction: column;
        margin-left: auto;
        text-align: right;
        li {
          button {
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-size: 1rem;
            font-weight: 400;
            position: relative;
            padding-right: 1.5em;
            margin-right: -1.5em;

            &::after {
              content: var(--symbol);
              position: absolute;
              right: -1em;
              opacity: 0;
              transition: 300ms ease;
            }
          }

          + li {
            margin-top: 1rem;
          }

          &:hover {
            button {
              font-weight: 900;
              &::after {
                opacity: 1;
                right: 0;
              }
            }
          }
        }
      }
    }

    &.open {
      grid-template-rows: 1fr;
      pointer-events: auto;
      user-select: auto;
      * {
        opacity: 1;
      }

      .container {
        padding-bottom: 3rem;
        padding-top: 1.5rem;
      }
    }
  }
}

.dark-mode {
  #navigation {
    .toggles {
      button {
        svg {
          &.sun {
            opacity: 0;
          }

          &.moon {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
