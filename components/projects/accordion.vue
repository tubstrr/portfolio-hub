<script setup>
// Content
import { categories } from "@/assets/cms";

// Variables
const activeProject = ref("cac");
const activeCategory = ref("professional");
const panels = ref(null);
const debounceTimer = ref(null);
const tabsRef = ref(null);

// Computed
const activeCategoryIndex = computed(() => {
  return categories.filter((category) => category.id === activeCategory.value);
});

// Methods
const setActiveCategory = (id) => {
  activeCategory.value = id;
  setTimeout(() => {
    // Set first project in category as active
    setActiveProject(
      categories.find((category) => category.id === id).projects[0].id,
    );
  }, 100);

  // Scroll to active category
  const scrollToValue = tabsRef.value.querySelector(`#${id}`).offsetLeft;
  tabsRef.value.scrollTo({
    left: scrollToValue,
    behavior: "smooth",
  });
};

const setActiveProject = (id) => {
  activeProject.value = id;
};

const entered = (project) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
    debounceTimer.value = null;
  }

  debounceTimer.value = setTimeout(() => {
    setActiveProject(project.id);
    debounceTimer.value = null;
  }, 150);
};

const makeColorsString = (project) => {
  const defaultColor = "var(--alt-background)";
  const funColor = project.color ? project.color : defaultColor;
  const darkColor = project["dark_color"] ? project.dark_color : defaultColor;
  return `
    --fun-color: ${funColor};
    --dark-color:${darkColor};
  `;
};

const message = (name) => {
  const messages = [
    "Check it out!",
    "Wanna see?",
    "See it now!",
    "Explore it!",
    "Have a look!",
    "Check this out!",
    "See more!",
    "Peak under the hood!",
    "Let’s go!",
    "Discover more!",
    "Take a look!",
  ];

  const hash = name.length % messages.length;
  return messages[hash];
};
</script>

<template>
  <div class="project-accordion">
    <ul class="tabs" ref="tabsRef">
      <li
        v-for="category in categories"
        :key="category.id"
        :id="category.id"
        :class='activeCategory === category.id ? "active" : "in-active"'
      >
        <button @click="setActiveCategory(category.id)" class="h6">
          {{ category.name }}
        </button>
      </li>
    </ul>
    <TransitionGroup
      tag="ul"
      class="panels"
      name="panels"
    >
      <li
        v-for="category in activeCategoryIndex"
        :key="category.id"
        :id="category.id"
        ref="panels"
        class="panel"
      >
        <ul class="projects">
          <li
            class="project"
            v-for="project in category.projects"
            :key="project.id"
            @mouseenter="entered(project)"
            @click="entered(project)"
          >
            <div
              class="project"
              :class='activeProject === project.id ? "active" : "in-active"'
              :style="makeColorsString(project)"
            >
              <Transition name="project-card">
                <div v-show="activeProject === project.id" class="tmp-asset">
                  <ProjectsAssetCard
                    v-if="project.video_url"
                    :video_url="project.video_url"
                  />
                </div>
              </Transition>
              <TLink :href="project.url" target="_blank">
                <h3
                  v-html="
                    project.name +
                    `<span class='learn-more'>👉 ${message(project.name)}</span>`
                  "
                />
              </TLink>
            </div>
          </li>
        </ul>
      </li>
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/variables/breakpoints" as *;

