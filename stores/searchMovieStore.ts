import type { Movie, Response } from '~/types/movie'

export const useSearchMovieStore = defineStore('searchMovie', () => {
  const searchMovie = ref<Movie[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const currentPage = ref<number>(1)
  const hasMore = ref<boolean>(true)

  const fetchSearchMovie = async (search: string, page: number = 1) => {
    loading.value = true

    try {
      const res = await useTmdbAPI<Response<Movie>>('search/movie', {
        query: { query: search, page }
      })

      if (page === 1) searchMovie.value = res.results
      else searchMovie.value.push(...res.results)

      hasMore.value = page < res.total_pages
      currentPage.value = page
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching search: ', err.message)
    } finally {
      loading.value = false
    }
  }

  const loadMoreMovies = async (search: string) => {
    await fetchSearchMovie(search, currentPage.value + 1)
  }

  return {
    fetchSearchMovie,
    loadMoreMovies,
    searchMovie,
    hasMore,
    loading,
    error
  }
})
