import type { Movie, Person, Response } from '~/types/movie'

export const useSearchStore = defineStore('searchMovie', () => {
  const searchQuery = ref<string>('')

  const searchMovie = ref<Movie[]>([])
  const searchPerson = ref<Person[]>([])

  const totalMovies = ref<number>(0)
  const totalPeople = ref<number>(0)

  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const currentPage = ref<number>(1)
  const hasMoreMovies = ref<boolean>(true)
  const hasMorePeople = ref<boolean>(true)

  const fetchSearchMovie = async (search: string, page: number = 1) => {
    loading.value = true

    try {
      const res = await useTmdbAPI<Response<Movie>>('search/movie', {
        query: { query: search, page }
      })

      if (page === 1) searchMovie.value = res.results
      else searchMovie.value.push(...res.results)

      hasMoreMovies.value = page < res.total_pages
      currentPage.value = page
      totalMovies.value = res.total_results
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching search: ', err.message)
    } finally {
      loading.value = false
    }
  }

  const fetchSearchPerson = async (search: string, page: number = 1) => {
    loading.value = true

    try {
      const res = await useTmdbAPI<Response<Person>>('/search/person', {
        query: { query: search, page }
      })

      if (page === 1) searchPerson.value = res.results
      else searchPerson.value.push(...res.results)

      hasMorePeople.value = page < res.total_pages
      currentPage.value = page
      totalPeople.value = res.total_results
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

  const loadMorePersons = async (search: string) => {
    await fetchSearchPerson(search, currentPage.value + 1)
  }

  const resetState = () => {
    searchMovie.value = []
    searchPerson.value = []
    searchQuery.value = ''
    totalMovies.value = 0
    totalPeople.value = 0
    hasMoreMovies.value = true
    hasMorePeople.value = true
  }

  return {
    fetchSearchMovie,
    fetchSearchPerson,
    loadMorePersons,
    loadMoreMovies,
    resetState,

    searchMovie,
    searchPerson,
    totalMovies,
    totalPeople,
    searchQuery,
    hasMoreMovies,
    hasMorePeople,
    loading,
    error
  }
})
