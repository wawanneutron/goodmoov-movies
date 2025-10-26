<template>
  <div class="space-y-8 animate-pulse">
    <div class="flex flex-col sm:flex-row gap-6 items-start">
      <div
        class="max-w-48 w-48 h-64 rounded-lg bg-[var(--theme-skeleton-bg)] overflow-hidden relative"
      >
        <div class="w-full h-full bg-gray-700/40"></div>
        <div
          class="absolute bottom-0 right-0 bg-gray-600/50 rounded text-transparent text-sm p-2"
        ></div>
      </div>

      <div class="flex flex-col space-y-3 w-full">
        <div class="h-6 bg-gray-600/50 rounded w-1/2"></div>
        <div class="h-4 bg-gray-700/40 rounded w-2/3"></div>
        <div class="h-4 bg-gray-600/50 rounded w-1/3"></div>
        <div class="h-4 bg-gray-700/40 rounded w-1/4"></div>
        <div class="h-4 bg-gray-600/50 rounded w-1/3"></div>
        <div class="h-4 bg-gray-700/40 rounded w-1/2"></div>
      </div>
    </div>

    <div>
      <div class="h-5 bg-gray-600/50 rounded w-1/4 mb-2"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-700/40 rounded w-full"></div>
        <div class="h-4 bg-gray-700/40 rounded w-5/6"></div>
        <div class="h-4 bg-gray-700/40 rounded w-4/6"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
