<template>
  <nuxt-link
    :to="`/movie/${movie.id}`"
    :class="`${widthCard} block mt-2`"
    @click="$emit('on:select-movie')"
  >
    <div class="overflow-hidden rounded relative">
      <NuxtImg
        :src="getImageUrl(movie.poster_path)"
        :alt="movie.title"
        :title="movie.title"
        :class="`${widthCard} h-auto rounded duration-300 ease-in-out hover:scale-110 transition-transform`"
        :custom="true"
        v-slot="{ src, isLoaded, imgAttrs }"
      >
        <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

        <img v-else src="/image-loading.svg" alt="placeholder" />
      </NuxtImg>
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

defineEmits<{
  (e: 'on:select-movie'): void
}>()

withDefaults(
  defineProps<{
    movie: Movie
    widthCard?: string
  }>(),
  {
    widthCard: 'w-44'
  }
)
</script>

<style></style>
