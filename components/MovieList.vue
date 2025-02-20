<template>
  <div>
    <div
      v-if="movies.length"
      class="grid gap-4"
      :class="{
        'grid-cols-5': columns === 5,
        'grid-cols-4': columns === 4,
        'mt-[-225px]': isHomePage,
      }"
    >
      <MovieCard
        v-for="movie in isHomePage || totalRows === 1
          ? movies.slice(0, columns * totalRows)
          : movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <div v-else class="flex justify-center mt-8 text-customGray">
      <p class="text-lg">No results found. Try another keyword.</p>
    </div>
    <div class="flex justify-center mt-4 mb-8 pb-12">
      <button
        v-if="loadMore && movies.length"
        @click="loadMoreMovies"
        :disabled="isLoading"
        class="mt-4 px-10 justify-center py-2 bg-customRed text-customGray rounded-full"
      >
        {{ isLoading ? "Loading..." : "Load More" }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: { type: Number, default: 5 },
  totalRows: { type: Number, default: 2 },
  isHomePage: { type: Boolean, default: false },
  loadMore: { type: Boolean, default: false },
  movies: { type: Array, required: true },
});

const emit = defineEmits(["loadMoreMovies"]);
const isLoading = ref(false);

const loadMoreMovies = async () => {
  isLoading.value = true;
  await emit("loadMoreMovies");
  isLoading.value = false;
};
</script>
