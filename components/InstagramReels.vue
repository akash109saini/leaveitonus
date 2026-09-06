<template>
  <section
    class="reels-section py-16 sm:py-24 bg-brand-dark relative overflow-hidden select-none"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
  >
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-brand-yellow/6 rounded-full blur-[160px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16">
        <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30">
          LATEST REELS
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
          Content That <span class="text-gradient-yellow">Goes Viral</span>
        </h2>
        <p class="text-sm text-brand-textSec mt-3 max-w-lg mx-auto">
          Scroll-stopping vertical content crafted to drive engagement across platforms.
        </p>
      </div>

      <!-- ═══ STAGE ═══ -->
      <div class="relative flex items-center justify-center">

        <!-- LEFT SIDE CARDS -->
        <div class="hidden lg:flex items-center justify-end gap-4 flex-1 pr-6">

          <!-- Far left -->
          <div
            class="side-card cursor-pointer"
            style="width:168px;height:330px;border-radius:24px;transform:perspective(900px) rotateY(18deg) scale(0.88);opacity:0.7;"
            @click="goTo(leftFarIndex)"
          >
            <div class="side-preview" style="border-radius:24px;">
              <video
                :src="reels[leftFarIndex].videoUrl"
                autoplay
                loop
                muted
                playsinline
                class="w-full h-full object-cover"
              ></video>
            </div>
            <div class="side-info-overlay">
              <div class="side-play">
                <svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div class="absolute bottom-4 left-3 right-3 z-10 text-center">
                <span class="text-[10px] font-bold text-white/80 uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 border border-white/15">{{ reels[leftFarIndex].tag }}</span>
              </div>
            </div>
          </div>

          <!-- Near left -->
          <div
            class="side-card cursor-pointer"
            style="width:205px;height:385px;border-radius:26px;transform:perspective(900px) rotateY(10deg) scale(0.96);opacity:0.9;"
            @click="goTo(leftNearIndex)"
          >
            <div class="side-preview" style="border-radius:26px;">
              <video
                :src="reels[leftNearIndex].videoUrl"
                autoplay
                loop
                muted
                playsinline
                class="w-full h-full object-cover"
              ></video>
            </div>
            <div class="side-info-overlay">
              <div class="side-play" style="width:46px;height:46px;">
                <svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div class="absolute top-4 left-4 right-4 z-10">
                <p class="text-white text-xs font-semibold leading-tight line-clamp-2 drop-shadow-lg">{{ reels[leftNearIndex].title }}</p>
                <p class="text-white/60 text-[10px] mt-0.5">{{ reels[leftNearIndex].creator }}</p>
              </div>
              <div class="absolute bottom-4 left-4 right-4 z-10 text-center">
                <span class="text-[10px] font-bold text-white/80 uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 border border-white/15">{{ reels[leftNearIndex].tag }}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- ════ CENTER PHONE ════ -->
        <div class="phone-wrapper flex-shrink-0">

          <!-- Screen viewport -->
          <div class="phone-screen">

            <!-- Active Video with top & bottom black blank space -->
            <Transition name="reel-fade" mode="out-in">
              <div :key="activeIndex" class="phone-video-container">
                <video
                  ref="activeVideoRef"
                  :src="reels[activeIndex].videoUrl"
                  autoplay
                  loop
                  :muted="isMuted"
                  playsinline
                  class="phone-video-el"
                ></video>
              </div>
            </Transition>
          </div>

          <!-- Phone PNG frame — fixed on top -->
          <img
            src="/mobile.png"
            alt="Phone frame"
            class="phone-frame-img"
            draggable="false"
          />

          <!-- Sound toggle button — shifted left & highly visible -->
          <button
            @click.stop="toggleMute"
            class="sound-btn"
            :class="{ 'sound-btn--active': !isMuted }"
            :aria-label="isMuted ? 'Unmute video' : 'Mute video'"
            :title="isMuted ? 'Click to unmute sound' : 'Click to mute sound'"
          >
            <svg v-if="isMuted" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            <svg v-else class="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2.5 9.77H8.5L5 9.5H2v5h3l3.5 3.5V6.5l3 3v3.5zm2.5-4.77v2.22c.98.58 1.5 1.61 1.5 2.78s-.52 2.2-1.5 2.78v2.22c2.06-.74 3.5-2.7 3.5-5s-1.44-4.26-3.5-5z" />
            </svg>
          </button>

        </div>
        <!-- /phone -->

        <!-- RIGHT SIDE CARDS -->
        <div class="hidden lg:flex items-center justify-start gap-4 flex-1 pl-6">

          <!-- Near right -->
          <div
            class="side-card cursor-pointer"
            style="width:205px;height:385px;border-radius:26px;transform:perspective(900px) rotateY(-10deg) scale(0.96);opacity:0.9;"
            @click="goTo(rightNearIndex)"
          >
            <div class="side-preview" style="border-radius:26px;">
              <video
                :src="reels[rightNearIndex].videoUrl"
                autoplay
                loop
                muted
                playsinline
                class="w-full h-full object-cover"
              ></video>
            </div>
            <div class="side-info-overlay">
              <div class="side-play" style="width:46px;height:46px;">
                <svg class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div class="absolute top-4 left-4 right-4 z-10">
                <p class="text-white text-xs font-semibold leading-tight line-clamp-2 drop-shadow-lg">{{ reels[rightNearIndex].title }}</p>
                <p class="text-white/60 text-[10px] mt-0.5">{{ reels[rightNearIndex].creator }}</p>
              </div>
              <div class="absolute bottom-4 left-4 right-4 z-10 text-center">
                <span class="text-[10px] font-bold text-white/80 uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 border border-white/15">{{ reels[rightNearIndex].tag }}</span>
              </div>
            </div>
          </div>

          <!-- Far right -->
          <div
            class="side-card cursor-pointer"
            style="width:168px;height:330px;border-radius:24px;transform:perspective(900px) rotateY(-18deg) scale(0.88);opacity:0.7;"
            @click="goTo(rightFarIndex)"
          >
            <div class="side-preview" style="border-radius:24px;">
              <video
                :src="reels[rightFarIndex].videoUrl"
                autoplay
                loop
                muted
                playsinline
                class="w-full h-full object-cover"
              ></video>
            </div>
            <div class="side-info-overlay">
              <div class="side-play">
                <svg class="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div class="absolute bottom-4 left-3 right-3 z-10 text-center">
                <span class="text-[10px] font-bold text-white/80 uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 border border-white/15">{{ reels[rightFarIndex].tag }}</span>
              </div>
            </div>
          </div>

        </div>

      </div><!-- /stage -->

      <!-- ═══ NAVIGATION below phone ═══ -->
      <div class="flex flex-col items-center gap-5 mt-8">

        <div class="flex items-center gap-5">
          <button @click="prev" class="nav-arrow" aria-label="Previous">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="flex items-center gap-2">
            <button
              v-for="(_, idx) in reels" :key="idx"
              @click="goTo(idx)"
              class="dot"
              :class="activeIndex === idx ? 'dot-active' : 'dot-inactive'"
            ></button>
          </div>
          <button @click="next" class="nav-arrow" aria-label="Next">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full border-t border-white/10 pt-5">
          <Transition name="txt-fade" mode="out-in">
            <div :key="activeIndex" class="text-center sm:text-left">
              <p class="text-white text-sm font-semibold">{{ reels[activeIndex].title }}</p>
              <p class="text-white/50 text-xs mt-0.5">{{ reels[activeIndex].creator }}</p>
            </div>
          </Transition>
          <a
            :href="reels[activeIndex].instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-glass-secondary text-xs sm:text-sm px-6 py-3 group flex items-center gap-2.5 flex-shrink-0"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span>View on Instagram</span>
            <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

interface Reel {
  id: number
  title: string
  creator: string
  tag: string
  videoUrl: string
  instagramUrl: string
}

const reels: Reel[] = [
  {
    id: 1,
    title: 'Top 10 tips to reduce Stress',
    creator: 'Leave It On Us Media',
    tag: 'Wellness',
    videoUrl: '/reels/reel-1.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DcnsQ54M8ce/'
  },
  {
    id: 2,
    title: 'Behind the Scenes: Production Day',
    creator: 'Leave It On Us Media',
    tag: 'BTS',
    videoUrl: '/reels/reel-2.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DXMasObgb9W/'
  },
  {
    id: 3,
    title: 'Creative Campaign Shoot',
    creator: 'Leave It On Us Media',
    tag: 'Creative',
    videoUrl: '/reels/reel-3.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DcQ5nLkId61/'
  },
  {
    id: 4,
    title: 'Viral Content Strategy',
    creator: 'Leave It On Us Media',
    tag: 'Strategy',
    videoUrl: '/reels/reel-4.mp4',
    instagramUrl: 'https://www.instagram.com/reel/Dcs5GOANnxr/'
  },
  {
    id: 5,
    title: 'Interview with CEO & Founders',
    creator: 'Leave It On Us Media',
    tag: 'Interview',
    videoUrl: '/reels/reel-5.mp4',
    instagramUrl: 'https://www.instagram.com/reel/DcIxqCujq9I/'
  },
  {
    id: 6,
    title: 'Creative Hooks for Higher Reach',
    creator: 'Leave It On Us Media',
    tag: 'Growth Tips',
    videoUrl: '/reels/reel-6.mp4',
    instagramUrl: 'https://www.instagram.com/reel/Dc30KKBMIcr/'
  },
]

const N = reels.length
const activeIndex = ref(0)
const isMuted = ref(true)
const activeVideoRef = ref<HTMLVideoElement | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const leftNearIndex  = computed(() => (activeIndex.value - 1 + N) % N)
const leftFarIndex   = computed(() => (activeIndex.value - 2 + N) % N)
const rightNearIndex = computed(() => (activeIndex.value + 1) % N)
const rightFarIndex  = computed(() => (activeIndex.value + 2) % N)

const toggleMute = () => {
  isMuted.value = !isMuted.value
  if (activeVideoRef.value) {
    activeVideoRef.value.muted = isMuted.value
    if (!isMuted.value) {
      activeVideoRef.value.play().catch(() => {})
    }
  }
}

const goTo = (i: number) => {
  if (i === activeIndex.value) return
  activeIndex.value = i
}

const next = () => goTo((activeIndex.value + 1) % N)
const prev = () => goTo((activeIndex.value - 1 + N) % N)

watch(activeIndex, () => {
  nextTick(() => {
    if (activeVideoRef.value) {
      activeVideoRef.value.currentTime = 0
      activeVideoRef.value.play().catch(() => {})
    }
  })
})

const startAutoplay  = () => { stopAutoplay(); timer = setInterval(next, 10000) }
const stopAutoplay   = () => { if (timer) { clearInterval(timer); timer = null } }
const pauseAutoplay  = () => stopAutoplay()
const resumeAutoplay = () => startAutoplay()

onMounted(() => startAutoplay())
onBeforeUnmount(() => stopAutoplay())
</script>

<style scoped>
/* ═══ PHONE ══════════════════════════════════════════════════════ */
/* PNG: 1080 × 1742 → ratio = 1.6130 */
.phone-wrapper {
  position: relative;
  width: 280px;
  height: calc(280px * 1.6130); /* ≈ 452px */
  flex-shrink: 0;
}

/* Glass screen inset matching mobile.png bezel:
   horizontal bezel: 62/1080 = 5.74%
   top:              48/1742 = 2.75%
   bottom:           48/1742 = 2.75%  */
.phone-screen {
  position: absolute;
  top: 2.75%;
  bottom: 2.75%;
  left: 5.74%;
  right: 5.74%;
  border-radius: 26px;
  overflow: hidden;
  background: #000000;
  z-index: 10;
}

.phone-video-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 36px;
  padding-bottom: 36px;
}

