import { defineStore } from 'pinia'
import type { Movie } from '@/types/movie'

export const useMovieByGenreStore = defineStore('movieByGenre', () => {
  const config = useRuntimeConfig()
  const API_TOKEN = config.public.API_KEY
  const BASE_URL = config.public.BASE_API

  const movies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const hasMore = ref(true)

  const fetchMovieByGenre = async (genreId: string, page = 1) => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(
        `${BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json'
          }
        }
      )
      if (!res.ok) throw new Error('Failed to fetch movies')

      const data = await res.json()

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
