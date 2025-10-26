<template>
  <Modal ref="modalRef" title="Cast Detail">
    <template #body>
      <MovieDetailCastSkeleton v-if="loading" />
      <div
        v-if="!loading && cast"
        class="text-[var(--theme-text)] pt-4 pb-8 space-y-8"
      >
        <div class="flex flex-col sm:flex-row gap-6 items-start">
          <div class="max-w-48">
            <NuxtImg
              :src="getImageUrl(cast?.profile_path)"
              :alt="cast?.name"
              :title="cast?.name"
              class="max-w-48 rounded-lg shadow-md object-cover flex-shrink-0"
              :custom="true"
              v-slot="{ src, isLoaded, imgAttrs }"
            >
              <img
                v-if="isLoaded"
                v-bind="imgAttrs"
                :src="src"
                class="rounded-lg"
              />
              <img
                v-else
                src="/image-loading.svg"
                alt="placeholder"
                class="rounded-lg"
              />
            </NuxtImg>
          </div>

          <div class="flex flex-col space-y-2">
            <h2 class="text-2xl font-semibold">{{ cast.name }}</h2>
            <p>
              <span class="font-medium opacity-70">Also known as:</span>
              {{ alsoKnownAs }}
            </p>
            <p>
              <span class="font-medium opacity-70">Place of birth:</span>
              {{ cast.place_of_birth ?? 'N/A' }}
            </p>
            <p>
              <span class="font-medium opacity-70">Birthday:</span>
              {{ cast.birthday ?? 'N/A' }}
            </p>
            <p>
              <span class="font-medium opacity-70">Gender:</span>
              {{
                cast.gender === 1
                  ? 'Female'
                  : cast.gender === 2
                  ? 'Male'
                  : 'N/A'
              }}
            </p>
            <p>
              <span class="font-medium opacity-70">Known For:</span>
              {{ cast.known_for_department }}
            </p>
            <p>
              <span class="font-medium opacity-70">Website:</span>
              <span v-if="cast.homepage">
                <a
                  :href="cast.homepage"
                  target="_blank"
                  class="text-blue-500 hover:underline ml-1"
                  >{{ cast.homepage }}</a
                >
              </span>
              <span v-else>N/A</span>
            </p>
          </div>
        </div>

        <div>
          <h3
            class="text-xl font-semibold mb-2 border-b border-gray-500 pb-1 mb-2"
          >
            Biography
          </h3>
          <p class="opacity-80 leading-relaxed">
            {{ cast?.biography || 'No biography available.' }}
          </p>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from '~/components/Modal.vue'

const detailCastStore = useDetailCastStore()
const { fetchCastDetail } = detailCastStore
const { cast, loading, error } = storeToRefs(detailCastStore)

const alsoKnownAs = computed(
  () => cast.value?.also_known_as.join(', ') || 'N/A'
)

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
