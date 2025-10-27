<template>
  <div class="flex justify-center mt-4 mb-8">
    <button
      v-if="hasMore && !loading"
      @click="loadMore"
      class="px-6 py-2 bg-[var(--theme-secondary)] text-[var(--theme-text)] rounded-full shadow hover:opacity-80 transition cursor-pointer"
    >
      Load More
    </button>

    <p v-else-if="!hasMore" class="text-[var(--theme-text)] opacity-70">
      No more movies
    </p>

    <p v-if="loading" class="text-[var(--theme-text)] animate-pulse">
      Loading...
    </p>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'on:load-more'): void
}>()

defineProps<{
  hasMore: boolean
  loading: boolean
}>()

const loadMore = () => emit('on:load-more')
</script>

<style></style>
