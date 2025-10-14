<template>
  <section class="mt-8 animate-pulse space-y-6">
    <div
      class="flex items-center justify-center bg-gray-700/40 w-12 h-12 rounded-full"
    ></div>

    <div class="flex gap-4">
      <div class="w-48 h-72 bg-gray-700/40 rounded"></div>

      <div class="flex-1 space-y-3">
        <div class="w-24 h-5 bg-gray-600/50 rounded"></div>
        <div class="w-3/4 h-7 bg-gray-600/50 rounded"></div>
        <div class="w-1/2 h-5 bg-gray-600/50 rounded"></div>
        <div class="w-20 h-4 bg-gray-600/40 rounded"></div>
      </div>
    </div>

    <div>
      <div class="w-24 h-5 bg-gray-600/50 rounded mb-3"></div>
      <div class="space-y-2">
        <div
          v-for="i in 4"
          :key="i"
          class="w-full h-4 bg-gray-700/40 rounded"
        ></div>
      </div>
    </div>

    <div>
      <div class="w-20 h-5 bg-gray-600/50 rounded mb-3"></div>
      <div class="flex space-x-4 overflow-x-auto no-scrollbar py-4">
        <div v-for="i in 6" :key="i" class="w-24 shrink-0 space-y-2">
          <div class="w-24 h-32 bg-gray-700/40 rounded"></div>
          <div class="w-20 h-3 bg-gray-600/50 rounded"></div>
          <div class="w-16 h-3 bg-gray-600/40 rounded"></div>
        </div>
      </div>
    </div>

    <div>
      <div class="w-28 h-5 bg-gray-600/50 rounded mb-3"></div>
      <div class="flex space-x-4 overflow-x-auto no-scrollbar py-4">
        <div v-for="i in 6" :key="i" class="w-44 shrink-0 space-y-2">
          <div class="w-44 h-64 bg-gray-700/40 rounded"></div>
          <div class="w-3/4 h-4 bg-gray-600/50 rounded"></div>
          <div class="w-1/3 h-3 bg-gray-600/40 rounded"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style></style>
