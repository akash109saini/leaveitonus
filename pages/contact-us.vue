<template>
  <div class="pt-32 pb-24 overflow-hidden">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
      <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.2)] inline-block mb-6">
        START A PROJECT WITH LEAVE IT ON US
      </span>
      <h1 class="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6">
        Let's Build Something <br class="hidden sm:inline" />
        <span class="text-gradient-yellow italic font-serif font-normal">Impactful Together.</span>
      </h1>
      <p class="text-base sm:text-lg text-brand-textSec max-w-2xl mx-auto">
        Ready to scale your brand’s content ecosystem? Fill out the brief below and our team will get back to you within 24 hours. <span class="text-brand-yellow font-bold">Leave it on us.</span>
      </p>
    </section>

    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Interactive Lead Brief Form with #FFE300 Highlight Border -->
        <div class="lg:col-span-8 glass-card p-8 sm:p-12 rounded-3xl border border-brand-yellow/30 relative shadow-[0_0_30px_rgba(255,227,0,0.1)]">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Basic Details Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Full Name *</span>
                  <span class="text-[10px] text-brand-yellow">REQUIRED</span>
                </label>
                <input 
                  v-model="form.name"
                  type="text" 
                  required
                  placeholder="e.g. Alex Morgan"
                  class="w-full bg-brand-dark/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-brand-textMuted focus:outline-none focus:border-brand-yellow transition-colors"
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Work Email *</span>
                  <span class="text-[10px] text-brand-yellow">REQUIRED</span>
                </label>
                <input 
                  v-model="form.email"
                  type="email" 
                  required
                  placeholder="alex@company.com"
                  class="w-full bg-brand-dark/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-brand-textMuted focus:outline-none focus:border-brand-yellow transition-colors"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold text-white uppercase tracking-wider">Company Name & Website</label>
              <input 
                v-model="form.company"
                type="text" 
                placeholder="e.g. Acme Brands (acme.com)"
                class="w-full bg-brand-dark/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-brand-textMuted focus:outline-none focus:border-brand-yellow transition-colors"
              />
            </div>

            <!-- Multi-Select Service Pills -->
            <div class="space-y-3">
              <label class="text-xs font-bold text-white uppercase tracking-wider block">
                Services Required (Select all that apply)
              </label>
              <div class="flex flex-wrap gap-2.5">
                <button 
                  v-for="service in serviceOptions" 
                  :key="service"
                  type="button"
                  @click="toggleService(service)"
                  class="px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 border"
                  :class="selectedServices.includes(service) ? 'bg-brand-yellow text-black border-brand-yellow shadow-[0_0_15px_rgba(255,227,0,0.4)]' : 'bg-white/5 text-brand-textSec border-white/10 hover:border-brand-yellow/40 hover:text-white'"
                >
                  <span v-if="selectedServices.includes(service)" class="text-xs font-black">✓</span>
                  <span>{{ service }}</span>
                </button>
              </div>
            </div>

            <!-- Budget Range Selector -->
            <div class="space-y-3">
              <label class="text-xs font-bold text-white uppercase tracking-wider block">
                Estimated Monthly Budget
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button 
                  v-for="range in budgetRanges" 
                  :key="range"
                  type="button"
                  @click="selectedBudget = range"
                  class="py-3 px-3 rounded-xl text-xs font-bold transition-all duration-200 border text-center"
                  :class="selectedBudget === range ? 'bg-brand-yellow text-black border-brand-yellow shadow-[0_0_15px_rgba(255,227,0,0.4)]' : 'bg-white/5 text-brand-textSec border-white/10 hover:border-brand-yellow/40 hover:text-white'"
                >
                  {{ range }}
                </button>
              </div>
            </div>

            <!-- Project Details Message -->
            <div class="space-y-2">
              <label class="text-xs font-bold text-white uppercase tracking-wider">Project Scope & Goals</label>
              <textarea 
                v-model="form.message"
                rows="4"
                placeholder="Tell us about your brand goals, target timeline, or current marketing bottlenecks..."
                class="w-full bg-brand-dark/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-brand-textMuted focus:outline-none focus:border-brand-yellow transition-colors resize-none"
              ></textarea>
            </div>

            <!-- Submit Button with Glowing Yellow Shadow -->
            <div>
              <button 
                type="submit" 
                :disabled="isSubmitting || isSubmitted"
                class="w-full py-4.5 rounded-xl bg-brand-yellow text-black font-black text-sm hover:bg-brand-yellowHover shadow-[0_0_35px_rgba(255,227,0,0.55)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75"
              >
                <template v-if="isSubmitting">
                  <Loader2 class="w-5 h-5 animate-spin" />
                  <span>Submitting Strategy Brief...</span>
                </template>
                <template v-else-if="isSubmitted">
                  <CheckCircle2 class="w-5 h-5" />
                  <span>Brief Received! We'll Reach Out Shortly.</span>
                </template>
                <template v-else>
                  <span>Submit Project Brief</span>
                  <Send class="w-4 h-4" />
                </template>
              </button>
            </div>
          </form>

          <!-- Success Alert Banner -->
          <Transition enter-active-class="transition duration-300" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100">
            <div v-if="isSubmitted" class="mt-6 p-4 rounded-2xl bg-brand-yellow/15 border border-brand-yellow text-brand-yellow flex items-center gap-3 text-xs font-bold shadow-[0_0_20px_rgba(255,227,0,0.2)]">
              <CheckCircle2 class="w-5 h-5 shrink-0" />
              <span>Thank you! Your project request has been logged. An executive creative director from Leave It On Us will email you within 24 hours to schedule a strategy call.</span>
            </div>
          </Transition>
        </div>

        <!-- Office Info & Direct Contact Column -->
        <div class="lg:col-span-4 space-y-6">
          <div class="glass-card p-8 rounded-3xl border border-white/10 card-yellow-top space-y-6">
            <h3 class="font-display font-bold text-xl text-white">Direct Agency Contact</h3>

            <div class="space-y-4 text-xs text-brand-textSec">
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow shrink-0">
                  <Mail class="w-4 h-4" />
                </div>
                <div>
                  <div class="text-white font-bold mb-0.5">Email Us</div>
                  <a href="mailto:hello@leaveitonus.in" class="text-brand-yellow hover:underline font-semibold">hello@leaveitonus.in</a>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow shrink-0">
                  <Phone class="w-4 h-4" />
                </div>
                <div>
                  <div class="text-white font-bold mb-0.5">Call Direct</div>
                  <a href="tel:+919876543210" class="text-brand-yellow hover:underline font-semibold">+91 98765 43210</a>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow shrink-0">
                  <MapPin class="w-4 h-4" />
                </div>
                <div>
                  <div class="text-white font-bold mb-0.5">Headquarters</div>
                  <p class="text-brand-textMuted leading-relaxed">
                    Leave It On Us Studio Hub<br />
                    Bandra West, Mumbai, MH 400050
                  </p>
                </div>
              </div>
            </div>

            <!-- Timezone Indicator -->
            <div class="p-4 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-between text-xs">
              <span class="text-brand-textMuted font-medium">Agency Timezone:</span>
              <span class="text-brand-yellow font-extrabold text-yellow-glow">IST (UTC+5:30) • Active Now</span>
            </div>
          </div>

          <!-- Quick Social Handles Card -->
          <div class="glass-card p-6 rounded-3xl border border-white/10">
            <h4 class="text-xs uppercase font-bold tracking-wider text-brand-textMuted mb-4">Follow Our Media Lab</h4>
            <div class="grid grid-cols-2 gap-3">
              <a href="#" class="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-yellow/60 hover:bg-brand-yellow/10 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                <Instagram class="w-4 h-4 text-brand-yellow" /> Instagram
              </a>
              <a href="#" class="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-yellow/60 hover:bg-brand-yellow/10 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                <Linkedin class="w-4 h-4 text-brand-yellow" /> LinkedIn
              </a>
              <a href="#" class="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-yellow/60 hover:bg-brand-yellow/10 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                <Youtube class="w-4 h-4 text-brand-yellow" /> YouTube
              </a>
              <a href="#" class="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-yellow/60 hover:bg-brand-yellow/10 text-xs font-semibold text-white flex items-center gap-2 transition-all">
                <Twitter class="w-4 h-4 text-brand-yellow" /> X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Send, Loader2, CheckCircle2, Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Twitter } from 'lucide-vue-next'
