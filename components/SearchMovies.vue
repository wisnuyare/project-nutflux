<script setup>
import { ref, watch } from "vue";

const config = useRuntimeConfig();
const query = ref("");
const movies = ref([]);

watch(query, async (newQuery) => {
  if (newQuery.length > 2) {
    const { data } = await useFetch(config.public.apiBase, {
      params: {
        apikey: config.public.apiKey,
        s: newQuery,
      }
    });
    movies.value = data.value.Search || [];
  } else {
    movies.value = [];
  }
});
</script>

<template>
  <div class="my-4">
    <input
      v-model="query"
      type="text"
      placeholder="Search movies..."
      class="w-full p-2 rounded bg-gray-900 text-white outline-none border border-gray-700 focus:border-blue-500"
    />

    <div v-if="movies.length" class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </div>
  </div>
</template>
