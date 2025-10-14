import { defineStore } from 'pinia'
import type { Movie } from '@/types/movie'

export const useTrandingMovieStore = defineStore('trandingMovie', () => {
  const config = useRuntimeConfig()
  const API_TOKEN = config.public.API_KEY
  const BASE_URL = config.public.BASE_API

  const trandingMovies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTrandingMovies = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${BASE_URL}/trending/movie/week`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json'
        }
      })
      if (!res.ok) throw new Error('Failed to fetch tranding movies')

      const data = await res.json()
      trandingMovies.value = data.results
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { trandingMovies, loading, error, fetchTrandingMovies }
})
