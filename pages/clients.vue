<template>
  <div class="pt-32 pb-24 overflow-hidden">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
      <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.2)] inline-block mb-6">
        CLIENT PARTNERS & CASE HIGHLIGHTS
      </span>
      <h1 class="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6">
        Trusted by Global Brands & <br class="hidden sm:inline" />
        <span class="text-gradient-yellow italic font-serif font-normal">Fast-Growing Industry Leaders.</span>
      </h1>
      <p class="text-base sm:text-lg text-brand-textSec max-w-2xl mx-auto">
        From Fortune 500 tech giants to breakout venture-backed startups, <span class="text-brand-yellow font-bold">Leave It On Us</span> helps ambitious brands dominate short-form media.
      </p>
    </section>

    <!-- Client Partner Brands Grid Showcase -->
    <section class="py-16 bg-brand-surface border-y border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-xl mx-auto mb-12">
          <h2 class="font-display font-bold text-2xl text-white">Partner Roster</h2>
          <p class="text-xs text-brand-textMuted mt-1">Select brands scaling their video channels with <span class="text-brand-yellow font-semibold">Leave It On Us</span>.</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="brand in partnerBrands" 
            :key="brand.name"
            class="glass-card p-6 rounded-2xl border border-white/10 card-yellow-top hover:border-brand-yellow/60 transition-all duration-300 shadow-[0_0_15px_rgba(255,227,0,0.08)]"
          >
            <div class="font-display font-extrabold text-base text-white group-hover:text-brand-yellow transition-colors mb-1">{{ brand.name }}</div>
            <div class="text-[10px] text-brand-textMuted">{{ brand.category }}</div>
            <div class="mt-3 px-2.5 py-0.5 rounded bg-brand-yellow/15 text-brand-yellow text-[9px] font-extrabold border border-brand-yellow/30 shadow-[0_0_8px_rgba(255,227,0,0.2)]">
              {{ brand.stat }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Testimonials & Founder Quotes Section -->
    <section class="py-24 bg-brand-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.15)]">
              VIDEO TESTIMONIALS
            </span>
            <h2 class="font-display font-black text-3xl sm:text-4xl text-white mt-4">
              Hear Directly From <span class="text-gradient-yellow">Founders & CMOs</span>
            </h2>
          </div>
          <p class="text-sm text-brand-textSec max-w-sm">
            Click any video card to play the full case study breakdown and testimonial.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  VERIFIED CLIENT REVIEW
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
      </div>
    </section>

    <!-- Client FAQ Section -->
    <section class="py-20 bg-brand-surface border-t border-white/10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="font-display font-bold text-3xl text-white">Frequently Asked <span class="text-gradient-yellow">Partnership Questions</span></h2>
        </div>

        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="glass-card p-6 rounded-2xl border border-white/10 hover:border-brand-yellow/40 transition-colors">
            <h3 class="font-display font-bold text-lg text-white mb-2">{{ faq.question }}</h3>
            <p class="text-xs text-brand-textSec leading-relaxed">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Play } from 'lucide-vue-next'
import { useVideoModal } from '~/composables/useVideoModal'

const { openModal } = useVideoModal()

const partnerBrands = [
  { name: 'SPOTIFY', category: 'Audio / Tech', stat: '42M+ Views' },
  { name: 'SAMSUNG', category: 'Consumer Electronics', stat: '+480% Pre-Orders' },
  { name: 'RED BULL', category: 'Beverage / Media', stat: '15M Impressions' },
  { name: 'NETFLIX', category: 'Entertainment', stat: 'Viral Series' },
  { name: 'GYMSHARK', category: 'Fitness Apparel', stat: '4.8x ROAS' },
  { name: 'SONY MUSIC', category: 'Music Industry', stat: '3.4M Audio Saves' },
  { name: 'SWIGGY', category: 'Food Delivery', stat: '700+ Shorts' },
  { name: 'CRED', category: 'FinTech', stat: 'High Conversion' },
  { name: 'BOAT', category: 'Consumer Tech', stat: 'Creator Network' },
  { name: 'PUMA', category: 'Sportswear', stat: '+320% ROI' },
  { name: 'ZOMATO', category: 'Food Tech', stat: 'Viral Comedy IP' },
  { name: 'NYKAA', category: 'Beauty & Lifestyle', stat: 'UGC Ad Scale' }
]

const videoTestimonials = [
  {
    id: 1,
    client: 'Spotify',
    author: 'Siddharth Roy',
    role: 'Head of Growth Marketing',
    quote: 'Leave It On Us delivered short-form reels that felt genuinely funny and authentic. They didn’t just meet targets; they redefined our Gen-Z brand engagement.',
    metric: '42M+ Organic Views',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    videoUrl: ''
  },
  {
    id: 2,
    client: 'Gymshark',
    author: 'Elena Rostova',
    role: 'Global Performance Director',
    quote: 'Their in-house studio churned out 120+ ad hook iterations in less than 3 weeks. Our Meta ROAS jumped from 2.1x to 4.8x seamlessly.',
    metric: '4.8x Blended ROAS',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    videoUrl: ''
  },
  {
    id: 3,
    client: 'Samsung',
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
