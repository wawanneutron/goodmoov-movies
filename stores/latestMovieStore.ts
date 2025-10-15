import { defineStore } from 'pinia'
import type { Movie, ResponseMovies } from '@/types/movie'

export const useLatestMovieStore = defineStore('latestMovie', () => {
  const latestMovies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchLatestMovies = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await useTmdbAPI<ResponseMovies>('movie/now_playing')

      latestMovies.value = data.results
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { latestMovies, loading, error, fetchLatestMovies }
})
