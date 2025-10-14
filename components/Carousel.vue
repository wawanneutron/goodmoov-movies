<template>
  <CarouselSkeleton v-if="loading" />

  <div v-else class="relative overflow-hidden rounded-xl md:rounded-2xl mt-8">
    <div
      ref="carouselRef"
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in sliderMovies"
        :key="index"
        class="w-full shrink-0"
      >
        <img
          :src="getImageUrl(slide.backdrop_path, 'w1280')"
          :alt="slide.title"
          :title="slide.title"
          class="w-full h-56 md:h-96 object-cover object-top rounded-xl md:rounded-2xl"
        />
      </div>
    </div>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
      <button
        v-for="(slide, index) in sliderMovies"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all cursor-pointer"
        :class="
          index === currentIndex
            ? 'bg-[var(--theme-secondary-light)] w-6'
            : 'bg-gray-400'
        "
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CarouselSkeleton from './CarouselSkeleton.vue'

const trandingStore = useTrandingMovieStore()
const { fetchTrandingMovies } = trandingStore
const { trandingMovies, loading, error } = storeToRefs(trandingStore)

const sliderMovies = computed(() => trandingMovies.value.slice(0, 8))

const currentIndex = ref(0)
const timer = ref<ReturnType<typeof setInterval> | null>(null)
const autoInterval = 3000

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % sliderMovies.value.length
}

function goToSlide(index: number) {
  currentIndex.value = index
  restartAutoSlide()
}

function startAutoSlide() {
  timer.value = setInterval(nextSlide, autoInterval)
}

function restartAutoSlide() {
  if (timer.value) clearInterval(timer.value)
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
  fetchTrandingMovies()
})

onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value)
})
</script>

<style scoped>
button.w-6 {
  transition: all 0.3s ease;
}
</style>
