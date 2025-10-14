<template>
  <div class="inline-block">
    <div class="border-t-3 border-[var(--theme-secondary-light)]"></div>
    <h2 class="text-[var(--theme-text)] text-xl font-bold">
      {{ title }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<style></style>