.phone-video-el {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000000;
}

/* Phone PNG overlay on top */
.phone-frame-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  z-index: 20;
  display: block;
}

/* Sound button — shifted left & highly visible */
.sound-btn {
  position: absolute;
  top: 22px;
  right: 28px;
  z-index: 30;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.85);
  border: 1.5px solid rgba(255, 227, 0, 0.8);
  box-shadow: 0 0 14px rgba(255, 227, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.sound-btn:hover {
  transform: scale(1.14);
  background: #ffe300;
  border-color: #ffe300;
  color: #000;
  box-shadow: 0 0 22px rgba(255, 227, 0, 0.7);
}
.sound-btn--active {
  background: #ffe300;
  border-color: #ffe300;
  color: #000;
  box-shadow: 0 0 20px rgba(255, 227, 0, 0.65);
}

/* ═══ SIDE CARDS ═════════════════════════════════════════════════ */
.side-card {
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,.7);
  border: 1px solid rgba(255,255,255,.08);
  flex-shrink: 0;
  transition: transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.side-card:hover {
  border-color: rgba(255, 227, 0, 0.4);
  box-shadow: 0 25px 60px rgba(0,0,0,.85);
}

.side-preview {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.side-info-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.65) 0%,
    rgba(0,0,0,0.1) 30%,
    rgba(0,0,0,0.1) 60%,
    rgba(0,0,0,0.85) 100%
  );
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}
.side-card:hover .side-info-overlay {
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.5) 0%,
    rgba(0,0,0,0.0) 30%,
    rgba(0,0,0,0.0) 60%,
    rgba(0,0,0,0.75) 100%
  );
}

