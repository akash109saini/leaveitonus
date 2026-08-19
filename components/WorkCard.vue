<template>
  <div 
    class="glass-card rounded-3xl overflow-hidden group cursor-pointer border border-white/10 flex flex-col justify-between h-full hover:border-brand-yellow/50 transition-all duration-300"
    @click="handleCardClick"
  >
    <!-- Card Media Header (Video/Image preview) -->
    <div class="relative aspect-video w-full overflow-hidden bg-brand-surface">
      <img 
        :src="item.image" 
        :alt="item.title" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
      />

      <!-- Dark Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80"></div>

      <!-- Category Pill Badge -->
      <div class="absolute top-4 left-4 z-10">
        <span class="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-brand-yellow border border-white/10">
          {{ item.category }}
        </span>
      </div>

      <!-- Campaign Highlight Metric Pill (Clean text without unnecessary card icons) -->
      <div v-if="item.metric" class="absolute top-4 right-4 z-10">
        <span class="text-[10px] font-extrabold px-3 py-1 rounded-full bg-brand-yellow text-black shadow-lg">
          {{ item.metric }}
        </span>
      </div>

      <!-- Play Button Overlay Indicator -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
        <div class="w-14 h-14 rounded-full bg-brand-yellow text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,227,0,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Play class="w-6 h-6 fill-black ml-1" />
        </div>
      </div>
    </div>

    <!-- Card Content Body -->
    <div class="p-6 flex flex-col justify-between flex-grow">
      <div>
        <div class="text-xs text-brand-textMuted font-medium mb-1">
          Client: <span class="text-white font-semibold">{{ item.client }}</span>
        </div>
        <h3 class="font-display font-bold text-xl text-white group-hover:text-brand-yellow transition-colors duration-200 line-clamp-2">
          {{ item.title }}
        </h3>
        <p class="text-xs text-brand-textSec mt-2 line-clamp-2 leading-relaxed">
          {{ item.description }}
        </p>
      </div>

      <!-- Footer Action -->
      <div class="pt-5 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
        <span class="text-brand-textMuted font-medium group-hover:text-white transition-colors">
          Watch Case Study
        </span>
        <div class="w-8 h-8 rounded-full bg-white/5 group-hover:bg-brand-yellow group-hover:text-black text-white flex items-center justify-center transition-all duration-300">
          <ArrowUpRight class="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Play, ArrowUpRight } from 'lucide-vue-next'
import { useVideoModal } from '~/composables/useVideoModal'

interface WorkItem {
  id: string | number
  title: string
  client: string
  category: string
  description: string
  metric?: string
  image: string
  videoUrl?: string
}

const props = defineProps<{
  item: WorkItem
}>()

const { openModal } = useVideoModal()

const handleCardClick = () => {
  openModal({
    videoUrl: props.item.videoUrl || '',
    title: props.item.title,
    client: props.item.client,
    category: props.item.category,
    metrics: props.item.metric
  })
}
</script>
