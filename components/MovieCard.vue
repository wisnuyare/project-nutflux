<template>
  <NuxtLink
    :to="`/movie/${movie.id}`"
    class="relative group overflow-hidden block"
  >
    <!-- Image with gradient overlay -->
    <div class="relative">
      <div
        class="absolute top-0 right-0 z-10 bg-black bg-opacity-65 w-10 h-7 text-customGray flex items-center justify-center"
      >
        <span class="font-bold text-sm">
          {{ movie.vote_average ? movie.vote_average.toFixed(1) : 0.0 }}
        </span>
      </div>

      <!-- Movie Poster -->
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
        :alt="movie.title"
        class="w-full h-full object-cover transition-opacity group-hover:opacity-75"
      />

      <!-- Movie Info -->
      <div class="p-3">
        <h3 class="text-base font-semibold text-customGray">
          {{ movie.title || movie.name }}
        </h3>
        <p class="text-sm text-customDarkGray">
          {{
            new Date(
              movie.release_date || movie.first_air_date || "1999-01-01"
            ).getFullYear()
          }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  movie: Object,
});

console.log(props);
</script>

<style scoped>
/* Custom gradient overlay */
.group:hover .gradient-overlay {
  opacity: 0.8;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.tracking-wide {
  letter-spacing: 0.025em;
}
</style>
