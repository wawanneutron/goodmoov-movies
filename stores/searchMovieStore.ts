import type { Movie, Response } from '~/types/movie'

export const useSearchMovieStore = defineStore('searchMovie', () => {
  const searchMovie = ref<Movie[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchSearchMovie = async (search: string) => {
    loading.value = true

    try {
      const res = await useTmdbAPI<Response<Movie>>(
        `search/movie?query=${search}`
      )

      searchMovie.value = res.results
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching search: ', err.message)
    } finally {
      loading.value = false
    }
  }

  return { fetchSearchMovie, searchMovie, loading, error }
})
