<script setup>
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const { totalPages, currentPage } = toRefs(props);

const truncatedPages = ref([]);

// if there are filter params in the api call
watch(totalPages, (newValue, oldValue) => {
  paginate(currentPage.value, totalPages.value);
});

watch(currentPage, (newValue, oldValue) => {
  truncatedPages.value = paginate(currentPage.value, totalPages.value);
});

const paginate = (currentPage, totalPages) => {
  if (!totalPages) return false; // No pages to paginate

  const lastPage = totalPages;
  const pageRange = Array.from({ length: totalPages }, (v, k) => k + 1);

  if (lastPage <= 2) return false; // Not enough pages to paginate

  if (lastPage < 7) {
    // Less than 7 pages, so just show all pages
    pageRange.shift(); // Remove the first page (1)
    pageRange.pop(); // Remove the last page (lastPage)
    return pageRange;
  }

  const isStart = currentPage <= 4;
  const isEnd = currentPage >= lastPage - 4;

  // Calculate the start and end slices for the visible pages
  const startSlice = isStart ? 1 : isEnd ? lastPage - 6 : currentPage - 3;
  const endSlice = isEnd ? lastPage - 1 : isStart ? 6 : currentPage + 2;
  const pagesToShow = pageRange.slice(startSlice, endSlice);

  // Add placeholders (0) for ellipsis if not at the start or end
  if (!isStart) pagesToShow.unshift(0);
  if (!isEnd) pagesToShow.push(0);

  return pagesToShow;
};

const emit = defineEmits(["changePage"]);

const changePage = (num, type) => {
  let current = currentPage.value;
  if (type === "next") {
    if (current < totalPages.value) {
      current += 1;
    }
  } else if (type === "previous") {
    if (current > 1) {
      current -= 1;
    }
  } else {
    if (current !== num) {
      current = num;
    }
  }
  emit("changePage", current);
};

defineExpose({
  changePage,
});

const startPages = computed(() => {
  return truncatedPages.value.filter((num) => num !== 0)[0];
});

onMounted(() => {
  if (totalPages.value > 0) {
    truncatedPages.value = paginate(currentPage.value, totalPages.value);
  }
});
</script>

<template>
  <nav class="theme-pagination" aria-label="Pagination">
    <button
      class="arrow previous"
      @click='changePage(null, "previous")'
      :aria-disabled='currentPage === 1 ? "true" : null'
      :class="{ disabled: currentPage === 1 }"
    >
      <span class="sr-only">go to Previous {{ content }}</span>
      <slot name="left-arrow" />
    </button>
    <ul>
      <li>
        <button
          :class="{ active: currentPage === 1 }"
          class="number"
          :aria-current='currentPage === 1 ? "true" : "false"'
          @click="changePage(1, null)"
        >
          <span class="sr-only" v-if="currentPage !== 1">Go to page </span>
          1
        </button>
      </li>
      <li v-for="(num, index) in truncatedPages" :key="`trunc-page-${index}`">
        <span v-if="num === 0" class="number">...</span>

        <button
          v-else
          :class="{ active: num === currentPage }"
          class="number"
          :aria-current='num === currentPage ? "true" : "false"'
          @click="changePage(num, null)"
        >
          <span class="sr-only" v-if="num !== currentPage">Go to page </span>
          {{ num }}
        </button>
      </li>
      <li>
        <button
          :class="{ active: totalPages === currentPage }"
          class="number"
          :aria-current='totalPages === currentPage ? "true" : "false"'
          @click="changePage(totalPages, null)"
        >
          <span class="sr-only" v-if="totalPages !== currentPage">Go to page
          </span>
          {{ totalPages }}
        </button>
      </li>
    </ul>
    <button
      class="arrow next"
      @click='changePage(null, "next")'
      :class="{ disabled: currentPage === totalPages }"
      :aria-disabled='currentPage === totalPages ? "true" : null'
    >
      <slot name="right-arrow" />
      <span class="sr-only">go to Next {{ content }}</span>
    </button>
  </nav>
</template>

<style lang="scss">
.theme-pagination {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 1rem;

    li {}
  }

  button {
    border: 2px solid transparent;
    margin: 0;
    display: flex;
    align-items: center;

    &:hover {
      border-color: blue;
    }
    &:focus {
      border: 2px dotted blue;
    }
  }

  .disabled {
    cursor: not-allowed;
  }
}
</style>
