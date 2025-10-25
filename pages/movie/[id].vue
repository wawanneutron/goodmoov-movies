<template>
  <MovieDetailSkeleton v-if="loading" />

  <section v-else-if="movieDetail" class="mt-8 space-y-6">
    <button
      class="flex items-center justify-center bg-[var(--theme-primary)] text-[var(--theme-text)] w-12 h-12 rounded-full shadow-md hover:opacity-80 transition-opacity cursor-pointer"
      @click="$router.back()"
    >
      <Icon name="ph:arrow-left-bold" size="24" />
    </button>

    <div class="flex gap-4 text-[var(--theme-text)]">
      <div class="w-48">
        <NuxtImg
          :src="getImageUrl(movieDetail?.poster_path)"
          :alt="movieDetail?.title"
          :title="movieDetail?.title"
          class="w-48 rounded mb-4"
          :custom="true"
          v-slot="{ src, isLoaded, imgAttrs }"
        >
          <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

          <img v-else src="/image-loading.svg" alt="placeholder" />
        </NuxtImg>
      </div>

      <div class="space-y-2">
        <p class="text-xl">{{ getYear(movieDetail.release_date) }}</p>
        <h1 class="text-3xl font-semibold">{{ movieDetail.title }}</h1>

        <p class="text-lg">{{ genreList }}</p>
        <p class="text-xs">{{ formatRuntime(movieDetail.runtime) }}</p>
      </div>
    </div>

    <div>
      <SectionTitle width-line="w-14" title="Overview" />
      <p class="mt-2 text-[var(--theme-text)]">{{ movieDetail.overview }}</p>
    </div>

    <div>
      <SectionTitle width-line="w-8" title="Casts" />
      <ScrollContainer>
        <div class="flex space-x-4 overflow-x-auto py-4">
          <div
            v-for="cast in movieDetail.credits?.cast"
            :key="cast.id"
            class="w-24 flex-shrink-0"
          >
            <NuxtImg
              :src="getImageUrl(cast.profile_path)"
              :alt="cast.name"
              :title="cast.name"
              class="w-24 h-32 object-cover rounded mb-2"
              :custom="true"
              v-slot="{ src, isLoaded, imgAttrs }"
            >
              <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

              <img v-else src="/image-loading.svg" alt="placeholder" />
            </NuxtImg>
            <p class="text-[var(--theme-text)] text-sm font-semibold truncate">
              {{ cast.name }}
            </p>
            <p class="text-[var(--theme-text)] text-xs opacity-70 truncate">
              {{ cast.character }}
            </p>
          </div>
        </div>
      </ScrollContainer>
    </div>

    <div>
      <SectionTitle width-line="w-20" title="Recommended" />
      <ScrollContainer>
        <div class="flex space-x-4 overflow-x-auto py-4">
          <MovieCard
            v-for="movie in movieDetail.recommendations.results"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </ScrollContainer>
    </div>
  </section>
</template>

<script lang="ts" setup>
import ScrollContainer from '~/components/ScrollContainer.vue'
import SectionTitle from '~/components/SectionTitle.vue'

const movieDetailStore = useMovieDetailStore()
const { fetchMovieDetail } = movieDetailStore
const { movieDetail, loading, error } = storeToRefs(movieDetailStore)

const route = useRoute()
const movieId = route.params.id as string

const genreList = computed(() =>
  movieDetail.value?.genres.map((g: any) => g.name).join(', ')
)

onMounted(() => {
  console.log('movieId:', movieId)
  if (!movieDetail) return
  fetchMovieDetail(movieId)
})
</script>

<style></style>
