import { defineStore } from 'pinia'
import type { Movie } from '@/types/movie'

export const useLatestMovieStore = defineStore('latestMovie', () => {
  const config = useRuntimeConfig()
  const API_TOKEN = config.public.API_KEY
  const BASE_URL = config.public.BASE_API

  const latestMovies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchLatestMovies = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${BASE_URL}/movie/now_playing`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json'
        }
      })
      if (!res.ok) throw new Error('Failed to fetch latest movies')

      const data = await res.json()
      latestMovies.value = data.results
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { latestMovies, loading, error, fetchLatestMovies }
})
