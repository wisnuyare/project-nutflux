<template>
  <div class="p-6 bg-[#F9F9F9] shadow-md rounded-lg">
    <div class="flex justify-between items-center">
      <!-- Profile Section -->
      <div class="flex items-center space-x-3">
        <!-- Profile Picture -->
        <div
          class="w-12 h-12 bg-[#1E232B] bg-opacity-36 rounded-full flex items-center justify-center"
        >
          <img :src="profileImage" alt="User" class="w-12 h-12 rounded-full" />
        </div>
        <!-- Username and Date -->
        <div>
          <p class="text-[0.875rem] font-bold text-gray-700">{{ username }}</p>
          <p class="text-sm font-normal text-[#666666]">
            {{ formattedDate }}
          </p>
        </div>
      </div>

      <!-- Rating Badge -->
      <div
        class="flex items-center px-3 py-1 bg-[#C4C4C4] bg-opacity-28 rounded-[7px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="gold"
          class="w-4 h-4 mr-1 mb-3"
        >
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
        <span class="text-4xl font-semibold text-gray-700">{{
          rating.toFixed(1)
        }}</span>
      </div>
    </div>

    <!-- Review Text -->
    <p class="mt-6 text-[13px] italic font-normal text-black line-clamp-8">
      {{ reviewText }}
      <span
        v-if="reviewText.length > maxLength"
        class="text-red-500 cursor-pointer"
        >... read the rest.</span
      >
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  username: String,
  profileImage: String,
  reviewText: String,
  rating: Number,
  date: String,
});

const maxLength = 200; // Limit the review text length

const formattedDate = computed(() => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date(props.date).toLocaleDateString("en-US", options);
});
</script>
