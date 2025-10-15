export const useTmdbAPI = async <T>(
  path: string,
  options: {
    query?: Record<string, any>
  } = {}
): Promise<T> => {
  try {
    const res = await $fetch<T>(`/api/tmdb/${path}`, {
      query: options.query
    })
    return res
  } catch (err: any) {
    console.error(`TMDB Fetch Error - ${path}: `, err)
    throw new Error(err?.message || 'Failed to fetch data from TMDB')
  }
}
