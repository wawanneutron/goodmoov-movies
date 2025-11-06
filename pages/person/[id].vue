<template>
  <section class="mt-8">
    <div class="flex justify-between items-center py-6">
      <BackButton />
      <SectionTitle width-line="8" title="Person" />
    </div>

    <MovieDetailCast
      v-if="cast"
      :cast="cast"
      :movies="movies"
      :loadingDetail="loadingDetail"
      :loadingMovie="loadingMovie"
    />
  </section>
</template>

<script lang="ts" setup>
import BackButton from '~/components/ui/BackButton.vue'

const detailCastStore = useDetailCastStore()
const movieByCastStore = useMovieByCastStore()

const { fetchCastDetail } = detailCastStore
const { fetchMovieByCast } = movieByCastStore

const { cast, loading: loadingDetail } = storeToRefs(detailCastStore)
const { movies, loading: loadingMovie } = storeToRefs(movieByCastStore)

const route = useRoute()
const castId = route.params.id as string

onMounted(async () => {
  await fetchCastDetail(castId)
  await fetchMovieByCast(castId)
})
</script>

<style></style>
