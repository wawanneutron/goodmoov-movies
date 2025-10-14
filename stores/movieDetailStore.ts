import { defineStore } from 'pinia'
import type { Movie, MovieDetail } from '@/types/movie'

export const useMovieDetailStore = defineStore('detailMovie', () => {
  const config = useRuntimeConfig()
  const API_TOKEN = config.public.API_KEY
  const BASE_URL = config.public.BASE_API

  const movieDetail = ref<MovieDetail>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchMovieDetail = async (movieId: string) => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(
        `${BASE_URL}/movie/${movieId}?append_to_response=credits,recommendations`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json'
          }
        }
      )
      if (!res.ok) throw new Error('Failed to fetch  movie detail')

      const data = await res.json()
      movieDetail.value = data
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { movieDetail, loading, error, fetchMovieDetail }
})
