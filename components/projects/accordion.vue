<script setup>
// Content
import { categories } from "@/assets/cms";

// Variables
const activeProject = ref(categories[0].projects[0].id);
const activeCategory = ref(categories[0].id);
const panels = ref(null);
const debounceTimer = ref(null);

// Methods
const setActiveCategory = (id) => {
  activeCategory.value = id;
  setTimeout(() => {
    // Set first project in category as active
    setActiveProject(
      categories.find((category) => category.id === id).projects[0].id,
    );
  }, 100);
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
</script>

<template>
  <div class="project-accordion">
    <ul class="tabs">
      <li
        v-for="category in categories"
        :key="category.id"
        :class='activeCategory === category.id ? "active" : "in-active"'
      >
        <button @click="setActiveCategory(category.id)" class="h6">
          {{ category.name }}
        </button>
      </li>
    </ul>
    <TransitionGroup tag="ul" class="panels" name="panels">
      <li
        v-for="category in categories"
        :key="category.id"
        v-show="activeCategory === category.id"
        ref="panels"
        class="panel"
      >
        <ul class="projects">
          <li
            class="project"
            v-for="project in category.projects"
            :key="project.id"
          >
            <div
              @mouseenter="entered(project)"
              class="project"
              :class='activeProject === project.id ? "active" : "in-active"'
              :style="makeColorsString(project)"
            >
              <Transition name="project-card">
                <div v-if="activeProject === project.id" class="tmp-asset">
                  <ProjectsAssetCard
                    v-if="project.video_url"
                    :video_url="project.video_url"
                  />
                </div>
              </Transition>
              <TLink :href="project.url" target="_blank">
                <THtml :html="project.name" tag="h3" />
              </TLink>
            </div>
          </li>
        </ul>
      </li>
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
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

    .panels-enter-active,
    .panels-leave-active {
      transition: 850ms ease;
    }

    .panels-enter-from,
    .panels-leave-to {
      opacity: 0;
      transform: translateX(10%);
      position: absolute;
      top: 0;
    }
    .panels-enter-from {
      transform: translateX(-10%);
    }

    .panel {
      // max-height: var(--max-height);
      // overflow: auto;

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
              margin-left: calc(-1em + -0.5rem);
              position: relative;

              &::before {
                content: "👉";
                margin-right: 0.5rem;
                opacity: 0;
                transition: var(--transition);
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

            &:hover {
              h3 {
                font-weight: 800;
              }
            }
          }

          &.active {
            .tmp-asset {
              opacity: 0.5;
              opacity: .8;
            }
            a {
              h3 {
                font-weight: 500;
                letter-spacing: -0.05em;
                margin-left: 0;
                color: var(--project-color);
                &::before {
                  opacity: 1;
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
</style>
