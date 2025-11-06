import type { CastDetail } from '~/types/movie'

export const useDetailCastStore = defineStore('detailCast', () => {
  const cast = ref<CastDetail>()
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchCastDetail = async (castId: number) => {
    loading.value = true

    try {
      const res = await useTmdbAPI<CastDetail>(`person/${castId}`)
      cast.value = res
    } catch (error: any) {
      error.value = error.message
      console.error('Error fetching cast detail: ', error.message)
    } finally {
      loading.value = false
    }
  }

  return { fetchCastDetail, cast, loading, error }
})
