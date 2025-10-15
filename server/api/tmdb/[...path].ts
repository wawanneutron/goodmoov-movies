export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const BASE_URL = config.public.BASE_API
  const API_TOKEN = config.API_TOKEN

  const path = event.context.params?.path || []
  const query = getQuery(event)

  const url = `${BASE_URL}/${path}`

  try {
    const res = await $fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: 'application/json'
      },
      query
    })

    return res
  } catch (err: any) {
    throw createError({
      statusCode: err?.response?.status || 500,
      message: err?.message || 'Failed to fetch from TMDB'
    })
  }
})
