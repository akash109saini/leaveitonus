<template>
  <!-- Client Logo Marquee Strip — Slow right-to-left infinite scroll, pause on hover -->
  <section class="py-12 sm:py-16 bg-brand-dark border-y border-white/5 overflow-hidden relative">
    <!-- Fade edges (left & right) -->
    <div class="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none"></div>

    <!-- Marquee track wrapper — pause on hover -->
    <div class="marquee-track-wrapper">
      <div class="marquee-track animate-marquee flex items-center gap-16 sm:gap-24 whitespace-nowrap">
        <!-- 4 sets of logos for 100% seamless loop on all screen widths with zero gap -->
        <div v-for="(logo, idx) in quadLogos" :key="idx" class="logo-item flex items-center justify-center shrink-0">
          <div class="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer group">
            <component :is="logo.component" class="text-white" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, h, defineComponent } from 'vue'

/* ─── Inline SVG Logo Components ────────────────────────── */
// Exact logos matching the screenshot: Taman, Crescent, Aurore, PRIMAL, icon, Slaaay, brunbae

const LogoTaman = defineComponent({
  render: () => h('svg', { viewBox: '0 0 90 40', width: 72, height: 32, fill: 'currentColor' }, [
    h('rect', { x: 0, y: 10, width: 3, height: 20 }),
    h('rect', { x: 0, y: 10, width: 20, height: 3 }),
    h('rect', { x: 8, y: 10, width: 3, height: 20 }),
    h('text', { x: 22, y: 28, 'font-size': 13, 'font-weight': '700', 'font-family': 'sans-serif', 'letter-spacing': 1 }, 'TAMAN'),
  ])
})

const LogoCrescent = defineComponent({
  render: () => h('svg', { viewBox: '0 0 130 40', width: 110, height: 32, fill: 'currentColor' }, [
    h('text', { x: 0, y: 28, 'font-size': 14, 'font-weight': '600', 'font-family': 'Georgia, serif', 'letter-spacing': 2 }, 'CRESCENT'),
    h('rect', { x: 98, y: 14, width: 14, height: 14, fill: 'currentColor', opacity: 0.8 }),
  ])
})

const LogoAurore = defineComponent({
  render: () => h('svg', { viewBox: '0 0 90 50', width: 52, height: 40, fill: 'currentColor' }, [
    // A stylized A/cross icon
    h('path', { d: 'M30,5 L45,20 L60,5 M45,20 L45,40 M20,30 L70,30', stroke: 'currentColor', 'stroke-width': 3, fill: 'none' }),
    h('text', { x: 10, y: 52, 'font-size': 10, 'font-family': 'serif', 'letter-spacing': 2 }, 'AURORE'),
  ])
})

const LogoPrimal = defineComponent({
  render: () => h('svg', { viewBox: '0 0 120 40', width: 100, height: 34, fill: 'currentColor' }, [
    h('text', { x: 0, y: 30, 'font-size': 28, 'font-weight': '900', 'font-family': 'Impact, sans-serif', 'letter-spacing': 4 }, 'PRIMAL'),
  ])
})

const LogoCup = defineComponent({
  render: () => h('svg', { viewBox: '0 0 40 55', width: 28, height: 40, fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
    h('path', { d: 'M8,8 L32,8 L28,40 L12,40 Z' }),
    h('path', { d: 'M12,40 L28,40 L26,50 L14,50 Z' }),
    h('line', { x1: 10, y1: 50, x2: 30, y2: 50, 'stroke-width': 2 }),
    h('line', { x1: 16, y1: 20, x2: 16, y2: 35, 'stroke-width': 1.5 }),
    h('line', { x1: 20, y1: 18, x2: 20, y2: 36, 'stroke-width': 1.5 }),
    h('line', { x1: 24, y1: 20, x2: 24, y2: 35, 'stroke-width': 1.5 }),
  ])
})

const LogoSlaaay = defineComponent({
  render: () => h('svg', { viewBox: '0 0 80 40', width: 64, height: 32, fill: 'currentColor' }, [
    // Stylized S icon + text
    h('path', { d: 'M6,26 C6,30 10,33 16,33 C22,33 26,29 26,24 C26,18 20,16 16,14 C12,12 10,10 10,7 C10,4 12,2 16,2 C20,2 22,4 22,7', stroke: 'currentColor', 'stroke-width': 2.5, fill: 'none', 'stroke-linecap': 'round' }),
    h('text', { x: 30, y: 28, 'font-size': 13, 'font-weight': '700', 'font-family': 'sans-serif', 'letter-spacing': 1 }, 'Slaaay'),
  ])
})

const LogoBrunbae = defineComponent({
  render: () => h('svg', { viewBox: '0 0 110 40', width: 90, height: 32, fill: 'currentColor' }, [
    h('text', { x: 0, y: 28, 'font-size': 18, 'font-weight': '800', 'font-family': 'Georgia, serif', 'letter-spacing': 1 }, 'brunbae'),
  ])
})

const logos = [
  { name: 'Taman',    component: LogoTaman    },
  { name: 'Crescent', component: LogoCrescent },
  { name: 'Aurore',   component: LogoAurore   },
  { name: 'PRIMAL',   component: LogoPrimal   },
  { name: 'Cup',      component: LogoCup      },
  { name: 'Slaaay',   component: LogoSlaaay   },
  { name: 'brunbae',  component: LogoBrunbae  },
]

// Duplicate logos array 4 times for endless marquee across ultra-wide viewports
const quadLogos = computed(() => [...logos, ...logos, ...logos, ...logos])
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
  animation: marquee-scroll 25s linear infinite;
  will-change: transform;
}
.marquee-track-wrapper:hover .animate-marquee {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
