<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section with Background Video Loop -->
    <VideoHero />

    <!-- ★ Client Logo Marquee — right after hero, matching screenshot 3 -->
    <ClientLogoMarquee />

    <!-- ★ Instagram Reels Video Showcase — after logo header -->
    <InstagramReels />

    <!-- Services Showcase Section (Interactive Tabs) -->
    <section class="py-24 bg-brand-dark relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.15)]">
              OUR CORE CAPABILITIES
            </span>
            <h2 class="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
              Integrated Media &amp; <span class="text-gradient-yellow">Production Engine</span>
            </h2>
          </div>
          <p class="text-sm text-brand-textSec max-w-md">
            From viral original series to performance ad funnels, <span class="text-brand-yellow font-bold">Leave It On Us</span> owns every step of the content value chain.
          </p>
        </div>

        <!-- Interactive Service Tabs Header -->
        <div class="flex flex-wrap items-center gap-2 mb-10 p-2 glass-panel rounded-2xl w-fit border-brand-yellow/20">
          <button 
            v-for="(service, index) in services" 
            :key="service.id"
            @click="activeServiceIndex = index"
            class="px-5 py-3 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-2"
            :class="activeServiceIndex === index ? 'bg-brand-yellow text-black shadow-[0_0_20px_rgba(255,227,0,0.45)] scale-105' : 'text-brand-textSec hover:text-white hover:bg-white/5'"
          >
            <span>{{ service.title }}</span>
          </button>
        </div>

        <!-- Active Service Showcase Card with #FFE300 Highlight Border -->
        <div class="glass-card p-8 sm:p-12 rounded-3xl border border-brand-yellow/30 relative overflow-hidden shadow-[0_0_30px_rgba(255,227,0,0.1)]">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div class="lg:col-span-7 flex flex-col gap-6">
              <div class="inline-flex items-center gap-2 text-xs font-extrabold text-brand-yellow uppercase tracking-widest bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/20 w-fit">
                {{ services[activeServiceIndex].subtitle }}
              </div>

              <h3 class="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                {{ services[activeServiceIndex].headline }}
              </h3>

              <p class="text-sm sm:text-base text-brand-textSec leading-relaxed">
                {{ services[activeServiceIndex].description }}
              </p>

              <!-- Feature Bullet Points -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div 
                  v-for="(feature, fIdx) in services[activeServiceIndex].features" 
                  :key="fIdx"
                  class="flex items-start gap-2.5"
                >
                  <span class="w-2.5 h-2.5 rounded-full bg-brand-yellow shrink-0 mt-1.5 shadow-[0_0_8px_#FFE300]"></span>
                  <span class="text-xs font-semibold text-white">{{ feature }}</span>
                </div>
              </div>

              <div class="pt-4">
                <NuxtLink 
                  to="/contact-us" 
                  class="btn-yellow-primary"
                >
                  <span>Request Service Strategy</span>
                  <ArrowRight class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>

            <!-- Visual Showcase Side -->
            <div class="lg:col-span-5 relative">
              <div class="aspect-[4/3] rounded-2xl overflow-hidden border border-brand-yellow/30 relative group shadow-2xl">
                <img 
                  :src="services[activeServiceIndex].image" 
                  :alt="services[activeServiceIndex].title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent"></div>
                <div class="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-brand-yellow/40">
                  <div class="text-xs font-bold text-white mb-1">Key Impact Outcome:</div>
                  <div class="text-sm font-extrabold text-brand-yellow text-yellow-glow">{{ services[activeServiceIndex].outcome }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Work Portfolio Showcase -->
    <section class="py-24 bg-brand-surface relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span class="text-xs uppercase tracking-widest text-brand-yellow font-extrabold px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 shadow-[0_0_15px_rgba(255,227,0,0.15)]">
              FEATURED CAMPAIGNS
            </span>
            <h2 class="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
              Work That <span class="text-gradient-yellow">Broke The Internet</span>
            </h2>
          </div>
          <NuxtLink 
            to="/work" 
            class="inline-flex items-center gap-2 text-xs font-extrabold text-brand-yellow hover:underline"
          >
            <span>View Full Portfolio</span>
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WorkCard 
            v-for="item in featuredWork" 
            :key="item.id" 
            :item="item" 
          />
        </div>
      </div>
    </section>

    <!-- ★ "We're Building Something Worth Being Part Of" section (exact match of screenshot 4) -->
    <WereBuildingSection />

    <!-- High-Energy CTA Banner Section -->
    <section class="py-24 bg-brand-dark relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="glass-card p-10 sm:p-16 rounded-3xl border border-brand-yellow/50 relative overflow-hidden bg-gradient-to-r from-brand-card via-brand-surface to-brand-dark text-center shadow-[0_0_40px_rgba(255,227,0,0.2)]">
          <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-yellow/25 rounded-full blur-3xl pointer-events-none"></div>
          
          <span class="text-xs font-extrabold uppercase tracking-widest text-brand-yellow px-4 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 inline-block mb-4 shadow-[0_0_15px_rgba(255,227,0,0.2)]">
            LET'S MAKE HISTORY
          </span>

          <h2 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white max-w-3xl mx-auto leading-tight mb-6">
            Ready to Build a <span class="text-gradient-yellow">High-Converting</span> Creator Engine?
          </h2>

          <p class="text-sm sm:text-base text-brand-textSec max-w-xl mx-auto mb-10">
            Partner with <span class="text-brand-yellow font-bold">Leave It On Us</span> to turn views into revenue, audience into community, and content into market dominance.
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink 
              to="/contact-us" 
              class="btn-yellow-primary w-full sm:w-auto text-sm px-10 py-4"
            >
              <span>Launch Your Campaign</span>
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink 
              to="/clients" 
              class="btn-glass-secondary w-full sm:w-auto text-sm px-10 py-4"
            >
              See Client Results
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import VideoHero from '~/components/VideoHero.vue'
import MetricsCounter from '~/components/MetricsCounter.vue'
import ClientLogoMarquee from '~/components/ClientLogoMarquee.vue'
import WorkCard from '~/components/WorkCard.vue'
import WereBuildingSection from '~/components/WereBuildingSection.vue'
import InstagramReels from '~/components/InstagramReels.vue'

const activeServiceIndex = ref(0)

const services = [
  {
    id: 'originals',
    title: 'Content Creation & IP',
    subtitle: 'Original Shorts & Web Series',
    headline: 'High-Retention Short-Form & YouTube Intellectual Property',
    description: 'We don\'t create generic ads. We write, film, and produce serialized content, comedic sketches, and documentary-style IP that viewers actually choose to watch.',
    features: [
      'Scripting & Hook Optimization',
      'In-House Cinematic Production',
      '4K Vertical Studio & On-Location Shoot',
      'Data-Backed Editing & Pacing'
    ],
    outcome: 'Average 84% Retention & 4.2x Organic Shares',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'socials',
    title: 'Socials & Performance',
    subtitle: 'Growth & Paid Acquisition',
    headline: 'Full-Funnel Social Media Management & Media Buying',
    description: 'Turn organic social viral hits into predictable revenue funnels. We manage end-to-end brand channels and run data-driven Meta, TikTok, and YouTube ad campaigns.',
    features: [
      'Daily Reel/Shorts Publishing',
      'Paid Ad Creative Iterations (10+ variations/wk)',
      'Community Management & Growth Hacks',
      'ROAS-Optimized Media Buying'
    ],
    outcome: '+340% ROAS Improvement in 60 Days',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'talents',
    title: 'Talent & Influencer',
    subtitle: 'Creator Network Scale',
    headline: 'High-Converting Influencer & Creator Marketing',
    description: 'Access our roster of 1,500+ vetted creators, macro-influencers, and niche content leads. We handle contract negotiation, script briefs, and campaign tracking.',
    features: [
      'Creator Sourcing & Vetting',
      'Direct Scripting & Brand Guidance',
      'Usage Rights & Whitelisting Ads',
      'Real-Time Impression Tracking'
    ],
    outcome: '22M+ Combined Impressions per Campaign',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'production',
    title: 'Brand Production',
    subtitle: 'TV Commercials & Stunts',
    headline: 'Large-Scale Commercials & Guerilla Marketing Stunts',
    description: 'When your brand needs high-production value commercials or viral real-world guerrilla activations, our filmmaking division brings cinematic storytelling to life.',
    features: [
      'Concepting & Storyboarding',
      'Celebrity & Director Talent Match',
      'VFX, Color Grading & Sound Mix',
      'Global Distribution Strategy'
    ],
    outcome: 'Gold Award Winner for Creative Storytelling',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop'
  }
]

const featuredWork = [
  {
    id: 1,
    title: 'How Spotify Dominated Gen-Z Audio Culture with Short Reels',
    client: 'Spotify',
    category: 'Originals',
    metric: '42M+ Views',
    description: 'Produced 45 vertical sketch reels showcasing playlist culture, generating 3.4M organic saves and 180k shares.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Samsung Galaxy Z Flip Viral Creator Unboxing Stunt',
    client: 'Samsung',
    category: 'Influencer Marketing',
    metric: '+480% Pre-Orders',
    description: 'Engineered a 10-creator hidden camera unboxing prank series that trended #1 on YouTube Shorts.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Gymshark High-Performance UGC Ad Funnel Strategy',
    client: 'Gymshark',
    category: 'Socials & Performance',
    metric: '4.8x ROAS',
    description: 'Tested 120+ video hook variations across TikTok & Meta Ads, scaling monthly ad spend by $1.2M profitably.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
  }
]
</script>
