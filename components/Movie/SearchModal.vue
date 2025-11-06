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
        <FormSearch v-model="searchQuery" @search-movie="debounceSearch" />

        <MovieGenreCardList @on:select-genre="onCloseModal" />

        <FilterPill
          v-if="totalMovies || totalPeople"
          :totalMovies="totalMovies"
          :totalPeople="totalPeople"
          :activeFilter="activeFilter"
          @update:activeFilter="onFilter"
        />

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-y-6 pb-2 overflow-x-auto"
        >
          <template v-if="activeFilter === 'movie'">
            <MovieCardSkeleton v-if="loading" v-for="n in 8" :key="n" />
            <MovieCard
              v-else
              v-for="movie in searchMovie"
              :key="movie.id"
              :item="movie"
              width-card="w-36 md:w-44"
              @on:select-item="onCloseModal"
            />
          </template>

          <template v-if="activeFilter === 'person'">
            <MovieCard
              v-for="person in searchPerson"
              :key="person.id"
              :item="person"
              width-card="w-36 md:w-44"
              :is-people="true"
              @on:select-item="onCloseModal"
            />
          </template>
        </div>
      </div>
    </template>

    <template #footer>
      <MovieLoadMore
        v-if="
          (totalMovies && activeFilter === 'movie') ||
          (totalPeople && activeFilter === 'person')
        "
        :moreMovies="hasMoreMovies"
        :morePeople="hasMorePeople"
        :loading="loading"
        :activeFilter="activeFilter"
        :emptyMessage="
          activeFilter === 'movie' ? 'No More Movies' : 'No More Casts'
        "
        @on:load-more="loadMore"
      />

      <p
        v-else
        class="text-[var(--theme-text)] bg-[var(--theme-primary)] opacity-50 font-light rounded text-center py-6 mb-6"
      >
        Results not found
      </p>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type Modal from '@/components/Modal.vue'
import debounce from 'lodash.debounce'
import type { MediaType } from '~/types/movie'
import FilterPill from '../ui/search/FilterPill.vue'
import FormSearch from '../ui/search/FormSearch.vue'

const searchStore = useSearchStore()
const {
  fetchSearchMovie,
  fetchSearchPerson,
  loadMoreMovies,
  loadMorePersons,
  resetState
} = searchStore
const {
  searchMovie,
  searchPerson,
  totalMovies,
  totalPeople,
  searchQuery,
  hasMoreMovies,
  hasMorePeople,
  loading,
  error
} = storeToRefs(searchStore)

const modalRef = ref<InstanceType<typeof Modal> | null>(null)
const activeFilter = ref<MediaType>('movie')

const debounceSearch = debounce(async () => {
  if (!searchQuery.value.trim()) return

  await fetchSearchMovie(searchQuery.value.trim())
  await fetchSearchPerson(searchQuery.value.trim())
}, 500)

const loadMore = () => {
  switch (activeFilter.value) {
    case 'movie':
      loadMoreMovies(searchQuery.value)
      break
    case 'person':
      loadMorePersons(searchQuery.value)

    default:
      break
  }
}

const onFilter = (item: MediaType) => {
  activeFilter.value = item
}

const onCloseModal = () => modalRef.value?.setModal(false)

const onOpenSearchModal = () => {
  modalRef.value?.setModal(true)
  resetState()
}

watch(searchQuery, (newQuery) => {
  if (!newQuery.trim()) {
    resetState()
  }
})
</script>
