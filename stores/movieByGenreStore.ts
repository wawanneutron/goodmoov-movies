import { defineStore } from 'pinia'
import type { Movie, ResponseMovies } from '@/types/movie'

export const useMovieByGenreStore = defineStore('movieByGenre', () => {
  const movies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const hasMore = ref(true)

  const fetchMovieByGenre = async (genreId: string, page = 1) => {
    loading.value = true
    error.value = null

    try {
      const data = await useTmdbAPI<ResponseMovies>('discover/movie', {
        query: { with_genres: genreId, page }
      })

      if (page === 1) {
        movies.value = data.results
      } else {
        movies.value.push(...data.results)
      }

      hasMore.value = page < data.total_pages
      currentPage.value = page
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const loadMoreMovies = async (genreId: string) => {
    if (!hasMore.value || loading.value) return
    await fetchMovieByGenre(genreId, currentPage.value + 1)
  }

  return {
    movies,
    loading,
    error,
    hasMore,
    currentPage,
    fetchMovieByGenre,
    loadMoreMovies
  }
})
