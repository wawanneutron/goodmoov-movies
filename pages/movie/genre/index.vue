<template>
  <section class="mt-8">
    <div class="flex justify-between items-center py-6">
      <button
        class="flex items-center justify-center bg-[var(--theme-primary)] text-[var(--theme-text)] w-12 h-12 rounded-full shadow-md hover:opacity-80 transition-opacity cursor-pointer"
        @click="$router.back()"
      >
        <Icon name="ph:arrow-left-bold" size="24" />
      </button>

      <SectionTitle width-line="8" :title="genreName" />
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 space-y-4">
      <MovieCardSkeleton v-if="loading" v-for="n in movies.length" :key="n" />
      <MovieCard
        v-else
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <MovieLoadMore
      :hasMore="hasMore"
      :loading="loading"
      @on:load-more="loadMore"
    />
  </section>
</template>

<script lang="ts" setup>
const movieStore = useMovieByGenreStore()
const { fetchMovieByGenre, loadMoreMovies } = movieStore
const { movies, loading, error, hasMore } = storeToRefs(movieStore)

const route = useRoute()
let genreId = route.query.id as string
let genreName = route.query.name as string

const loadMore = () => {
  if (!genreId) return
  loadMoreMovies(genreId)
}

onMounted(() => {
  if (!genreId) return
  fetchMovieByGenre(genreId)
})

watch(
  () => [route.query.id, route.query.name],
  ([newGenreId, newGenreName]) => {
    if (typeof newGenreId === 'string' && typeof newGenreName === 'string') {
      fetchMovieByGenre(newGenreId)
      genreName = newGenreName
    }
  }
)
</script>

<style></style>
