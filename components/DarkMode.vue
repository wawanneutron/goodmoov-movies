<template>
  <div>
    <button
      @click="toggleTheme"
      class="p-2 bg-[var(--theme-primary)] text-[var(--theme-text)] rounded cursor-pointer"
      :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <Icon
        :name="isDark ? 'ph:sun-duotone' : 'ph:moon-duotone'"
        size="24"
        class="text-[var(--theme-text)]"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
const isDark = ref<boolean>(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
    isDark.value = true
  }
})

function toggleTheme() {
  const html = document.documentElement
  const isTogleDark = html.classList.toggle('dark')
  localStorage.setItem('theme', isTogleDark ? 'dark' : 'light')
  isDark.value = !!isTogleDark
}
</script>

<style></style>
