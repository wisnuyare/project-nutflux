<template>
  <div class="w-full">
    <Header />
    <!-- Banner Section -->
    <div v-if="bannerMovies.length === 0"></div>
    <Banner v-if="bannerMovies.length > 0" :movies="bannerMovies" />

    <!-- Movie List -->
    <section class="w-full py-4 bg-darkGray">
      <div class="h-[333px] bg-white bg-opacity-5">
        <div
          class="container max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] flex justify-between items-center"
        >
          <div class="mt-10">
            <span
              class="text-customGray text-xl font-semibold inline-block border-t-[6px] border-t-[#E74C3C] pt-4"
            >
              Discover &nbsp;
            </span>
            <span
              class="text-customGray text-xl font-semibold inline-block border-t-6 border-t-[#E74C3C] mt-4"
            >
              Movies
            </span>
          </div>
          <div class="mt-10">
            <div class="flex space-x-4 my-4">
              <button
                @click="
                  sortBy = 'popularity.desc';
                  sortMovies();
                "
                :class="{
                  'bg-[#FF0000]': sortBy === 'popularity.desc',
                  'bg-black/20': sortBy !== 'popularity.desc',
                }"
                class="px-4 py-2 text-customGray font-semibold text-[0.875rem] rounded-full mx-3"
              >
                Popularity
              </button>
              <button
                @click="
                  sortBy = 'primary_release_date.desc';
                  sortMovies();
                "
                :class="{
                  'bg-[#FF0000]': sortBy === 'primary_release_date.desc',
                  'bg-black/20': sortBy !== 'primary_release_date.desc',
                }"
                class="px-4 py-2 text-customGray font-semibold text-[0.875rem] rounded-full mx-3"
              >
                Release Date
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sorting Options -->
      <div class="bg-darkGray w-full pt-16 pb-6">
        <div
          class="container max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]"
        >
          <MovieList :movies="discoverMovies" :columns="5" :isHomePage="true" />
        </div>
      </div>
    </section>
    <section class="w-full bg-darkGray">
      <Footer />
    </section>
  </div>
</template>

<script setup>
import MovieList from "@/components/MovieList.vue";
const { fetchTrendingMovies, fetchDiscoverMovies } = useMovies();

const bannerMovies = ref([]);
const discoverMovies = ref([]);
const sortBy = ref("popularity.desc");

// Fetch movies on SSR
onMounted(async () => {
  bannerMovies.value = await fetchTrendingMovies();
  discoverMovies.value = await fetchDiscoverMovies(sortBy.value);
});

// Handle sorting
const sortMovies = async () => {
  discoverMovies.value = await fetchDiscoverMovies(sortBy.value);
};
</script>
