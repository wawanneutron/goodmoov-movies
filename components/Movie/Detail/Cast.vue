<template>
  <section>
    <MovieDetailCastSkeleton v-if="loadingDetail" />
    <div
      v-if="!loadingDetail && cast"
      class="text-[var(--theme-text)] pt-4 pb-8 space-y-8"
    >
      <div class="flex flex-col sm:flex-row gap-6 items-start">
        <div class="max-w-48">
          <NuxtImg
            :src="getImageUrl(cast?.profile_path)"
            :alt="cast?.name"
            :title="cast?.name"
            class="max-w-48 rounded-lg shadow-md object-cover flex-shrink-0"
            :custom="true"
            v-slot="{ src, isLoaded, imgAttrs }"
          >
            <img
              v-if="isLoaded"
              v-bind="imgAttrs"
              :src="src"
              class="rounded-lg"
            />
            <img
              v-else
              src="/image-loading.svg"
              alt="placeholder"
              class="rounded-lg"
            />
          </NuxtImg>
        </div>

        <div class="flex flex-col space-y-2">
          <h2 class="text-2xl font-semibold">{{ cast.name }}</h2>
          <p>
            <span class="font-medium opacity-70">Also known as:</span>
            {{ alsoKnownAs }}
          </p>
          <p>
            <span class="font-medium opacity-70">Place of birth:</span>
            {{ cast.place_of_birth ?? 'N/A' }}
          </p>
          <p>
            <span class="font-medium opacity-70">Birthday:</span>
            {{ cast.birthday ?? 'N/A' }}
          </p>
          <p>
            <span class="font-medium opacity-70">Gender:</span>
            {{
              cast.gender === 1 ? 'Female' : cast.gender === 2 ? 'Male' : 'N/A'
            }}
          </p>
          <p>
            <span class="font-medium opacity-70">Known For:</span>
            {{ cast.known_for_department }}
          </p>
          <p>
            <span class="font-medium opacity-70">Website:</span>
            <span v-if="cast.homepage">
              <a
                :href="cast.homepage"
                target="_blank"
                class="text-blue-500 hover:underline ml-1"
                >{{ cast.homepage }}</a
              >
            </span>
            <span v-else>N/A</span>
          </p>
        </div>
      </div>

      <div v-if="showBiography">
        <SectionTitle title="Biography" width-line="w-14" />
        <p class="opacity-80 leading-relaxed mt-2 mb-8">
          {{ cast?.biography || 'No biography available.' }}
        </p>

        <SectionTitle title="Movie" width-line="w-8" />

        <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
          <MovieCardSkeleton v-if="loadingMovie" v-for="n in 10" :key="n" />

          <MovieCard v-for="movie in movies" :key="movie.id" :item="movie" />
        </div>
      </div>

      <div v-else class="flex justify-center">
        <NuxtLink
          :to="`/person/${cast.id}`"
          class="capitalize rounded text-sm cursor-pointer py-2 px-4 bg-[var(--theme-primary)] border border-[var(--theme-secondary)] hover:border-[var(--theme-secondary-light)] text-[var(--theme-secondary-light)]"
        >
          more detail
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SectionTitle from '~/components/SectionTitle.vue'
import type { CastDetail, Movie } from '~/types/movie'

const props = defineProps<{
  cast: CastDetail
  movies?: Movie[]
  loadingDetail?: boolean
  loadingMovie?: boolean
}>()
const route = useRoute()

const alsoKnownAs = computed(() => props.cast.also_known_as.join(', ') || 'N/A')

const showBiography = computed(() => !route.path.startsWith('/movie'))
</script>

<style></style>
