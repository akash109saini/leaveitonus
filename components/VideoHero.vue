<template>
  <section class="relative min-h-screen w-full flex flex-col justify-end overflow-hidden bg-brand-dark pt-24 pb-10 sm:pb-16 px-4 sm:px-8 lg:px-12">
    <!-- Ambient Fullscreen Video Showcase Background -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <!-- Local VSL background video — copied to public/video/ for Nuxt static serving -->
      <video 
        autoplay 
        muted 
        loop 
        playsinline 
        poster="/video/VSL-bg-video.mp4"
        class="w-full h-full object-cover"
      >
        <!-- Primary: user's own production video -->
        <source src="/video/VSL-bg-video.mp4" type="video/mp4" />
      </video>

      <!-- Bottom Gradient Overlay for High Contrast Text Readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent"></div>
    </div>

    <!-- Hero Content Container (Matching Exact Layout from Screenshots 1 & 2) -->
    <div class="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-4">
      
      <!-- Headline Overlay (Bottom-Left) -->
      <div class="max-w-2xl">
        <h1 class="font-condensed text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase leading-[1.05] tracking-wide">
          <div>WE BUILD DISTRIBUTION SYSTEMS THAT</div>
          <div>
            <span class="text-brand-yellow text-yellow-glow">GENERATE ATTENTION</span> AND SALES.
          </div>
        </h1>
      </div>

      <!-- Action Buttons Container (Bottom-Right on Desktop, Stacked/Flex on Mobile) -->
      <div class="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 shrink-0">
        <!-- Primary CTA: Explore Our Ecosystem → -->
        <NuxtLink 
          to="/work" 
          class="btn-yellow-primary w-full sm:w-auto text-sm sm:text-base px-8 py-4"
        >
          <span>Explore Our Ecosystem</span>
          <ArrowRight class="w-5 h-5 stroke-[3] flex-shrink-0" />
        </NuxtLink>

        <!-- Secondary CTA: Let's Talk -->
        <NuxtLink 
          to="/contact-us" 
          class="btn-glass-secondary w-full sm:w-auto text-sm sm:text-base px-8 py-4"
        >
          <span>Let's Talk</span>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>
