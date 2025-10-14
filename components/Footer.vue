<template>
  <footer
    class="bg-[var(--theme-primary)] max-w-5xl mx-auto w-full py-4 px-4 mt-12"
  >
    <div class="flex justify-end mb-10">
      <Logo />
    </div>
    <div class="flex justify-between text-[var(--theme-text)]">
      <div class="flex flex-col justify-end text-xs">
        <p>© 2025 goodmoov</p>
        <p>All right reserved</p>
      </div>
      <ul class="space-y-3 text-right">
        <li>
          <a href="#">Privacy Policy</a>
        </li>
        <li>
          <a href="#">Legal Information</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
</script>

<style></style>
