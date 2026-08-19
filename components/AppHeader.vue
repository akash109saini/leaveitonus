<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-10 py-4 transition-all duration-300 bg-[#0B0B0C]/80 backdrop-blur-md border-b border-white/5"
  >
    <div class="max-w-screen-xl mx-auto flex items-center justify-between gap-4 relative">

      <!-- ── LOGO (Left) ── matching Image 2: icon + two-line text -->
      <NuxtLink to="/" class="flex items-center gap-3 group shrink-0 min-w-[150px]">
        <!-- Cake slice SVG (white, same size as Image 2 logo icon) -->
        <div class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full group-hover:scale-105 transition-transform duration-300">
            <!-- Plate base -->
            <rect x="4" y="42" width="48" height="8" rx="3" fill="#FFE300"/>
            <!-- Cake body (slice) -->
            <path d="M8 42 L28 10 L48 42 Z" fill="#FFFFFF"/>
            <!-- Cake inner layer stripes -->
            <path d="M14 42 L28 18 L42 42 Z" fill="#E5E5E5" opacity="0.4"/>
            <!-- Cream dots on top -->
            <circle cx="28" cy="8"  r="3.5" fill="#FFE300"/>
            <circle cx="20" cy="13" r="2.5" fill="#FFE300"/>
            <circle cx="36" cy="13" r="2.5" fill="#FFE300"/>
          </svg>
        </div>
        <!-- Brand name: two lines like "cheesecake / digital" in Image 2 -->
        <div class="flex flex-col leading-tight">
          <span class="font-display font-black text-white text-lg sm:text-xl tracking-tight group-hover:text-brand-yellow transition-colors duration-200">
            leave it
          </span>
          <span class="font-display font-black text-white text-lg sm:text-xl tracking-tight -mt-1">
            on us
          </span>
        </div>
      </NuxtLink>

      <!-- ── CENTER NAV PILL (Desktop) ── matching Image 2: solid dark charcoal pill, larger font -->
      <nav class="hidden lg:flex items-center gap-0 px-2 py-2 rounded-full bg-[#1C1C1E] border border-white/10 shadow-xl absolute left-1/2 -translate-x-1/2">
        <NuxtLink
          v-for="link in navLinks.slice(0, -1)"
          :key="link.path"
          :to="link.path"
          class="px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-200"
          :class="route.path === link.path
            ? 'text-brand-yellow font-semibold'
            : 'text-white/85 hover:text-white hover:bg-white/8'"
        >
          {{ link.label }}
        </NuxtLink>
        <!-- Blogs last -->
        <NuxtLink
          to="/blogs"
          class="px-5 py-2 rounded-full text-[15px] font-medium transition-all duration-200"
          :class="route.path === '/blogs'
            ? 'text-brand-yellow font-semibold'
            : 'text-white/85 hover:text-white hover:bg-white/8'"
        >
          Blogs
        </NuxtLink>
      </nav>

      <!-- ── RIGHT CTA BUTTON (Desktop) ── matching Image 2: yellow, larger, rounded, uppercase -->
      <div class="hidden lg:flex items-center shrink-0 min-w-[150px] justify-end">
        <NuxtLink
          to="/contact-us"
          class="btn-yellow-nav text-[15px] font-black px-7 py-3 rounded-full"
        >
          LET'S TALK &nbsp;→
        </NuxtLink>
      </div>

      <!-- ── MOBILE HAMBURGER ── dark rounded square -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="lg:hidden w-11 h-11 rounded-xl bg-[#1C1C1E] flex items-center justify-center text-white border border-white/10 hover:bg-white/15 transition-all shadow-lg"
        aria-label="Toggle Navigation Menu"
      >
        <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6 text-brand-yellow" />
      </button>

    </div>

    <!-- ── MOBILE DRAWER ── -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden mt-3 mx-1 p-5 bg-[#1C1C1E] border border-white/10 rounded-2xl flex flex-col gap-1 shadow-2xl"
      >
        <NuxtLink
          v-for="link in allNavLinks"
          :key="link.path"
          :to="link.path"
          @click="isMobileMenuOpen = false"
          class="py-3.5 px-4 rounded-xl text-base font-medium transition-all flex items-center justify-between"
          :class="route.path === link.path
            ? 'text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/20'
            : 'text-white/85 hover:text-white hover:bg-white/6'"
        >
          <span>{{ link.label }}</span>
          <ChevronRight class="w-4 h-4 text-white/30" />
        </NuxtLink>

        <div class="mt-2 pt-2 border-t border-white/8">
          <NuxtLink
            to="/contact-us"
            @click="isMobileMenuOpen = false"
            class="btn-yellow-primary w-full"
          >
            LET'S TALK
            <ArrowRight class="w-4 h-4 stroke-[3]" />
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight, Menu, X, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Home',               path: '/'          },
  { label: 'Leave It Originals', path: '/work'      },
  { label: 'Leave It Socials',   path: '/clients'   },
  { label: 'Leave It Talents',   path: '/about'     },
]

const allNavLinks = [
  ...navLinks,
  { label: 'Blogs',   path: '/blogs'      },
  { label: 'Contact', path: '/contact-us' },
]
</script>

<style scoped>
/* Hover background for nav links (Tailwind doesn't have /8 opacity by default) */
.hover\:bg-white\/8:hover {
  background-color: rgba(255, 255, 255, 0.08);
}
.hover\:bg-white\/6:hover {
  background-color: rgba(255, 255, 255, 0.06);
}
</style>
