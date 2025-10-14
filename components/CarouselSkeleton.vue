<template>
  <div class="relative overflow-hidden rounded-2xl mt-8">
    <div class="flex animate-pulse">
      <div
        class="min-w-full flex-shrink-0 bg-gray-700/40 h-56 md:h-96 rounded-2xl"
      ></div>
    </div>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
      <div
        v-for="n in 4"
        :key="n"
        class="w-3 h-3 rounded-full bg-gray-500/60"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
