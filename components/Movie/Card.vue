<template>
  <nuxt-link
    :to="displayData.link"
    :class="`${widthCard} block mt-2`"
    @click="$emit('on:select-item')"
  >
    <div class="overflow-hidden rounded relative">
      <NuxtImg
        :src="getImageUrl(displayData.image)"
        :alt="displayData.title"
        :title="displayData.title"
        :class="`${widthCard} h-auto rounded duration-300 ease-in-out hover:scale-110 transition-transform`"
        :custom="true"
        v-slot="{ src, isLoaded, imgAttrs }"
      >
        <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

        <img v-else src="/image-loading.svg" alt="placeholder" />
      </NuxtImg>
      <span
        v-if="displayData.rating"
        class="bg-[var(--theme-transparent)] text-[var(--theme-text)] text-sm absolute bottom-0 right-0 p-2"
        >{{ formatRating(displayData.rating) }}</span
      >
    </div>
    <div class="text-[var(--theme-text)] text-sm pt-2">
      <p class="truncate font-semibold">
        {{ displayData.title }}
      </p>
      <p class="font-light">
        {{ getYear(displayData.subtitle) }}
      </p>
    </div>
  </nuxt-link>
</template>

<script lang="ts" setup>
import type { Movie, Person, TV } from '~/types/movie'

defineEmits<{
  (e: 'on:select-item'): void
}>()

const props = withDefaults(
  defineProps<{
    item: Movie | Person | TV
    widthCard?: string
    isPeople?: boolean
  }>(),
  {
    widthCard: 'w-44',
    isPeople: false
  }
)

const displayData = computed(() => {
  const isPerson = 'known_for_department' in props.item
  const isTv = 'release_date' in props.item && !('title' in props.item)

  if (isPerson) {
    const person = props.item as Person

    return {
      title: person.name,
      subtitle: person.known_for_department,
      image: person.profile_path,
      rating: null,
      link: `/person/${person.id}`
    }
  } else if (isTv) {
    const tv = props.item as TV

    return {
      title: tv.name,
      subtitle: getYear(tv.first_air_date),
      image: tv.poster_path,
      rating: tv.vote_average,
      link: `/tv/${tv.id}`
    }
  } else {
    const movie = props.item as Movie

    return {
      title: movie.title,
      subtitle: getYear(movie.release_date),
      image: movie.poster_path,
      rating: movie.vote_average,
      link: `/movie/${movie.id}`
    }
  }
})
</script>

<style></style>
