import { defineStore } from 'pinia'
import type { Movie } from '@/types/movie'

export const usePopularMovieStore = defineStore('popularMovie', () => {
  const config = useRuntimeConfig()
  const API_TOKEN = config.public.API_KEY
  const BASE_URL = config.public.BASE_API

  const popularMovies = ref<Movie[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchPopularMovies = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${BASE_URL}/movie/popular`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json'
        }
      })
      if (!res.ok) throw new Error('Failed to fetch popular movies')

      const data = await res.json()
      popularMovies.value = data.results
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { popularMovies, loading, error, fetchPopularMovies }
})
