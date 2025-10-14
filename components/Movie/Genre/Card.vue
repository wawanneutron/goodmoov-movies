<template>
  <div
    class="flex items-end justify-end rounded bg-[var(--theme-secondary)] cursor-pointer w-36 h-20 p-2"
    @click="$emit('selectGenre', genre)"
  >
    <span class="text-[var(--theme-text)]">{{ genre.name }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { Genre } from '@/types/movie'

defineProps<{ genre: Genre }>()

defineEmits<{
  (e: 'selectGenre', genre: Genre): void
}>()
</script>

<style></style>