.side-play {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  box-shadow: 0 8px 24px rgba(0,0,0,.45);
  transition: transform .3s ease, background .3s ease;
  flex-shrink: 0;
}
.side-card:hover .side-play {
  transform: scale(1.12);
  background: #ffe300;
}

/* ═══ NAVIGATION ════════════════════════════════════════════════ */
.nav-arrow {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.05);
  color: rgba(255,255,255,.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background .25s, border-color .25s, color .25s, transform .2s;
}
.nav-arrow:hover {
  background: #ffe300;
  border-color: #ffe300;
  color: #000;
  transform: scale(1.08);
}

.dot {
  height: 8px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all .4s;
}
.dot-active {
  width: 28px;
  background: #ffe300;
  box-shadow: 0 0 8px rgba(255,227,0,.65);
}
.dot-inactive {
  width: 8px;
  background: rgba(255,255,255,.25);
}
.dot-inactive:hover {
  background: rgba(255,255,255,.5);
}

/* ═══ TRANSITIONS ═══════════════════════════════════════════════ */
.reel-fade-enter-active {
  transition: opacity .4s ease, transform .4s ease;
}
.reel-fade-leave-active {
  transition: opacity .25s ease;
  position: absolute;
  inset: 0;
}
.reel-fade-enter-from {
  opacity: 0;
  transform: scale(1.04);
}
.reel-fade-leave-to {
  opacity: 0;
}

.txt-fade-enter-active {
  transition: opacity .35s ease, transform .35s ease;
}
.txt-fade-leave-active {
  transition: opacity .2s ease;
  position: absolute;
}
.txt-fade-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
.txt-fade-leave-to {
  opacity: 0;
}
</style>
