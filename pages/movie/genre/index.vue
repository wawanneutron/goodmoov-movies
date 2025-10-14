<template>
  <section class="mt-8">
    <div class="flex justify-between items-center py-6">
      <button
        class="flex items-center justify-center bg-[var(--theme-primary)] text-[var(--theme-text)] w-12 h-12 rounded-full shadow-md hover:opacity-80 transition-opacity cursor-pointer"
        @click="$router.back()"
      >
        <Icon name="ph:arrow-left-bold" size="24" />
      </button>

      <SectionTitle :title="genreName" />
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

    <div class="flex justify-center mt-8">
      <button
        v-if="hasMore && !loading"
        @click="loadMore"
        class="px-6 py-2 bg-[var(--theme-secondary)] text-[var(--theme-text)] rounded-full shadow hover:opacity-80 transition cursor-pointer"
      >
        Load More
      </button>

      <p v-else-if="!hasMore" class="text-[var(--theme-text)] opacity-70">
        No more movies
      </p>

      <p v-if="loading" class="text-[var(--theme-text)] animate-pulse">
        Loading...
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const movieStore = useMovieByGenreStore()
const { fetchMovieByGenre, loadMoreMovies } = movieStore
const { movies, loading, error, hasMore } = storeToRefs(movieStore)

const route = useRoute()
const genreId = route.query.id as string
const genreName = route.query.name as string

const loadMore = () => {
  if (!genreId) return
  loadMoreMovies(genreId)
}

onMounted(() => {
  if (!genreId) return
  fetchMovieByGenre(genreId)
})
</script>

<style></style>
