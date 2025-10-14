<template>
  <nuxt-link :to="`/movie/${movie.id}`" class="block w-44 mt-2">
    <div class="overflow-hidden rounded relative">
      <img
        :src="getImageUrl(movie.poster_path)"
        :alt="movie.title"
        :title="movie.title"
        class="w-44 h-auto rounded duration-300 ease-in-out hover:scale-110 transition-transform"
      />
      <span
        class="bg-[var(--theme-transparent)] text-[var(--theme-text)] text-sm absolute bottom-0 right-0 p-2"
        >{{ formatRating(movie.vote_average) }}</span
      >
    </div>
    <div class="text-[var(--theme-text)] text-sm pt-2">
      <p class="truncate font-semibold">
        {{ movie.title }}
      </p>
      <p class="font-light">{{ getYear(movie.release_date) }}</p>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { Movie } from '~/types/movie'

defineProps<{ movie: Movie }>()
</script>

<style></style>
