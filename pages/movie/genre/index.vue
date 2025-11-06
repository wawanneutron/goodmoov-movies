<template>
  <section class="mt-8">
    <div class="flex justify-between items-center py-6">
      <BackButton />
      <SectionTitle width-line="8" :title="genreName" />
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 space-y-4">
      <MovieCardSkeleton v-if="loading" v-for="n in movies.length" :key="n" />
      <MovieCard v-else v-for="movie in movies" :item="movie" :key="movie.id" />
    </div>

    <MovieLoadMore
      :moreMovies="hasMore"
      :loading="loading"
      @on:load-more="loadMore"
    />
  </section>
</template>

<script lang="ts" setup>
import BackButton from '~/components/ui/BackButton.vue'

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
      genreId = newGenreId
      genreName = newGenreName
    }
  }
)
</script>

<style></style>
