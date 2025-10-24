<template>
  <section>
    <SectionTitle width-line="w-12" title="Popular" />
    <ScrollContainer>
      <MovieCardSkeleton
        v-if="loading"
        v-for="n in popularMovies.length"
        :key="n"
      />

      <MovieCard
        v-else
        v-for="(popular, idx) in popularMovies"
        :movie="popular"
        :key="idx"
      />
    </ScrollContainer>
  </section>
</template>

<script lang="ts" setup>
import SectionTitle from '~/components/SectionTitle.vue'

const popularStore = usePopularMovieStore()
const { fetchPopularMovies } = popularStore
const { popularMovies, loading, error } = storeToRefs(popularStore)

onMounted(async () => {
  await fetchPopularMovies()
})
</script>

<style></style>
