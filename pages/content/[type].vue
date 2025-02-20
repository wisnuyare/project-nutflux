<template>
  <div class="w-full bg-darkGray">
    <Header />
    <section class="w-full pt-[232px] sm:pt-52 md:pt-20 xl:pt-[72px]">
      <div class="h-[333px] bg-white bg-opacity-5">
        <div
          class="container max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] flex justify-between items-center"
        >
          <div class="mt-10">
            <span
              class="text-customGray text-[2.25rem] font-semibold inline-block pt-4 relative before:absolute before:top-0 before:left-0 before:w-[85%] before:border-t-[6px] before:border-[#E74C3C]"
            >
              {{ pageTitle }}
            </span>
          </div>
        </div>
      </div>
      <div
        :key="route.fullPath"
        class="container max-w-[1440px] mx-auto max-h-auto px-6 md:px-12 lg:px-[120px] flex mt-[-195px]"
      >
        <div
          v-if="!searchQuery"
          class="w-1/5 bg-gradient-to-r from-[#0E1723] to-[#1E232A] m-4 mb-0 ml-0 rounded-lg"
        >
          <h2
            class="border-b border-[rgba(255,255,255,0.07)] text-base font-semibold px-6 py-4 text-customGray"
          >
            Sort Result By
          </h2>
          <select
            aria-label="Sort by"
            class="w-4/5 mx-6 p-2 rounded text-sm bg-[#E0E0E0] bg-opacity-20 text-customGray my-4"
            @change="fetchMovies"
            v-model="sortBy"
          >
            <option
              class="text-white text-[13px] bg-[#111419]"
              value="popularity.asc"
            >
              Popularity Ascending
            </option>
            <option
              class="text-white text-[13px] bg-[#111419]"
              value="popularity.desc"
            >
              Popularity Descending
            </option>
            <option
              class="text-white text-[13px] bg-[#111419]"
              value="primary_release_date.asc"
            >
              Release Date Ascending
            </option>
            <option
              class="text-white text-[13px] bg-[#111419]"
              value="primary_release_date.desc"
            >
              Release Date Descending
            </option>
            <option
              class="text-white text-[13px] bg-[#111419]"
              value="vote_average.asc"
            >
              Rating Ascending
            </option>
            <option
              class="text-white text-[13px] bg-[#111419]"
              value="vote_average.desc"
            >
              Rating Descending
            </option>
          </select>

          <h2
            class="border-y border-[rgba(255,255,255,0.07)] text-base font-semibold px-6 py-4 text-customGray"
          >
            Genres
          </h2>
          <ul class="space-y-2 py-4 px-6">
            <li v-for="genre in genres" :key="genre.id">
              <label class="flex justify-between">
                <span class="text-sm text-white">{{ genre.name }}</span>
                <input
                  type="checkbox"
                  :value="genre.id"
                  v-model="selectedGenres"
                  class="hidden"
                  @change="fetchMovies"
                />
                <div
                  class="w-[14px] h-[14px] rounded-[4px] border border-white/50 flex items-center justify-center mt-1"
                  :class="{
                    'bg-[#E74C3C]': selectedGenres.includes(genre.id),
                    'bg-white/50': !selectedGenres.includes(genre.id),
                  }"
                >
                  <svg
                    v-if="selectedGenres.includes(genre.id)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="10"
                    height="10"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20.707 5.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L10 14.586l9.293-9.293a1 1 0 0 1 1.414 0z"
                    />
                  </svg>
                </div>
              </label>
            </li>
          </ul>
        </div>
        <div :class="searchQuery ? 'w-full' : 'w-4/5'" class="m-4 mb-0 mr-0">
          <div>
            <MovieList
              :movies="movies"
              :columns="searchQuery ? 5 : 4"
              :totalRows="5"
              :loadMore="!searchQuery"
              @loadMoreMovies="fetchMoreMovies"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="w-full bg-darkGray">
      <Footer />
    </section>
  </div>
</template>

<script setup>
import { useMovieStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { onMounted, watch } from "vue";

const store = useMovieStore();
const route = useRoute();

const { movies, selectedGenres, sortBy, searchQuery, pageTitle } =
  storeToRefs(store);

const { fetchMovies, fetchMoreMovies } = store;

onMounted(async () => {
  store.searchQuery = route.query.q || "";
  store.realType = route.params.type === "movies" ? "movie" : "tv";
  store.currentPage = Number(route.query.page) || 1;

  await fetchMovies();
});

watch(
  () => route.query,
  async (newQuery) => {
    store.searchQuery = newQuery.q || "";
    store.currentPage = Number(newQuery.page) || 1;
    store.selectedGenres = newQuery.category ? [Number(newQuery.category)] : [];

    await fetchMovies();
  },
  { deep: true, immediate: true }
);

watch([sortBy, selectedGenres], async () => {
  await fetchMovies();
});
</script>
