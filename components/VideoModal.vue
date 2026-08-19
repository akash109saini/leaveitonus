<template>
  <dialog 
    ref="dialogRef"
    class="fixed inset-0 z-50 p-4 sm:p-6 md:p-10 bg-transparent max-w-5xl w-full backdrop:bg-black/85 backdrop:backdrop-blur-md border-0 rounded-2xl outline-none"
    @click="handleBackdropClick"
    @cancel="closeModal"
  >
    <div v-if="state.isOpen" class="bg-brand-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-brand-dark/90">
        <div>
          <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 uppercase tracking-wider">
            {{ state.category || 'Campaign Reel' }}
          </span>
          <h3 class="text-lg font-bold text-white mt-1">{{ state.title }}</h3>
          <p v-if="state.client" class="text-xs text-brand-textMuted">Client: <span class="text-white font-medium">{{ state.client }}</span></p>
        </div>
        <button 
          @click="closeModal" 
          class="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-yellow hover:text-black text-white flex items-center justify-center transition-all duration-200 border border-white/10"
          aria-label="Close modal"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Video Player Area -->
      <div class="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        <!-- Dynamic video frame -->
        <video 
          v-if="state.videoUrl"
          :src="state.videoUrl" 
          controls 
          autoplay 
          class="w-full h-full object-cover"
        ></video>
        <!-- Fallback styled video loop showcase -->
        <div v-else class="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-brand-surface via-brand-dark to-black">
          <div class="absolute inset-0 opacity-30 bg-[radial-gradient(#FFE300_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div class="text-center p-8 z-10">
            <div class="w-20 h-20 rounded-full bg-brand-yellow/20 border border-brand-yellow flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Play class="w-8 h-8 text-brand-yellow fill-brand-yellow ml-1" />
            </div>
            <h4 class="text-2xl font-bold text-white mb-2">{{ state.title }}</h4>
            <p class="text-sm text-brand-textMuted max-w-md mx-auto">High-converting creator-led video asset engineered for scale and viral reach. Leave it on us.</p>
            <div v-if="state.metrics" class="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-yellow text-xs font-bold">
              {{ state.metrics }}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div v-if="state.metrics" class="p-4 bg-brand-dark flex items-center justify-between border-t border-white/10">
        <div class="flex items-center gap-2 text-xs text-brand-textMuted">
          <span class="w-2 h-2 rounded-full bg-brand-yellow"></span> Verified Campaign Metric
        </div>
        <span class="text-xs font-bold text-brand-yellow bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/20">
          {{ state.metrics }}
        </span>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Play } from 'lucide-vue-next'
import { useVideoModal } from '~/composables/useVideoModal'

const { state, closeModal } = useVideoModal()
const dialogRef = ref<HTMLDialogElement | null>(null)

watch(() => state.value.isOpen, (isOpen) => {
  if (process.client && dialogRef.value) {
    if (isOpen) {
      if (!dialogRef.value.open) {
        dialogRef.value.showModal()
      }
    } else {
      if (dialogRef.value.open) {
        dialogRef.value.close()
      }
    }
  }
})

// Light dismiss fallback script for cross-browser safety
const handleBackdropClick = (event: MouseEvent) => {
  if (!dialogRef.value) return
  if (event.target === dialogRef.value) {
    const rect = dialogRef.value.getBoundingClientRect()
    const isInside = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    )
    if (!isInside) {
      closeModal()
    }
  }
}
</script>
