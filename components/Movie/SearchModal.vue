<template>
  <button
    class="w-8 h-8 flex items-center justify-center rounded-full text-[var(--theme-text)] bg-[var(--theme-secondary)]"
    title="Search movies"
    @click="onOpenSearchModal"
  >
    <Icon name="mdi:magnify" size="20" class="text-[var(--theme-text)]" />
  </button>

  <Modal
    ref="modalRef"
    max-width="max-w-4xl"
    title="Search Movie"
    @close="onCloseModal"
  >
    <template #body>
      <div class="space-y-6 px-2 py-4">
        <form
          class="relative flex items-center w-full"
          @submit.prevent="debounceSearch"
        >
          <Icon
            name="heroicons:magnifying-glass"
            class="absolute left-5 text-[var(--theme-secondary-light)] opacity-70"
            size="22"
          />

          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search movies..."
            class="py-4 pl-12 pr-14 w-full bg-[var(--theme-primary)] text-[var(--theme-text)] rounded-full placeholder:text-[var(--theme-text)] focus:outline-none focus:ring-2 focus:ring-[var(--theme-secondary)] transition-all duration-200"
            @input="debounceSearch"
          />

          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-5 text-[var(--theme-secondary-light)] hover:text-[var(--theme-text)]"
            @click="searchQuery = ''"
          >
            <Icon name="heroicons:x-mark" size="22" />
          </button>
        </form>

        <MovieGenreCardList @on:select-genre="onCloseModal" />

        <div
          class="grid gap-2 sm:gap-0 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 overflow-x-auto"
        >
          <MovieCardSkeleton v-if="loading" v-for="n in 8" :key="n" />
          <MovieCard
            v-else
            v-for="movie in searchMovie"
            :key="movie.id"
            :movie="movie"
            width-card="w-36"
            @on:select-movie="onCloseModal"
          />
        </div>

        <p
          v-if="!searchMovie.length"
          class="text-[var(--theme-text)] text-center py-8"
        >
          No movies found.
        </p>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type Modal from '@/components/Modal.vue'
import debounce from 'lodash.debounce'

const searchMovieStore = useSearchMovieStore()
const { fetchSearchMovie } = searchMovieStore
const { searchMovie, loading, error } = storeToRefs(searchMovieStore)

const modalRef = ref<InstanceType<typeof Modal> | null>(null)
const searchQuery = ref('')

const debounceSearch = debounce(async () => {
  if (!searchQuery.value.trim()) return

  await fetchSearchMovie(searchQuery.value.trim())
}, 500)

const onCloseModal = () => modalRef.value?.setModal(false)

const onOpenSearchModal = () => {
  modalRef.value?.setModal(true)
  searchMovie.value = []
  searchQuery.value = ''
}

watch(searchQuery, (newQuery) => {
  if (!newQuery.trim()) {
    searchMovie.value = []
  }
})
</script>
