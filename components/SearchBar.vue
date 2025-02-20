<template>
  <div class="relative w-full max-w-xl">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Find Movie"
      class="bg-black bg-opacity-13 text-customGray p-2 pl-10 pr-4 rounded-full w-full"
      @keyup.enter="goToSearchPage"
    />
    <!-- Clapperboard icon -->
    <img
      src="@/assets/clapperboard.svg"
      alt="Logo"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-customGray"
    />
    <!-- Search icon -->
    <svg
      class="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-customGray"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>

    <!-- Search dropdown -->
    <ul
      v-if="searchResults.length > 0"
      class="absolute top-11 left-0 w-full bg-black bg-opacity-90 rounded-lg text-white px-8 py-4"
    >
      <li
        v-for="movie in searchResults.slice(0, 7)"
        :key="movie.id"
        class="p-2 hover:bg-gray-700 text-sm font-semibold cursor-pointer text-customGray capitalize"
        @click="goToMovie(movie.id)"
      >
        {{ movie.name || movie.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import debounce from "lodash.debounce";
const { fetchSearchByKeyword } = useMovies();

const searchTerm = ref("");
const searchResults = ref([]);
const router = useRouter();

// Fetch search results and update searchResults array
const debouncedSearch = debounce(async (query) => {
  if (query.trim() === "") {
    searchResults.value = []; // Clear results if empty
    return;
  }

  const results = await fetchSearchByKeyword(query);
  searchResults.value = results || [];
}, 300);

// Watch for searchTerm changes
watch(searchTerm, (newVal) => {
  debouncedSearch(newVal);
});

// Navigate to movie detail page
const goToMovie = (id) => {
  router.push(`/movie/${id}`);
  searchResults.value = []; // Close dropdown
};

// Navigate to search results page
const goToSearchPage = () => {
  if (searchTerm.value.trim()) {
    router.push(`/content/movies?q=${encodeURIComponent(searchTerm.value)}`);
    searchTerm.value = ""; // Reset input after enter
    searchResults.value = []; // Close dropdown
  }
};
</script>
