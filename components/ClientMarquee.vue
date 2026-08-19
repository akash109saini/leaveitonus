<template>
  <section class="py-14 bg-brand-dark border-b border-white/10 overflow-hidden relative select-none">
    <!-- Ambient Fade Edges -->
    <div class="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none"></div>
    <div class="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 text-center mb-8">
      <p class="text-xs uppercase tracking-widest font-bold text-brand-textMuted">
        TRUSTED BY 50+ FAST-GROWING BRANDS & GLOBAL CREATORS
      </p>
    </div>

    <!-- Marquee Track Row 1 -->
    <div class="flex overflow-hidden group">
      <div class="flex gap-8 items-center animate-marquee-slow group-hover:[animation-play-state:paused] whitespace-nowrap">
        <div 
          v-for="(client, index) in clientsTrack" 
          :key="`row1-${index}`"
          class="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-yellow/40 hover:bg-white/[0.08] transition-all duration-300"
        >
          <span class="font-display font-bold text-base text-white/80 tracking-wide hover:text-white">{{ client.name }}</span>
          <span class="text-[10px] font-extrabold text-brand-yellow bg-brand-yellow/10 px-2.5 py-0.5 rounded border border-brand-yellow/20 ml-1">
            {{ client.tag }}
          </span>
        </div>
      </div>
      <!-- Duplicate track for seamless infinite marquee loop -->
      <div class="flex gap-8 items-center animate-marquee-slow group-hover:[animation-play-state:paused] whitespace-nowrap" aria-hidden="true">
        <div 
          v-for="(client, index) in clientsTrack" 
          :key="`row1-dup-${index}`"
          class="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-brand-yellow/40 hover:bg-white/[0.08] transition-all duration-300"
        >
          <span class="font-display font-bold text-base text-white/80 tracking-wide hover:text-white">{{ client.name }}</span>
          <span class="text-[10px] font-extrabold text-brand-yellow bg-brand-yellow/10 px-2.5 py-0.5 rounded border border-brand-yellow/20 ml-1">
            {{ client.tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const clientsTrack = [
  { name: 'SPOTIFY', tag: 'Original Audio IP' },
  { name: 'SAMSUNG', tag: 'Product Launch' },
  { name: 'RED BULL', tag: 'Creator Stunts' },
  { name: 'NETFLIX', tag: 'Viral Campaign' },
  { name: 'GYMSHARK', tag: 'Talent Marketing' },
  { name: 'SONY MUSIC', tag: 'Music IP' },
  { name: 'SWIGGY', tag: 'Short-Form Reels' },
  { name: 'CRED', tag: 'Commercial Ad' },
  { name: 'BOAT', tag: 'Influencer Scale' },
  { name: 'PUMA', tag: 'Brand Storytelling' },
]
</script>
