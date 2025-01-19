<template>
  <h1>Bad</h1>
</template>
<!-- <script setup>
// Stores
import { useBreadcrumbStore } from "@/stores/breadcrumbs";

// Composables
// import { storeToRefs } from "pinia";

// Instantiate stores
const breadcrumbStore = useBreadcrumbStore();

// Variables
const { breadcrumbs } = storeToRefs(breadcrumbStore);
const route = useRoute();

const hasBreadcrumbs = computed(() => {
  if (route.path === "/" || route.path === "/preview/live/") return false;
  if (!breadcrumbs?.value) return false;
  const breadcrumbItems = breadcrumbs?.value?.itemListElement;
  const count = breadcrumbItems?.length;
  if (count <= 1) return false;
  const secondItem = breadcrumbItems?.[1];
  if (secondItem?.name === "Home") return false;
  return count > 1;
});

const breadcrumbItems = computed(() => {
  if (!hasBreadcrumbs.value) return [];
  return breadcrumbs.value.itemListElement;
});
</script>

<template>
  <div class="container" v-if="hasBreadcrumbs">
    <ul
      class="breadcrumbs fs-12"
      :class='breadcrumbItems.length >= 2 ? "mobile-chop" : null'
    >
      <li v-for="(item, index) in breadcrumbItems">
        <TLink v-if="item.item" :href="item.item" class="base">
          <TSvg type="chevron-left" />
          <THtml :html="item.name" tag="span" />
        </TLink>
        <span v-else class="active">
          <THtml :html="item.name" tag="span" />
        </span>
        <span class="pipe" v-if="index < breadcrumbItems.length - 1">/</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/variables/breakpoints" as *;
// @use "variables/breakpoints" as *;

.breadcrumbs {
  display: flex;
  gap: 1em;
  font-weight: 500;
  letter-spacing: 0.24px;
  margin-bottom: 0.9rem;

  li {
    display: flex;
    align-items: center;
    svg {
      display: none;
    }
  }

  .active {
    font-weight: 700;
  }

  .pipe {
    margin-left: 1em;
  }
}

@media (max-width: $tablet) {
  .breadcrumbs {
    &.mobile-chop {
      li {
        display: none;
        // &:nth-last-child(-n + 2) {
        //   display: block;
        // }

        &:nth-last-child(2) {
          display: block;
          a {
            display: flex;
            align-items: center;
            gap: 0.5em;

            svg {
              color: var(--black-500);
              display: block;
              height: 0.75em;
            }
          }
          .pipe {
            display: none;
          }
        }
      }
    }
  }
}
</style> -->
