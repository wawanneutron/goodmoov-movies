<template>
  <div class="flex flex-col min-h-screen bg-[var(--theme-background)]">
    <div class="fixed top-0 left-0 w-full bg-[var(--theme-background)] z-50">
      <div class="max-w-5xl mx-auto w-full">
        <Navbar />
      </div>
    </div>

    <main class="flex-grow max-w-5xl mx-auto w-full pt-16">
      <div class="lg:px-0 px-4">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from '~/components/Footer.vue'
import Navbar from '~/components/Navbar.vue'

onMounted(() => {
  const saved = localStorage.getItem('theme')

  if (saved === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    // default dark
    document.documentElement.classList.add('dark')
  }
})
</script>

<style></style>
