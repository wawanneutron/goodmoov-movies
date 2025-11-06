<template>
  <div class="flex gap-4">
    <div
      v-for="item in filter"
      :class="`group py-1 px-4 bg-[var(--theme-primary)] border border-[var(--theme-secondary)] hover:border-[var(--theme-secondary-light)] ${
        item === activeFilter ? 'border-[var(--theme-secondary-light)]' : ''
      } capitalize transition-colors duration-200 rounded-full shadow-lg space-x-2 cursor-pointer`"
      @click="$emit('update:activeFilter', item)"
    >
      <span
        :class="` ${
          item === activeFilter
            ? 'text-[var(--theme-secondary-light)]'
            : 'text-[var(--theme-text)]'
        } group-hover:text-[var(--theme-secondary-light)] text-sm`"
      >
        {{ item }}
      </span>
      <span
        :class="`p-0.5 px-3 rounded-full bg-[var(--theme-secondary)] ${
          item === activeFilter ? 'bg-[var(--theme-secondary-light)]' : ''
        } group-hover:bg-[var(--theme-secondary-light)] text-[var(--theme-text)] transition-colors duration-200 text-xs font-light`"
      >
        {{ totalResult(item) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MediaType } from '~/types/movie'

const props = defineProps<{
  totalMovies: number
  totalPeople: number
  activeFilter: MediaType
}>()

defineEmits<{
  (e: 'update:activeFilter', value: MediaType): void
}>()

const filter = ref<MediaType[]>(['movie', 'person'])

const totalResult = (type: MediaType) => {
  switch (type) {
    case 'movie':
      return props.totalMovies
      break

    case 'person':
      return props.totalPeople
      break

    default:
      break
  }
}
</script>

<style></style>
