<template>
  <div
    v-if="isOpenModal"
    className="px-4 fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
  >
    <div
      :className="`bg-[var(--theme-background)] text-[var(--theme-text)] rounded-lg shadow-lg w-full px-4 relative max-h-[70vh] sm:max-h-[90vh] overflow-y-auto no-scrollbar ${maxWidth}`"
    >
      <div
        class="sticky top-0 py-4 bg-[var(--theme-background)] flex items-center justify-between z-20"
      >
        <button
          class="w-8 h-8 bg-[var(--theme-primary)] text-[var(--theme-text)] shadow-md rounded-full flex items-center justify-center absolute text-2xl top-4 right-2 hover:bg-[var(--theme-secondary)]"
          @click="setModal(false)"
        >
          <Icon name="heroicons:x-mark" size="20" />
        </button>

        <SectionTitle :title="title" :width-line="widthLine" />
      </div>

      <slot name="body" />

      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SectionTitle from './SectionTitle.vue'

withDefaults(
  defineProps<{
    maxWidth?: string
    widthLine?: string
    title: string
  }>(),
  {
    maxWidth: 'max-w-3xl',
    widthLine: 'w-16',
    title: 'Modal Titile'
  }
)

const isOpenModal = ref<boolean>(false)

const setModal = (_open: boolean) => {
  isOpenModal.value = _open
}

defineExpose({
  setModal
})
</script>

<style></style>
