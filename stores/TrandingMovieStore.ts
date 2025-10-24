import type { Movie, Response } from '@/types/movie'
import { defineStore } from 'pinia'

export const useTrandingMovieStore = defineStore('trandingMovie', () => {
  const trandingMovies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTrandingMovies = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await useTmdbAPI<Response<Movie>>('trending/movie/week')

      trandingMovies.value = data.results
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { trandingMovies, loading, error, fetchTrandingMovies }
})