.project-accordion {
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  .tabs {
    flex: 1;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      button {
        transition: 350ms ease-in-out;
        position: relative;
        &::after {
          --width: 100%;
          --height: 1px;
          content: "";
          position: absolute;
          width: var(--width);
          height: var(--height);
          left: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            currentColor,
            currentColor,
            transparent,
            transparent
          );
          background-size: 0 var(--height);
          background-size: calc(var(--width) * 4) var(--height);
          background-repeat: no-repeat;
          transition: 500ms ease;
          background-position: var(--width) 0;
        }
      }
      &.active {
        button {
          margin-left: 0.5rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          color: var(--blue);
          &::after {
            background-position: 0 0;
          }
        }
      }
      &:hover {
        button {
          font-weight: 900;
          &::after {
            background-position: 0 0;
          }
        }
      }
      + li {
        margin-top: 1rem;
      }
    }
  }

  .panels {
    flex: 2;
    list-style: none;
    padding: 0;
    margin: 0;
    transition: 850ms ease;
    position: relative;

    .panels-enter-active,
    .panels-leave-active {
      transition: 850ms ease;
      pointer-events: none;
      user-select: none;
      width: 100%;
      transition-delay: 500ms;
    }

    .panels-leave-active {
      position: absolute;
      transition-delay: 0ms;
    }

    .panels-enter-from,
    .panels-leave-to {
      opacity: 0;
      transform: translateX(10%);
    }
    .panels-enter-from {
      transform: translateX(-10%);
    }

    .panel {
      .projects {
        .project {
          position: relative;
          .tmp-asset {
            --width: calc(var(--vw) * 30);
            --half-width: calc(var(--width) / 2);
            opacity: 0;
            position: absolute;
            aspect-ratio: 16 / 9;
            width: var(--width);
            left: 60%;
            top: 50%;
            z-index: 0;
            transform: translate(-50%, -50%);
            clip-path: polygon(
              -100% -100%,
              200% -100%,
              200% 200%,
              -100% 200%
            );

            // clip-path: polygon(
            //   100% 0,
            //   100% 0,
            //   0 0,
            //   0 100%,
            //   100% 100%,
            //   100% 100%
            // );
          }

          a {
            display: inline-block;
            position: relative;
            z-index: 1;
            --transition: 550ms ease-in-out;
            h3 {
              text-shadow: 0px 0px 20px var(--background);
              transition: var(--transition);
              margin-left: -0.5rem;
              position: relative;
              padding-left: 0em;

              &::before {
                content: "👉";
                margin-right: 0.5rem;
                opacity: 0;
                transition: var(--transition);
                position: absolute;
                top: 0;
                left: -1.5em;
                rotate: 15deg;
              }
              &::after {
                content: "";
                z-index: -1;
                background: var(--background);
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                filter: blur(25px);
                opacity: 0.75;
              }
            }

            .learn-more {
              display: none;
            }

            &:hover {
              h3 {
                font-weight: 800;
              }
            }
          }

          &.active {
            .tmp-asset {
              opacity: 1;
            }
            a {
              h3 {
                font-weight: 500;
                letter-spacing: -0.05em;
                margin-left: 0;
                padding-left: 1.25em;
                color: var(--project-color);
                &::before {
                  opacity: 1;
                  left: 0;
                  rotate: 0deg;
                }
              }
            }
          }

          .project-card-enter-active,
          .project-card-leave-active {
            transition: 850ms ease;
          }

          .project-card-enter-from,
          .project-card-leave-to {
            // left: 115%;
            left: 85%;
            scale: 0.9;
            opacity: 0;
            filter: blur(1px) grayscale(0.9);
            // clip-path: polygon(
            //   100% 0,
            //   100% 0,
            //   100% 0,
            //   100% 100%,
            //   100% 100%,
            //   100% 100%
            // );
            clip-path: polygon(90% 50%, 90% 50%, 90% 50%, 90% 50%);
          }

          .project-card-enter-from {
            clip-path: polygon(10% 50%, 10% 50%, 10% 50%, 10% 50%);

            // clip-path: polygon(0 0, 100% 0, 0 0, 0 100%, 100% 100%, 0 100%);
            left: 85%;
          }

          + .project {
            margin-top: 1rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: $tablet) {
    flex-direction: column;
    .tabs {
      width: auto;
      display: flex;
      scroll-snap-type: x mandatory;
      overflow-x: auto;
      gap: 1rem;
      padding-bottom: 1rem;
      flex-wrap: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      align-items: flex-start;
      scrollbar-width: none;
      position: relative;

      li {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: baseline;

        width: calc(var(--vw) * 30);
        // flex: 0 0 40%;
        min-width: max-content;
        scroll-snap-align: center;

        button {
          padding: 0;
          font-size: 1rem;
          width: max-content;
          display: inline-block;
          margin: auto;
        }
        + li {
          margin-top: 0;
        }

        &.active {
          button {
            margin-left: auto;
            letter-spacing: unset;
          }
        }
      }
    }

    .panels {
      .panel {
        .projects {
          .project {
            aspect-ratio: 16/9;
            display: flex;
            justify-content: flex-end;
            width: 100%;
            flex-direction: column;

            a {
              h3 {
                font-weight: 500;
                letter-spacing: -0.05em;
                margin-left: 0;
                padding-left: 0;
                color: var(--project-color);
                position: absolute;
                top: 100%;

                &::before {
                  opacity: 0;
                  left: 0;
                  rotate: 0deg;
                }
                font-size: 1.25rem;
                font-weight: 900;
                max-width: 100%;
              }
              .learn-more {
                display: block;
                font-size: 0.7rem;
              }
            }

            .tmp-asset {
              --width: calc(var(--vw) * 65);
              left: 0;
              top: 0;
              transform: translate(0) !important;
              opacity: 1 !important;
            }

            &.in-active {
              .tmp-asset {
                display: block !important;
              }
            }

            &.active {
              a {
                h3 {
                  padding-left: 0;
                  &::before {
                    opacity: 0;
                  }
                }
              }
            }

            + .project {
              margin-top: 7rem;
            }

            .project-card-enter-active,
            .project-card-leave-active {
              transition: 0ms ease !important;
              clip-path: polygon(
                -100% -100%,
                200% -100%,
                200% 200%,
                -100% 200%
              ) !important;
              left: unset !important;
              scale: 1 !important;
              opacity: 1 !important;
              filter: blur(0px) grayscale(0) !important;
              .tmp-asset {
                transform: translate(0) !important;
              }
            }
            .project-card-enter-from,
            .project-card-leave-to {
              opacity: 1;
              clip-path: polygon(
                -100% -100%,
                200% -100%,
                200% 200%,
                -100% 200%
              );
              .tmp-asset {
                transform: translate(0) !important;
              }
            }
          }
        }
      }
    }
  }
}
.dark-mode {
  .project-accordion {
    .panels {
      .panel {
        .projects {
          .project {
            --project-color: var(--dark-color);
          }
        }
      }
    }
  }
}
.light-mode {
  .project-accordion {
    .panels {
      .panel {
        .projects {
          .project {
            --project-color: var(--fun-color);
          }
        }
      }
    }
  }
}

@keyframes pulse {
  0% {
    width: 5%;
  }
  50% {
    width: 20%;
  }
  100% {
    width: 5%;
  }
}
</style>
