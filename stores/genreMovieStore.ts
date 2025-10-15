import { defineStore } from 'pinia'

import type { Genre, ResponseGenres } from '@/types/movie'

export const useGenreMovieStore = defineStore('genreMovie', () => {
  const genres = ref<Genre[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchGenres = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await useTmdbAPI<ResponseGenres>('genre/movie/list')
      genres.value = data.genres
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { genres, loading, error, fetchGenres }
})
