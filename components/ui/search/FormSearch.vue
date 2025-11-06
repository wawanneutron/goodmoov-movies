<template>
  <form
    class="relative flex items-center w-full"
    @submit.prevent="$emit('search-movie')"
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
      @input="$emit('search-movie')"
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
</template>

<script lang="ts" setup>
const searchQuery = defineModel<string>()

defineEmits<{
  (e: 'search-movie'): void
}>()
</script>

<style></style>
