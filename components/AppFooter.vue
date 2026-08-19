<template>
  <footer class="bg-brand-dark pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
    <!-- Ambient background glow -->
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <!-- Brand & Mission Column -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-yellow to-amber-400 flex items-center justify-center font-extrabold text-black text-xl shadow-[0_0_15px_rgba(255,227,0,0.4)]">
              ⚡
            </div>
            <div class="flex flex-col">
              <span class="font-display font-extrabold text-2xl tracking-tight text-white">
                LEAVE IT ON US<span class="text-brand-yellow">.</span>
              </span>
              <span class="text-[10px] uppercase tracking-widest text-brand-textMuted font-bold -mt-1">
                CREATIVE MARKETING AGENCY
              </span>
            </div>
          </NuxtLink>

          <p class="text-brand-textSec text-sm leading-relaxed max-w-sm">
            Crafting creator-led original content, high-converting performance ads, talent strategy, and digital IP that commands attention and scales revenue. Leave it on us.
          </p>

          <div class="flex items-center gap-3">
            <a 
              v-for="social in socials" 
              :key="social.name" 
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-textSec hover:text-black hover:bg-brand-yellow hover:border-brand-yellow transition-all duration-200"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Navigation Links Column -->
        <div>
          <h4 class="text-xs uppercase tracking-widest text-brand-textMuted font-bold mb-5">Navigation</h4>
          <ul class="space-y-3 text-sm">
            <li v-for="link in pageLinks" :key="link.path">
              <NuxtLink :to="link.path" class="text-brand-textSec hover:text-brand-yellow transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services Links Column -->
        <div>
          <h4 class="text-xs uppercase tracking-widest text-brand-textMuted font-bold mb-5">Capabilities</h4>
          <ul class="space-y-3 text-sm text-brand-textSec">
            <li>Original Content & IP</li>
            <li>Socials & Performance</li>
            <li>Talent & Influencers</li>
            <li>Creator-Led Production</li>
            <li>Brand Strategy</li>
            <li>Viral Marketing</li>
          </ul>
        </div>

        <!-- Newsletter Signup Column -->
        <div>
          <h4 class="text-xs uppercase tracking-widest text-brand-textMuted font-bold mb-5">Subscribe to Playbooks</h4>
          <p class="text-xs text-brand-textSec mb-4">Get bi-weekly creator marketing insights & viral growth frameworks.</p>
          
          <form @submit.prevent="handleNewsletterSubmit" class="flex flex-col gap-2">
            <div class="relative">
              <input 
                v-model="emailInput"
                type="email" 
                placeholder="Enter your work email"
                required
                class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-brand-textMuted focus:outline-none focus:border-brand-yellow transition-colors"
              />
              <button 
                type="submit" 
                class="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-brand-yellow text-black font-bold text-xs hover:bg-brand-yellowHover transition-colors flex items-center justify-center"
              >
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
            <Transition enter-active-class="transition duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100">
              <p v-if="subscribed" class="text-xs text-brand-yellow font-medium mt-1">
                Subscribed successfully!
              </p>
            </Transition>
          </form>
        </div>
      </div>

      <!-- Watermark Headline -->
      <div class="border-t border-white/10 pt-12 pb-6 text-center select-none overflow-hidden">
        <h2 class="font-display font-black text-5xl sm:text-7xl md:text-9xl text-white/5 tracking-tighter hover:text-white/10 transition-colors duration-500 whitespace-nowrap">
          LEAVE IT ON US
        </h2>
      </div>

      <!-- Bottom Legal Row -->
      <div class="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-textMuted">
        <p>© {{ new Date().getFullYear() }} Leave It On Us Inc. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-white transition-colors">Security</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, Instagram, Linkedin, Youtube, Twitter } from 'lucide-vue-next'

const emailInput = ref('')
const subscribed = ref(false)

const handleNewsletterSubmit = () => {
  if (emailInput.value) {
    subscribed.value = true
    emailInput.value = ''
    setTimeout(() => {
      subscribed.value = false
    }, 4000)
  }
}

const pageLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Work', path: '/work' },
  { label: 'Clients', path: '/clients' },
  { label: 'Playbook Insights', path: '/blogs' },
  { label: 'Contact Us', path: '/contact-us' },
]

const socials = [
  { name: 'Instagram', icon: Instagram, url: '#' },
  { name: 'LinkedIn', icon: Linkedin, url: '#' },
  { name: 'YouTube', icon: Youtube, url: '#' },
  { name: 'X (Twitter)', icon: Twitter, url: '#' },
]
</script>
