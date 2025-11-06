<template>
  <Modal ref="modalRef" title="Cast Detail">
    <template #body>
      <MovieDetailCast v-if="cast" :cast="cast" :loadingDetail="loading" />
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from '~/components/Modal.vue'

const detailCastStore = useDetailCastStore()
const { fetchCastDetail } = detailCastStore
const { cast, loading, error } = storeToRefs(detailCastStore)

const modalRef = ref<InstanceType<typeof Modal> | null>(null)

const openModal = async (castId: number) => {
  modalRef.value?.setModal(true)

  if (!castId) return
  await fetchCastDetail(castId)
}

defineExpose({
  openModal
})
</script>

<style></style>
