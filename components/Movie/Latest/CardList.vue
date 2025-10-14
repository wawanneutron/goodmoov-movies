<template>
  <section>
    <SectionTitle class="w-8" title="Latest" />
    <ScrollContainer>
      <MovieCardSkeleton
        v-if="loading"
        v-for="n in latestMovies.length"
        :key="n"
      />

      <MovieCard
        v-else
        v-for="(latest, idx) in latestMovies"
        :movie="latest"
        :key="idx"
      />
    </ScrollContainer>
  </section>
</template>

<script lang="ts" setup>
const latestStore = useLatestMovieStore()
const { fetchLatestMovies } = latestStore
const { latestMovies, loading, error } = storeToRefs(latestStore)

onMounted(async () => {
  await fetchLatestMovies()
})
</script>

<style></style>
