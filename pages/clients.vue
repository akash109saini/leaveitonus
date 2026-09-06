<template>
  <div class="pt-32 pb-24 overflow-hidden">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative">
      <!-- Glow effect -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.2)] inline-block mb-6">
        CLIENT PARTNERS & BRAND ROSTER
      </span>
      <h1 class="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6">
        Trusted by <span class="text-gradient-yellow">48+ Industry Leaders</span> & <br class="hidden sm:inline" />
        <span class="italic font-serif font-normal">Fast-Growing Brands.</span>
      </h1>
      <p class="text-base sm:text-lg text-brand-textSec max-w-3xl mx-auto mb-10 leading-relaxed">
        From visionary venture-backed startups to iconic consumer brands, <span class="text-brand-yellow font-semibold">Leave It On Us</span> powers the viral content, short-form media, and creative growth engines that drive exponential engagement.
      </p>

      <!-- Key Metrics Strip -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div class="glass-card p-5 rounded-2xl border border-white/10 hover:border-brand-yellow/40 transition-all duration-300">
          <div class="font-display font-black text-3xl sm:text-4xl text-brand-yellow">48+</div>
          <div class="text-xs text-brand-textMuted uppercase tracking-wider font-semibold mt-1">Brand Partners</div>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-white/10 hover:border-brand-yellow/40 transition-all duration-300">
          <div class="font-display font-black text-3xl sm:text-4xl text-brand-yellow">150M+</div>
          <div class="text-xs text-brand-textMuted uppercase tracking-wider font-semibold mt-1">Organic Views</div>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-white/10 hover:border-brand-yellow/40 transition-all duration-300">
          <div class="font-display font-black text-3xl sm:text-4xl text-brand-yellow">4.8x</div>
          <div class="text-xs text-brand-textMuted uppercase tracking-wider font-semibold mt-1">Avg Blended ROAS</div>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-white/10 hover:border-brand-yellow/40 transition-all duration-300">
          <div class="font-display font-black text-3xl sm:text-4xl text-brand-yellow">99.2%</div>
          <div class="text-xs text-brand-textMuted uppercase tracking-wider font-semibold mt-1">Client Retention</div>
        </div>
      </div>
    </section>

    <!-- Infinite Scrolling Logo Marquee Strip (Dual Row) -->
    <section class="py-10 bg-brand-surface/60 border-y border-white/10 overflow-hidden relative mb-20">
      <div class="absolute left-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none"></div>
      <div class="absolute right-0 top-0 bottom-0 w-24 sm:w-48 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none"></div>

      <!-- Row 1 (Left to Right / Forward) -->
      <div class="flex overflow-hidden mb-6 group">
        <div class="flex gap-6 items-center animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          <div 
            v-for="logo in row1Logos" 
            :key="`r1-${logo.id}`"
            class="flex items-center justify-center w-36 h-20 sm:w-44 sm:h-24 px-4 py-3 rounded-2xl bg-white/95 hover:bg-white border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(255,227,0,0.35)] transition-all duration-300 shrink-0 transform hover:scale-105"
          >
            <img 
              :src="logo.src" 
              :alt="`Client Partner ${logo.id}`" 
              class="max-h-12 sm:max-h-14 max-w-full object-contain filter contrast-105"
              loading="lazy"
            />
          </div>
        </div>
        <div class="flex gap-6 items-center animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]" aria-hidden="true">
          <div 
            v-for="logo in row1Logos" 
            :key="`r1-dup-${logo.id}`"
            class="flex items-center justify-center w-36 h-20 sm:w-44 sm:h-24 px-4 py-3 rounded-2xl bg-white/95 hover:bg-white border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(255,227,0,0.35)] transition-all duration-300 shrink-0 transform hover:scale-105"
          >
            <img 
              :src="logo.src" 
              :alt="`Client Partner ${logo.id}`" 
              class="max-h-12 sm:max-h-14 max-w-full object-contain filter contrast-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Row 2 (Right to Left / Reverse) -->
      <div class="flex overflow-hidden group">
        <div class="flex gap-6 items-center animate-marquee-reverse whitespace-nowrap group-hover:[animation-play-state:paused]">
          <div 
            v-for="logo in row2Logos" 
            :key="`r2-${logo.id}`"
            class="flex items-center justify-center w-36 h-20 sm:w-44 sm:h-24 px-4 py-3 rounded-2xl bg-white/95 hover:bg-white border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(255,227,0,0.35)] transition-all duration-300 shrink-0 transform hover:scale-105"
          >
            <img 
              :src="logo.src" 
              :alt="`Client Partner ${logo.id}`" 
              class="max-h-12 sm:max-h-14 max-w-full object-contain filter contrast-105"
              loading="lazy"
            />
          </div>
        </div>
        <div class="flex gap-6 items-center animate-marquee-reverse whitespace-nowrap group-hover:[animation-play-state:paused]" aria-hidden="true">
          <div 
            v-for="logo in row2Logos" 
            :key="`r2-dup-${logo.id}`"
            class="flex items-center justify-center w-36 h-20 sm:w-44 sm:h-24 px-4 py-3 rounded-2xl bg-white/95 hover:bg-white border border-white/20 shadow-md hover:shadow-[0_0_20px_rgba(255,227,0,0.35)] transition-all duration-300 shrink-0 transform hover:scale-105"
          >
            <img 
              :src="logo.src" 
              :alt="`Client Partner ${logo.id}`" 
              class="max-h-12 sm:max-h-14 max-w-full object-contain filter contrast-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Main All 48 Client Logos Showcase Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.15)]">
            COMPLETE LOGO GALLERY
          </span>
          <h2 class="font-display font-black text-3xl sm:text-5xl text-white mt-4">
            All <span class="text-gradient-yellow">48 Client Logos</span>
          </h2>
          <p class="text-sm text-brand-textSec mt-2 max-w-xl">
            Browse our complete roster of brand collaborators across D2C, technology, entertainment, retail, and lifestyle sectors.
          </p>
        </div>

        <!-- Filter / Search Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="activeCategory = cat.id"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border',
              activeCategory === cat.id 
                ? 'bg-brand-yellow text-black border-brand-yellow shadow-[0_0_15px_rgba(255,227,0,0.4)]' 
                : 'bg-white/5 text-brand-textSec border-white/10 hover:border-brand-yellow/40 hover:text-white'
            ]"
          >
            {{ cat.label }}
          </button>
        </div>
      </div>

      <!-- 48 Logos Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        <div 
          v-for="logo in filteredLogos" 
          :key="logo.id"
          class="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-white/95 hover:bg-white border border-white/20 hover:border-brand-yellow shadow-md hover:shadow-[0_0_25px_rgba(255,227,0,0.4)] transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer h-32 sm:h-36"
        >
          <!-- Logo Image -->
          <div class="w-full h-full flex items-center justify-center p-2">
            <img 
              :src="logo.src" 
              :alt="`Client Logo ${logo.id}`" 
              class="max-h-16 sm:max-h-20 max-w-full object-contain filter contrast-105 transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Partner ID Badge on Hover -->
          <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/80 text-brand-yellow border border-brand-yellow/30">
              #{{ String(logo.id).padStart(2, '0') }}
            </span>
          </div>
        </div>
      </div>

      <!-- Count Summary -->
      <div class="mt-8 text-center text-xs font-semibold text-brand-textMuted">
        Showing <span class="text-brand-yellow">{{ filteredLogos.length }}</span> of <span class="text-white">48</span> brand client logos
      </div>
    </section>

    <!-- Why Brands Choose Leave It On Us -->
    <section class="py-20 bg-brand-surface border-y border-white/10 mb-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.15)] inline-block mb-4">
            THE LEAVE IT ON US ADVANTAGE
          </span>
          <h2 class="font-display font-black text-3xl sm:text-5xl text-white">
            Why Top Brands <span class="text-gradient-yellow">Leave It On Us</span>
          </h2>
          <p class="text-sm text-brand-textSec mt-3">
            We operate as an agile creative engine delivering viral performance assets with zero client friction.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="glass-card p-8 rounded-3xl border border-white/10 card-yellow-top hover:border-brand-yellow/50 transition-all duration-300 shadow-[0_0_15px_rgba(255,227,0,0.06)]">
            <div class="w-12 h-12 rounded-2xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow font-black text-lg mb-6 shadow-[0_0_15px_rgba(255,227,0,0.2)]">
              01
            </div>
            <h3 class="font-display font-bold text-lg text-white mb-2">100% In-House Production</h3>
            <p class="text-xs text-brand-textSec leading-relaxed">
              From scripting and creative concepting to multi-cam 4K filming and sound engineering, everything is produced internally.
            </p>
          </div>

          <div class="glass-card p-8 rounded-3xl border border-white/10 card-yellow-top hover:border-brand-yellow/50 transition-all duration-300 shadow-[0_0_15px_rgba(255,227,0,0.06)]">
            <div class="w-12 h-12 rounded-2xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow font-black text-lg mb-6 shadow-[0_0_15px_rgba(255,227,0,0.2)]">
              02
            </div>
            <h3 class="font-display font-bold text-lg text-white mb-2">High-Converting Hooks</h3>
            <p class="text-xs text-brand-textSec leading-relaxed">
              We test dozens of visual and psychological hooks per shoot to maximize retention across Instagram Reels & YouTube Shorts.
            </p>
          </div>

          <div class="glass-card p-8 rounded-3xl border border-white/10 card-yellow-top hover:border-brand-yellow/50 transition-all duration-300 shadow-[0_0_15px_rgba(255,227,0,0.06)]">
            <div class="w-12 h-12 rounded-2xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow font-black text-lg mb-6 shadow-[0_0_15px_rgba(255,227,0,0.2)]">
              03
            </div>
            <h3 class="font-display font-bold text-lg text-white mb-2">Vetted Creator Talents</h3>
            <p class="text-xs text-brand-textSec leading-relaxed">
              Exclusive access to our roster of on-camera actors, comedic creators, and UGC specialists handpicked for your target demographic.
            </p>
          </div>

          <div class="glass-card p-8 rounded-3xl border border-white/10 card-yellow-top hover:border-brand-yellow/50 transition-all duration-300 shadow-[0_0_15px_rgba(255,227,0,0.06)]">
            <div class="w-12 h-12 rounded-2xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow font-black text-lg mb-6 shadow-[0_0_15px_rgba(255,227,0,0.2)]">
              04
            </div>
            <h3 class="font-display font-bold text-lg text-white mb-2">Guaranteed Turnaround</h3>
            <p class="text-xs text-brand-textSec leading-relaxed">
              Agile workflows delivering finished, color-graded, captioned short-form video deliverables in as fast as 48 to 72 hours.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Testimonials Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.15)]">
            FOUNDER & CMO FEEDBACK
          </span>
          <h2 class="font-display font-black text-3xl sm:text-5xl text-white mt-4">
            Hear From Our <span class="text-gradient-yellow">Partners</span>
          </h2>
        </div>
        <p class="text-sm text-brand-textSec max-w-sm">
          Click any review card below to view detailed breakdown and campaign impact.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="item in videoTestimonials" 
          :key="item.id"
          class="glass-card rounded-3xl overflow-hidden border border-brand-yellow/30 group cursor-pointer flex flex-col justify-between hover:border-brand-yellow/70 transition-all duration-300 shadow-[0_0_20px_rgba(255,227,0,0.1)]"
          @click="playTestimonial(item)"
        >
          <!-- Thumbnail with Play Overlay -->
          <div class="relative aspect-video w-full overflow-hidden bg-brand-surface">
            <img :src="item.thumbnail" :alt="item.author" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90" />
            <div class="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div class="w-14 h-14 rounded-full bg-brand-yellow text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,227,0,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
                <Play class="w-6 h-6 fill-black ml-1" />
              </div>
            </div>
            <div class="absolute top-4 left-4">
              <span class="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-brand-yellow border border-brand-yellow/30">
                {{ item.client }}
              </span>
            </div>
          </div>

          <!-- Quote Body -->
          <div class="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div class="text-[10px] font-extrabold text-brand-yellow uppercase tracking-widest bg-brand-yellow/10 px-2.5 py-0.5 rounded border border-brand-yellow/20 inline-block mb-3">
                VERIFIED PARTNER REVIEW
              </div>
              <p class="text-xs sm:text-sm text-white font-medium italic leading-relaxed mb-4">
                "{{ item.quote }}"
              </p>
            </div>

            <div class="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <div class="text-xs font-bold text-white">{{ item.author }}</div>
                <div class="text-[10px] text-brand-textMuted">{{ item.role }}, {{ item.client }}</div>
              </div>

              <div class="text-xs font-extrabold text-brand-yellow bg-brand-yellow/15 px-3 py-1 rounded-full border border-brand-yellow/30 text-yellow-glow">
                {{ item.metric }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Client FAQ Section -->
    <section class="py-20 bg-brand-surface border-t border-white/10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.15)] inline-block mb-3">
            QUESTIONS & ANSWERS
          </span>
          <h2 class="font-display font-black text-3xl sm:text-4xl text-white">
            Frequently Asked <span class="text-gradient-yellow">Partnership Questions</span>
          </h2>
        </div>

        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="glass-card p-6 rounded-2xl border border-white/10 hover:border-brand-yellow/40 transition-colors">
            <h3 class="font-display font-bold text-lg text-white mb-2">{{ faq.question }}</h3>
            <p class="text-xs text-brand-textSec leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>

        <!-- CTA Box -->
        <div class="mt-16 text-center p-10 rounded-3xl bg-gradient-to-b from-brand-surface to-black border border-brand-yellow/30 shadow-[0_0_30px_rgba(255,227,0,0.15)]">
          <h3 class="font-display font-black text-2xl sm:text-3xl text-white mb-4">
            Ready to scale your brand with <span class="text-gradient-yellow">Leave It On Us?</span>
          </h3>
          <p class="text-sm text-brand-textSec max-w-xl mx-auto mb-8">
            Let our creative team craft high-converting short-form videos and viral campaigns tailored specifically to your audience.
          </p>
          <NuxtLink 
            to="/contact-us"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-yellow text-black font-extrabold text-sm hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(255,227,0,0.5)] transform hover:scale-105"
          >
            Start Your Campaign
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Play } from 'lucide-vue-next'
import { useVideoModal } from '~/composables/useVideoModal'

