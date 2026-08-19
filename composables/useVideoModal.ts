import { ref } from 'vue'

interface VideoModalState {
  isOpen: boolean
  videoUrl: string
  title: string
  client: string
  category: string
  metrics?: string
}

const state = ref<VideoModalState>({
  isOpen: false,
  videoUrl: '',
  title: '',
  client: '',
  category: '',
  metrics: ''
})

export const useVideoModal = () => {
  const openModal = (data: Omit<VideoModalState, 'isOpen'>) => {
    state.value = {
      ...data,
      isOpen: true
    }
  }

  const closeModal = () => {
    state.value.isOpen = false
  }

  return {
    state,
    openModal,
    closeModal
  }
}
