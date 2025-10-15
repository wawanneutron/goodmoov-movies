import { defineStore } from 'pinia'
import type { Movie, ResponseMovies } from '@/types/movie'

export const usePopularMovieStore = defineStore('popularMovie', () => {
  const popularMovies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPopularMovies = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await useTmdbAPI<ResponseMovies>('movie/popular')

      popularMovies.value = data.results
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { popularMovies, loading, error, fetchPopularMovies }
})
