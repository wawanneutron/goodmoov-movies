<template>
  <button
    class="flex items-center justify-center bg-[var(--theme-primary)] text-[var(--theme-text)] w-12 h-12 rounded-full shadow-md hover:opacity-80 transition-opacity cursor-pointer"
    @click="$router.back()"
  >
    <Icon name="ph:arrow-left-bold" size="24" />
  </button>
</template>

<script lang="ts" setup></script>

<style></style>
