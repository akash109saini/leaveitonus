<template>
  <div class="pt-32 pb-24 overflow-hidden">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
      <span class="text-xs uppercase tracking-widest text-brand-yellow font-bold px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 inline-block mb-6">
        PORTFOLIO & CAMPAIGN CASE STUDIES
      </span>
      <h1 class="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6">
        Campaigns That Shape Culture & <br class="hidden sm:inline" />
        <span class="text-gradient-yellow italic font-serif font-normal">Generate Predictable Revenue.</span>
      </h1>
      <p class="text-base sm:text-lg text-brand-textSec max-w-2xl mx-auto">
        Explore Leave It On Us's curated portfolio of creator-led original reels, high-ROAS ad funnels, TV commercials, and viral influencer activations.
      </p>
    </section>

    <!-- Interactive Category Filter Bar -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="flex flex-wrap items-center justify-center gap-3 p-2 glass-panel rounded-full max-w-3xl mx-auto border border-white/10">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="activeCategory = cat"
          class="px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 capitalize"
          :class="activeCategory === cat ? 'bg-brand-yellow text-black shadow-lg scale-105' : 'text-brand-textSec hover:text-white hover:bg-white/10'"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Filtered Case Studies Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TransitionGroup 
          enter-active-class="transition duration-500 ease-out" 
          enter-from-class="opacity-0 translate-y-6" 
          enter-to-class="opacity-100 translate-y-0"
        >
          <WorkCard 
            v-for="item in filteredProjects" 
            :key="item.id" 
            :item="item" 
          />
        </TransitionGroup>
      </div>

      <!-- No items fallback -->
      <div v-if="filteredProjects.length === 0" class="text-center py-20 glass-card rounded-3xl border border-white/10 mt-8">
        <div class="text-brand-yellow font-bold text-base mb-1">No campaigns found in this category</div>
        <p class="text-xs text-brand-textMuted">Try selecting another filter from the category bar above.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import WorkCard from '~/components/WorkCard.vue'

const activeCategory = ref('All')

const categories = [
  'All',
  'Social Media',
  'TV Commercials',
  'UGC Content',
  'Influencer Marketing'
]

const projects = [
  {
    id: 1,
    title: 'How Spotify Dominated Gen-Z Audio Culture with Short Reels',
    client: 'Spotify',
    category: 'Social Media',
    metric: '42M+ Views',
    description: 'Produced 45 vertical sketch reels showcasing playlist culture, generating 3.4M organic saves and 180k shares.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Samsung Galaxy Z Flip Viral Creator Unboxing Stunt',
    client: 'Samsung',
    category: 'Influencer Marketing',
    metric: '+480% Pre-Orders',
    description: 'Engineered a 10-creator hidden camera unboxing prank series that trended #1 on YouTube Shorts.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Gymshark High-Performance UGC Ad Funnel Strategy',
    client: 'Gymshark',
    category: 'UGC Content',
    metric: '4.8x ROAS',
    description: 'Tested 120+ video hook variations across TikTok & Meta Ads, scaling monthly ad spend by $1.2M profitably.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'CRED "Greatest Financial Advice" Super Bowl Commercial',
    client: 'CRED',
    category: 'TV Commercials',
    metric: 'National Gold Award',
    description: 'Directed a star-studded cinematic commercial blending retro 90s nostalgia with modern fintech humor.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Swiggy Gourmet Fast Delivery Guerrilla Street Stunt',
    client: 'Swiggy',
    category: 'Social Media',
    metric: '18M+ Organic Impressions',
    description: 'Staged high-speed luxury supercar delivery stunts captured entirely on mobile vertical cameras for TikTok.',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Red Bull Extreme Urban Parkour Original Mini-Series',
    client: 'Red Bull',
    category: 'TV Commercials',
    metric: '8.5M Watch Hours',
    description: 'A 6-part vertical original series following urban athletes across rooftop landscapes.',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop',
  }
]

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') return projects
  return projects.filter(p => p.category.toLowerCase() === activeCategory.value.toLowerCase())
})
</script>
