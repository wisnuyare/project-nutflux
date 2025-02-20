<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full flex items-center justify-between p-4 text-customGray transition-all z-50 duration-300',
      isScrolled ? 'bg-white bg-opacity-50' : 'bg-white bg-opacity-5',
    ]"
  >
    <!-- Logo on the left -->
    <div
      class="container max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[120px] flex flex-col md:flex-row gap-10"
    >
      <NuxtLink to="/" class="flex items-center space-x-4 cursor-pointer">
        <img src="@/assets/MoovieTime-Logo.svg" alt="Logo" class="h-8" />
      </NuxtLink>

      <!-- Search bar in the center -->
      <SearchBar />

      <!-- Fixed menu (Movies, TV Shows, Login) -->
      <div class="flex items-center space-x-6">
        <!-- Categories dropdown button -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center text-customGray"
          >
            <img
              src="@/assets/fourleaf.svg"
              alt="Categories"
              class="h-5 w-5 mr-2"
            />
            Categories
          </button>
          <!-- Dropdown -->
          <div
            v-if="dropdownVisible"
            class="absolute top-full left-0 w-48 mt-2 bg-white text-black rounded-md custom-shadow z-50"
          >
            <ul class="space-y-2 p-4">
              <li v-for="genre in genres" :key="genre.id">
                <NuxtLink
                  :to="`/content/movies?category=${genre.id}`"
                  class="block px-4 py-2 hover:bg-gray-200 rounded-md"
                >
                  {{ genre.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <NuxtLink :to="`/content/movies`" class="text-customGray"
          >Movies</NuxtLink
        >
        <NuxtLink :to="`/content/tvshows`" class="text-customGray"
          >TV Shows</NuxtLink
        >
        <button class="text-customGray">Login</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { NuxtLink } from "#components";
import { ref, onMounted, onUnmounted } from "vue";
import { genres } from "~/utils/genreMapping";

const dropdownVisible = ref(false);
const isScrolled = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};
</script>
