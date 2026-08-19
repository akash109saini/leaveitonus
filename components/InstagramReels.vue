<template>
  <!-- Instagram Reels Showcase — placed after Logo Header -->
  <section class="reels-section py-20 sm:py-28 bg-brand-dark relative overflow-hidden">
    <!-- Ambient background glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.15)]">
            LATEST REELS
          </span>
          <h2 class="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
            Content That <span class="text-gradient-yellow">Goes Viral</span>
          </h2>
        </div>
        <p class="text-sm text-brand-textSec max-w-md">
          Watch our latest creator-led reels — scroll-stopping content crafted to drive engagement and build brand presence across platforms.
        </p>
      </div>

      <!-- Desktop Grid (4 columns) -->
      <div class="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="reel in reels" 
          :key="reel.id"
          class="reel-card group relative rounded-2xl overflow-hidden shadow-xl shadow-black/40 transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-brand-yellow/10 border border-white/5 hover:border-brand-yellow/30"
        >
          <!-- 9:16 Aspect Container -->
          <div class="relative aspect-[9/16] bg-brand-surface">
            <!-- Instagram Embed iframe -->
            <iframe
              :src="reel.embedUrl"
              class="absolute inset-0 w-full h-full border-0"
              allowfullscreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              loading="lazy"
              :title="reel.title"
            ></iframe>

            <!-- Loading Skeleton -->
            <div class="absolute inset-0 bg-brand-surface flex items-center justify-center pointer-events-none iframe-skeleton">
              <div class="flex flex-col items-center gap-3">
                <div class="w-10 h-10 rounded-full border-2 border-brand-yellow/40 border-t-brand-yellow animate-spin"></div>
                <span class="text-brand-textSec text-xs font-medium">Loading Reel...</span>
              </div>
            </div>
          </div>

          <!-- Bottom caption overlay -->
          <div class="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
            <h4 class="text-white text-sm font-bold leading-tight mb-1">{{ reel.title }}</h4>
            <p class="text-white/50 text-[11px] font-medium flex items-center gap-1.5">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              {{ reel.category }}
            </p>
          </div>
        </div>
      </div>

      <!-- Mobile Horizontal Scroll -->
      <div class="md:hidden -mx-4 px-4">
        <div class="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          <div
            v-for="reel in reels"
            :key="'m-' + reel.id"
            class="reel-card group relative rounded-2xl overflow-hidden shadow-xl shadow-black/40 snap-center shrink-0 border border-white/5"
            style="width: 72vw; max-width: 300px;"
          >
            <div class="relative aspect-[9/16] bg-brand-surface">
              <iframe
                :src="reel.embedUrl"
                class="absolute inset-0 w-full h-full border-0"
                allowfullscreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                :title="reel.title"
              ></iframe>

              <!-- Loading Skeleton -->
              <div class="absolute inset-0 bg-brand-surface flex items-center justify-center pointer-events-none iframe-skeleton">
                <div class="w-8 h-8 rounded-full border-2 border-brand-yellow/40 border-t-brand-yellow animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View All CTA -->
      <div class="flex justify-center mt-12">
        <a
          href="https://www.instagram.com/leaveitonusmedia/"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-glass-secondary text-sm px-8 py-3.5 group"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          <span>Follow Us on Instagram</span>
          <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/* ─── Reel Data — all using the same Instagram reel ─── */
const REEL_EMBED_BASE = 'https://www.instagram.com/reel/DcDxrcGgilP/embed/'

const reels = [
  {
    id: 1,
    title: 'Behind the Scenes: Viral Campaign Shoot',
    category: 'Production',
    embedUrl: REEL_EMBED_BASE,
  },
  {
    id: 2,
    title: 'Creator Spotlight: Scaling to 10M Views',
    category: 'Strategy',
    embedUrl: REEL_EMBED_BASE,
  },
  {
    id: 3,
    title: 'The Art of Scroll-Stopping Hooks',
    category: 'Content Tips',
    embedUrl: REEL_EMBED_BASE,
  },
  {
    id: 4,
    title: 'Studio Day: Cinematic Vertical Content',
    category: 'Behind the Scenes',
    embedUrl: REEL_EMBED_BASE,
  },
]
</script>

<style scoped>
.reel-card {
  will-change: transform;
}

/* Hide the loading skeleton after delay */
.reel-card iframe:not([src=""]) ~ .iframe-skeleton {
  opacity: 0;
  transition: opacity 0.5s ease 1.5s;
}

/* Hide scrollbar on mobile horizontal scroll */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
