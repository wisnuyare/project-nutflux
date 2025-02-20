<template>
  <div class="swiper-coverflow bg-darkGray">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 0,
        stretch: -60,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      }"
      :loop="true"
      :modules="modules"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
      }"
      class="carousel"
    >
      <swiper-slide v-for="movie in movies.slice(1)" :key="movie.id">
        <div
          class="relative bg-black text-white p-6 flex max-w-2xl h-[20rem] overflow-visible"
        >
          <!-- Movie Poster -->
          <div
            class="absolute -left-2 -top-2 -bottom-2 overflow-visible w-[42%] z-50"
          >
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              :alt="movie.title"
            />
          </div>

          <!-- Movie Details -->
          <div
            class="relative flex flex-col justify-between w-3/5 ml-[45%] w-[58%] h-full"
          >
            <!-- Rating -->
            <div class="flex items-center text-white font-bold text-[1.125rem]">
              <span class="font-bold"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="gold"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
                {{ movie.vote_average.toFixed(1) }}</span
              >
            </div>

            <!-- Title -->
            <h2
              class="text-[1.75rem] font-medium text-white leading-tight mt-2"
            >
              {{ movie.title }}
            </h2>

            <!-- Year & Genre -->
            <p class="text-gray-400 text-base font-normal mt-2">
              {{ new Date(movie.release_date).getFullYear() }} •
              {{ getGenre(movie.genre_ids[0]) }}
            </p>

            <!-- Description -->
            <div class="flex-1 flex mt-2 overflow-hidden">
              <p
                class="text-gray-300 text-[0.875rem] font-normal leading-relaxed whitespace-normal"
              >
                {{ movie.overview }}
              </p>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="swiper-pagination"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

const modules = [EffectCoverflow, Navigation, Pagination];

const props = defineProps({
  movies: Array,
});
console.log(props.movies);
</script>

<style scoped>
.swiper-coverflow {
  width: 100%;
  padding-top: 50px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 550px;
}

.swiper-slide img {
  display: block;
  height: 100%;
  filter: brightness(0.7);
}

.swiper-slide-active img {
  filter: brightness(1);
}

.swiper-pagination {
  position: relative;
}

.swiper-pagination-bullet {
  background: red;
  opacity: 0.5;
  width: 10px;
  height: 10px;
  margin: 0 5px;
}
</style>
