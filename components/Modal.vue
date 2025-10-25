<template>
  <div
    v-if="isOpenModal"
    className="px-4 fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
  >
    <div
      :className="`bg-[var(--theme-background)] text-[var(--theme-text)] rounded-lg shadow-lg w-full px-4 py-6 relative max-h-[70vh] sm:max-h-[90vh] overflow-y-auto ${maxWidth}`"
    >
      <div class="flex items-center justify-between">
        <button
          class="w-8 h-8 bg-[var(--theme-primary)] text-[var(--theme-text)] shadow-md rounded-full flex items-center justify-center absolute text-2xl top-6 right-6 hover:bg-[var(--theme-secondary)]"
          @click="setModal(false)"
        >
          <Icon name="heroicons:x-mark" size="20" />
        </button>

        <SectionTitle :title="title" :width-line="widthLine" />
      </div>

      <div className="pt-8">
        <slot name="body" />
      </div>

      <div>
        <slot name="footer" />
      </div>
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
