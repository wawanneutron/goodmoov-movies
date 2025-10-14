<template>
  <section class="relative">
    <div
      ref="scrollContainer"
      class="overflow-x-auto no-scrollbar scroll-smooth"
    >
      <button
        v-if="showLeft"
        @click="scrollLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--theme-transparent)] text-[var(--theme-text)] p-2 w-8 h-8 rounded-full shadow-md hover:opacity-80 transition-opacity"
      >
        <Icon name="ph:arrow-left-bold" size="16" />
      </button>

      <div class="flex gap-3 pr-3 w-max">
        <slot />
      </div>

      <button
        v-if="showRight"
        @click="scrollRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--theme-transparent)] text-[var(--theme-text)] p-2 w-8 h-8 rounded-full shadow-md hover:opacity-80 transition-opacity"
      >
        <Icon name="ph:arrow-right-bold" size="16" />
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
const scrollContainer = ref<HTMLDivElement | null>(null)
const showLeft = ref(false)
const showRight = ref(true)

function scrollLeft() {
  scrollContainer.value?.scrollBy({ left: -300, behavior: 'smooth' })

  nextTick()
  handleScroll()
}
function scrollRight() {
  scrollContainer.value?.scrollBy({ left: 300, behavior: 'smooth' })

  nextTick()
  handleScroll()
}

function handleScroll() {
  const el = scrollContainer.value
  if (!el) return

  const maxScroll = el.scrollWidth - el.clientWidth
  showLeft.value = el.scrollLeft > 10
  showRight.value = el.scrollLeft < maxScroll - 10

  console.log(showLeft.value, showRight.value)
}

defineExpose({
  handleScroll
})
</script>

<style></style>
