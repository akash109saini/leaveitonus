<template>
  <!-- Client Logo Marquee Strip — Slow right-to-left infinite scroll, pause on hover -->
  <section class="py-10 sm:py-14 bg-brand-dark border-y border-white/5 overflow-hidden relative select-none">
    <!-- Fade edges (left & right) -->
    <div class="absolute left-0 top-0 bottom-0 w-24 sm:w-44 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-24 sm:w-44 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 text-center mb-8">
      <p class="text-xs uppercase tracking-widest font-extrabold text-brand-textMuted">
        TRUSTED BY MARKET-LEADING BRANDS &amp; INDUSTRY CREATORS
      </p>
    </div>

    <!-- Marquee track wrapper — pause on hover -->
    <div class="marquee-track-wrapper group">
      <div class="marquee-track animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]">
        <!-- 3 sets of logos for 100% seamless loop on all screen widths with zero gap -->
        <div 
          v-for="(logo, idx) in loopLogos" 
          :key="idx" 
          class="logo-item flex items-center justify-center shrink-0 px-2 sm:px-4"
        >
          <div class="flex items-center justify-center h-16 sm:h-20 cursor-pointer group/card transform hover:scale-110 transition-transform duration-300">
            <img 
              :src="logo.src" 
              :alt="logo.alt" 
              class="max-h-12 sm:max-h-16 max-w-[140px] sm:max-w-[180px] object-contain filter brightness-105 opacity-85 group-hover/card:opacity-100 group-hover/card:brightness-125 transition-all duration-300"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const mainClientLogos = [
  { id: '2', src: '/images/logo/2.png', alt: 'Client Partner 2' },
  { id: '3', src: '/images/logo/3.png', alt: 'Client Partner 3' },
  { id: '4', src: '/images/logo/4.png', alt: 'Client Partner 4' },
  { id: '9', src: '/images/logo/9.png', alt: 'Client Partner 9' },
  { id: '11', src: '/images/logo/11.png', alt: 'Client Partner 11' },
  { id: '13', src: '/images/logo/13.png', alt: 'Client Partner 13' },
  { id: '15', src: '/images/logo/15.png', alt: 'Client Partner 15' },
  { id: '17', src: '/images/logo/17.png', alt: 'Client Partner 17' },
  { id: '19', src: '/images/logo/19.png', alt: 'Client Partner 19' },
  { id: '20', src: '/images/logo/20.png', alt: 'Client Partner 20' },
  { id: '32', src: '/images/logo/32.png', alt: 'Client Partner 32' },
  { id: '34', src: '/images/logo/34.png', alt: 'Client Partner 34' },
  { id: '36', src: '/images/logo/36.png', alt: 'Client Partner 36' },
  { id: '38', src: '/images/logo/38.png', alt: 'Client Partner 38' },
  { id: '39', src: '/images/logo/39.png', alt: 'Client Partner 39' },
]

// Duplicate logos array 3 times for endless marquee across ultra-wide viewports
const loopLogos = computed(() => [...mainClientLogos, ...mainClientLogos, ...mainClientLogos])
</script>

<style scoped>
.marquee-track-wrapper {
  overflow: hidden;
  width: 100%;
}
.animate-marquee {
  display: flex;
  align-items: center;
  width: max-content;
  animation: marquee-scroll 32s linear infinite;
  will-change: transform;
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-33.333%);
  }
}
</style>
