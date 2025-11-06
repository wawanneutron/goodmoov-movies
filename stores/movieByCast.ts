import type { Movie, ResponseMovieCast } from '~/types/movie'

export const useMovieByCastStore = defineStore('movieByCast', () => {
  const movies = ref<Movie[]>([])
  const loading = ref<boolean>(false)
  const error = ref(<string | null>null)

  const fetchMovieByCast = async (castId: string) => {
    try {
      loading.value = true
      const res = await useTmdbAPI<ResponseMovieCast>(
        `/person/${castId}/combined_credits`
      )
      movies.value = res.cast.filter((item) => item.media_type === 'movie')
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return { fetchMovieByCast, movies, loading, error }
})
