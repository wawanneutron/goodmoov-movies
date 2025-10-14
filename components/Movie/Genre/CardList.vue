<template>
  <scrollContainer ref="scrollRef">
    <MovieGenreCardSkeleton
      v-if="loading"
      v-for="n in genres.length"
      :key="n"
    />

    <MovieGenreCard
      v-else
      v-for="(genre, idx) in genres"
      :genre="genre"
      :key="idx"
      @selectGenre="goToGenre"
    />
  </scrollContainer>
</template>

<script lang="ts" setup>
import type ScrollContainer from '@/components/ScrollContainer.vue'
import type { Genre } from '~/types/movie'

const router = useRouter()
const scrollRef = ref<InstanceType<typeof ScrollContainer> | null>(null)

const genreStore = useGenreMovieStore()
const { fetchGenres } = genreStore
const { genres, loading, error } = storeToRefs(genreStore)

const goToGenre = (genre: Genre) => {
  router.push({
    path: '/movie/genre',
    query: {
      id: genre.id,
      name: genre.name
    }
  })
}

onMounted(async () => {
  await fetchGenres()
  scrollRef.value?.handleScroll()
})
</script>

<style></style>
