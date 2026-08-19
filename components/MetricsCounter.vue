<template>
  <section ref="counterSection" class="py-20 bg-brand-surface border-y border-white/10 relative overflow-hidden">
    <!-- Subtle yellow gradient backdrop -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.2)]">
          PROVEN SCALE & IMPACT
        </span>
        <h2 class="font-display font-bold text-3xl sm:text-4xl text-white mt-4">
          Numbers That Drive <span class="text-gradient-yellow">Modern Culture</span>
        </h2>
        <p class="text-sm text-brand-textSec mt-2">
          We combine hyper-creative production with algorithmic precision to deliver measurable ROI.
        </p>
      </div>

      <!-- Metric Cards with #FFE300 Glowing Numbers & Top Border Accent -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group card-yellow-top hover:border-brand-yellow/60 transition-all duration-300 shadow-[0_0_20px_rgba(255,227,0,0.08)]"
        >
          <div class="text-[10px] uppercase tracking-widest font-extrabold text-brand-yellow bg-brand-yellow/10 px-2.5 py-1 rounded-md border border-brand-yellow/20 inline-block mb-4">
            MEASURED IMPACT
          </div>

          <div class="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-yellow text-yellow-glow tracking-tight mb-2">
            <span :ref="el => statRefs[index] = el as HTMLElement">{{ stat.startValue }}</span>{{ stat.suffix }}
          </div>

          <div class="text-sm font-bold text-white mb-1">{{ stat.title }}</div>
          <div class="text-xs text-brand-textMuted leading-relaxed">{{ stat.description }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#imports'

const counterSection = ref<HTMLElement | null>(null)
const statRefs = ref<HTMLElement[]>([])

const stats = [
  { 
    title: 'Videos / Month', 
    targetValue: 700, 
    startValue: '0',
    suffix: '+', 
    description: 'Original creator reels, UGC ads, and long-form brand content.'
  },
  { 
    title: 'In-House Team', 
    targetValue: 150, 
    startValue: '0',
    suffix: '+', 
    description: 'Filmmakers, strategists, sound designers, and media buyers.'
  },
  { 
    title: 'Monthly Organic Reach', 
    targetValue: 10, 
    startValue: '0',
    suffix: 'M+', 
    description: 'Viral impressions across TikTok, Instagram, YouTube, & Shorts.'
  },
  { 
    title: 'Revenue Scaled', 
    targetValue: 50, 
    startValue: '0',
    suffix: 'M+', 
    description: 'Tracked ad revenue & direct e-commerce sales for clients.'
  },
]

onMounted(() => {
  if (process.client) {
    const { $gsap, $ScrollTrigger } = useNuxtApp() as any
    if ($gsap && $ScrollTrigger && counterSection.value) {
      $gsap.fromTo(
        counterSection.value,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: counterSection.value,
            start: 'top 80%',
          }
        }
      )

      stats.forEach((stat, idx) => {
        const el = statRefs.value[idx]
        if (el) {
          const obj = { val: 0 }
          $gsap.to(obj, {
            val: stat.targetValue,
            duration: 2.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counterSection.value,
              start: 'top 75%',
            },
            onUpdate: () => {
              el.innerText = Math.floor(obj.val).toString()
            }
          })
        }
      })
    }
  }
})
</script>
