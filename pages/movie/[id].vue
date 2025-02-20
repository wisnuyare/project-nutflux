<template>
  <div class="w-full">
    <Header />

    <div v-if="isLoading" class="text-center py-10">
      <p class="text-lg text-gray-400">Loading...</p>
    </div>

    <div v-else-if="error" class="text-center py-10">
      <p class="text-lg text-red-400">{{ error }}</p>
    </div>

    <div v-else>
      <div
        class="w-full h-[50vh] bg-cover bg-center relative"
        :style="{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280${detailMovie?.backdrop_path}')`,
        }"
      >
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        <div class="absolute bottom-0 left-0 w-full h-20 bg-black/50"></div>
      </div>

      <section class="bg-white w-full py-16">
        <div
          class="container max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] flex flex-col md:flex-row gap-10 relative mt-[-240px]"
        >
          <div class="w-full md:w-[13.75rem] mt-[-20px]">
            <img
              :src="
                'https://image.tmdb.org/t/p/w500' + detailMovie?.poster_path
              "
              :alt="detailMovie?.title"
              class="shadow-[0px_5px_10px_0px_rgba(0,0,0,0.25)]"
            />
          </div>

          <div class="flex-1">
            <p class="text-white text-lg">
              {{ new Date(detailMovie?.release_date).getFullYear() }}
            </p>
            <h1 class="text-4xl font-bold text-customGray">
              {{ detailMovie?.title }}
            </h1>
            <p class="text-white text-sm">
              {{ detailMovie?.genres?.map((genre) => genre.name).join(", ") }}
            </p>

            <div class="flex w-full mt-6">
              <div class="flex items-center gap-2 mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="gold"
                  class="w-8 h-8 mr-1"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
                <span class="text-4xl font-semibold text-customGray">{{
                  detailMovie?.vote_average?.toFixed(1) ?? "0"
                }}</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-5">
                <div class="flex flex-col mt-2">
                  <span
                    class="text-white text-opacity-50 text-xs uppercase font-medium"
                    >User Score</span
                  >
                  <span class="text-white font-medium">{{
                    detailMovie?.vote_count ?? "N/A"
                  }}</span>
                </div>
                <div class="flex flex-col mt-2">
                  <span
                    class="text-white text-opacity-50 text-xs uppercase font-medium"
                    >Status</span
                  >
                  <span class="text-white font-medium">{{
                    detailMovie?.status ?? "N/A"
                  }}</span>
                </div>
                <div class="flex flex-col mt-2">
                  <span
                    class="text-white text-opacity-50 text-xs uppercase font-medium"
                    >Language</span
                  >
                  <span class="text-white font-medium">{{
                    getLanguageName(detailMovie?.original_language) ?? "N/A"
                  }}</span>
                </div>
                <div class="flex flex-col mt-2">
                  <span
                    class="text-white text-opacity-50 text-xs uppercase font-medium"
                    >Budget</span
                  >
                  <span class="text-white font-medium">
                    {{
                      detailMovie?.budget?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      }) ?? "N/A"
                    }}
                  </span>
                </div>
                <div class="flex flex-col mt-2">
                  <span
                    class="text-white text-opacity-50 text-xs uppercase font-medium"
                    >Production</span
                  >
                  <span class="text-white font-medium">
                    {{ detailMovie?.production_companies?.[0]?.name ?? "N/A" }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <p class="uppercase text-sm text-customRed font-semibold">
                Overview
              </p>
              <p class="text-sm mt-3">
                {{ detailMovie?.overview ?? "No overview available." }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full pb-16">
        <div
          class="container max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] relative mb-4 mt-[-1rem]"
        >
          <p class="uppercase text-sm text-customRed font-semibold">Review</p>
        </div>
        <div
          class="container max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] flex flex-row justify-between gap-10 relative"
        >
          <ReviewCard
            :username="'SWITCH.'"
            :date="'2020-12-18'"
            :rating="7.0"
            :reviewText="`It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie. The pieces are there, and there are moments I adore, but it does come across as a bit of a mess, even though the action sequences are breathtaking. If you're a fan of the original film, you'll be more willing to take the ride, but for those more indifferent, it may be a bit of a blander sit. If you can and are planning to watch it, the theatrical experience is the way to go - there is nothing like seeing these stunning sets, fun action scenes and hearing Zimmer's jaw-dropping score like on the big screen. - Chris dos Santos De Alburqueue De Esteban De Cambiaso`"
          />
          <ReviewCard
            :username="'msbreviews'"
            :date="'2020-12-18'"
            :rating="8.0"
            :reviewText="`If you enjoy reading my Spoiler-Free reviews, please follow my blog @ https://www.msbreviews.com
The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only `"
          />
        </div>
      </section>
      <section class="bg-darkGray w-full pt-16 pb-8">
        <div
          class="container max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px]"
        >
          <h2 class="text-white text-sm font-semibold uppercase mb-8">
            Recommendation Movies
          </h2>
          <MovieList :movies="recommendations" :totalRows="1" />
        </div>
      </section>

      <section class="w-full bg-darkGray">
        <Footer />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const { fetchMoviesDetail, fetchMoviesRecommendations } = useMovies();

const route = useRoute();
const detailMovie = ref(null);
const recommendations = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  isLoading.value = true;
  try {
    detailMovie.value = await fetchMoviesDetail(route.params.id);
    recommendations.value = await fetchMoviesRecommendations(route.params.id);
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch movie details";
  } finally {
    isLoading.value = false;
  }
});
</script>
