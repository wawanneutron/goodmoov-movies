import type { MovieDetail } from '@/types/movie'
import { defineStore } from 'pinia'

export const useMovieDetailStore = defineStore('detailMovie', () => {
  const movieDetail = ref<MovieDetail>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMovieDetail = async (movieId: string) => {
    loading.value = true
    error.value = null

    try {
      const data = await useTmdbAPI<MovieDetail>(`movie/${movieId}`, {
        query: { append_to_response: 'credits,recommendations' }
      })

      movieDetail.value = data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { movieDetail, loading, error, fetchMovieDetail }
})