const { openModal } = useVideoModal()

// Generate array of 48 client logos
const allClientLogos = Array.from({ length: 48 }, (_, i) => {
  const id = i + 1
  return {
    id,
    src: `/images/clients/${id}.png`,
    featured: id <= 12,
    group: id <= 16 ? 'd2c' : (id <= 32 ? 'tech' : 'lifestyle')
  }
})

// Splits for the dual-row marquee
const row1Logos = allClientLogos.slice(0, 24)
const row2Logos = allClientLogos.slice(24, 48)

const activeCategory = ref('all')

const categories = [
  { id: 'all', label: 'All Brands (48)' },
  { id: 'featured', label: 'Featured Top 12' },
  { id: 'd2c', label: 'D2C & Retail' },
  { id: 'tech', label: 'Tech & Services' },
  { id: 'lifestyle', label: 'Lifestyle & Media' }
]

const filteredLogos = computed(() => {
  if (activeCategory.value === 'all') return allClientLogos
  if (activeCategory.value === 'featured') return allClientLogos.filter(l => l.featured)
  return allClientLogos.filter(l => l.group === activeCategory.value)
})

const videoTestimonials = [
  {
    id: 1,
    client: 'Spotify Partner Campaign',
    author: 'Siddharth Roy',
    role: 'Head of Growth Marketing',
    quote: 'Leave It On Us delivered short-form reels that felt genuinely funny and authentic. They didn’t just meet targets; they redefined our Gen-Z brand engagement.',
    metric: '42M+ Organic Views',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    videoUrl: ''
  },
  {
    id: 2,
    client: 'Gymshark Active Campaign',
    author: 'Elena Rostova',
    role: 'Global Performance Director',
    quote: 'Their in-house studio churned out 120+ ad hook iterations in less than 3 weeks. Our Meta ROAS jumped from 2.1x to 4.8x seamlessly.',
    metric: '4.8x Blended ROAS',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    videoUrl: ''
  },
  {
    id: 3,
    client: 'Samsung Tech Showcase',
    author: 'Vikramaditya Rao',
    role: 'VP Brand Communications',
    quote: 'The unboxing stunt campaign trended #1 across YouTube Shorts for 4 consecutive days. Leave It On Us is the most agile agency partner we’ve hired.',
    metric: '+480% Pre-Orders',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?q=80&w=800&auto=format&fit=crop',
    videoUrl: ''
  }
]

const playTestimonial = (item: any) => {
  openModal({
    videoUrl: item.videoUrl,
    title: `Client Video Review: ${item.client}`,
    client: item.client,
    category: 'Client Testimonial',
    metrics: item.metric
  })
}

const faqs = [
  {
    question: 'How fast can Leave It On Us onboard a new brand client?',
    answer: 'Our typical onboarding takes 5 to 7 business days. This includes brand alignment calls, hook strategy setup, talent matching, and pre-production scripting.'
  },
  {
    question: 'Do you provide full end-to-end production or just scripting?',
    answer: 'We provide 100% end-to-end service: strategy, scripting, casting, studio filming, editing, color grading, captioning, media buying, and analytics reporting.'
  },
  {
    question: 'Can you work with our existing in-house marketing team?',
    answer: 'Absolutely. We frequently act as an extended creative & production engine for internal CMOs and growth teams.'
  }
]
</script>

<style scoped>
.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee-forward 35s linear infinite;
  will-change: transform;
}

.animate-marquee-reverse {
  display: flex;
  width: max-content;
  animation: marquee-backward 35s linear infinite;
  will-change: transform;
}

@keyframes marquee-forward {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marquee-backward {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