import confetti from 'canvas-confetti'
import { useEnquiries } from '~/composables/useEnquiries'

const { createEnquiry } = useEnquiries()

const form = reactive({
  name: '',
  email: '',
  company: '',
  message: ''
})

const selectedServices = ref<string[]>(['Content Creation & IP', 'Socials & Performance'])
const selectedBudget = ref('$25k - $50k')
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const serviceOptions = [
  'Content Creation & IP',
  'Socials & Performance',
  'Influencer & Talent',
  'Brand Production & Ads',
  'Guerrilla Stunts'
]

const budgetRanges = [
  '$10k - $25k',
  '$25k - $50k',
  '$50k - $100k',
  '$100k+'
]

const toggleService = (service: string) => {
  if (selectedServices.value.includes(service)) {
    selectedServices.value = selectedServices.value.filter(s => s !== service)
  } else {
    selectedServices.value.push(service)
  }
}

const handleSubmit = () => {
  isSubmitting.value = true

  setTimeout(() => {
    isSubmitting.value = false
    isSubmitted.value = true

    // Save to admin enquiry system
    createEnquiry({
      name: form.name,
      email: form.email,
      phone: '',
      company: form.company,
      services: selectedServices.value,
      budget: selectedBudget.value,
      message: form.message
    })

    // Trigger vibrant yellow celebratory confetti!
    if (process.client) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFE300', '#FFFFFF', '#FFEB3B', '#F5E6C8']
      })
    }
  }, 1200)
}
</script>
