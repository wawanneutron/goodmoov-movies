import { defineStore } from 'pinia'

import type { Genre } from '@/types/movie'

export const useGenreMovieStore = defineStore('genreMovie', () => {
  const config = useRuntimeConfig()
  const API_TOKEN = config.public.API_KEY
  const BASE_URL = config.public.BASE_API

  const genres = ref<Genre[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchGenres = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch(`${BASE_URL}/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          accept: 'application/json'
        }
      })
      if (!res.ok) throw new Error('Failed to fetch genres')

      const data = await res.json()
      genres.value = data.genres
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { genres, loading, error, fetchGenres }
})
