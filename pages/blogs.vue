<template>
  <div class="pt-32 pb-24 overflow-hidden">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
      <span class="text-xs uppercase tracking-widest text-brand-yellow font-bold px-3.5 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 inline-block mb-6">
        MARKETING PLAYBOOKS & VIRAL RESEARCH
      </span>
      <h1 class="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6">
        Insights From The Frontlines of <br class="hidden sm:inline" />
        <span class="text-gradient-yellow italic font-serif font-normal">Short-Form Media Engineering.</span>
      </h1>
      <p class="text-base sm:text-lg text-brand-textSec max-w-2xl mx-auto">
        Deep dives into vertical video algorithms, Meta ad creative testing frameworks, and creator IP monetization strategies by Leave It On Us.
      </p>
    </section>

    <!-- Featured Post Hero Card -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div class="glass-card rounded-3xl overflow-hidden border border-brand-yellow/30 p-6 sm:p-10 relative group bg-gradient-to-br from-brand-card via-brand-surface to-brand-dark">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <!-- Clean Metadata Line without card icons -->
              <div class="flex items-center gap-3 text-xs mb-4">
                <span class="px-3 py-1 rounded-full bg-brand-yellow text-black font-extrabold uppercase tracking-wider text-[10px]">
                  TRENDING PLAYBOOK
                </span>
                <span class="text-brand-textMuted font-medium">August 14, 2026</span>
                <span class="text-brand-textMuted">•</span>
                <span class="text-brand-textMuted font-medium">8 min read</span>
              </div>

              <h2 class="font-display font-extrabold text-2xl sm:text-4xl text-white group-hover:text-brand-yellow transition-colors leading-tight">
                The 2026 Short-Form Video Framework: How Creators are Replacing Traditional Ad Agencies
              </h2>

              <p class="text-xs sm:text-sm text-brand-textSec mt-4 leading-relaxed">
                Traditional TV and billboard commercials are suffering from historic low engagement. In this breakdown, we examine how top brands use 3-second visual hooks, native audio sync, and fast-paced UGC reels to scale monthly ad revenue 4x faster than traditional agencies.
              </p>
            </div>

            <div class="flex items-center justify-between pt-6 border-t border-white/10">
              <div class="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" alt="Author" class="w-9 h-9 rounded-full object-cover border border-white/20" />
                <div>
                  <div class="text-xs font-bold text-white">Aarav Mehta</div>
                  <div class="text-[10px] text-brand-textMuted">Chief Creative Officer</div>
                </div>
              </div>

              <NuxtLink to="/contact-us" class="px-5 py-2.5 rounded-full bg-brand-yellow text-black font-bold text-xs hover:bg-brand-yellowHover transition-colors flex items-center gap-1.5">
                <span>Read Full Playbook</span>
                <ArrowUpRight class="w-4 h-4" />
              </NuxtLink>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="Featured Article" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Grid Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-10">
        <h3 class="font-display font-bold text-2xl text-white">Latest Playbooks & Articles</h3>
        <span class="text-xs text-brand-textMuted">Showing {{ articles.length }} articles</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard 
          v-for="post in articles" 
          :key="post.id" 
          :post="post" 
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import BlogCard from '~/components/BlogCard.vue'

const articles = [
  {
    id: 1,
    title: 'Why 3-Second Hook Rates Determine 80% of Meta Ad Conversion',
    category: 'Ad Strategy',
    excerpt: 'Analyzing 500+ ad creatives to uncover why visual movement in the first 120 frames dictates ROAS longevity.',
    date: 'August 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Rohan Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
    }
  },
  {
    id: 2,
    title: 'Building a Full-Time In-House TikTok Studio: Setup & Gear Breakdown',
    category: 'Production',
    excerpt: 'The exact cameras, vertical lighting rigs, and audio mics we use to shoot 700+ high-definition vertical reels every month.',
    date: 'August 04, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Maya Kapoor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    }
  },
  {
    id: 3,
    title: 'Creator Whitelisting: How to Run Paid Ads Through Influencer Accounts',
    category: 'Influencer Marketing',
    excerpt: 'Step-by-step guide to acquiring Meta Partnership ad access and driving 3x higher click-through rates.',
    date: 'July 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    author: {
      name: 'Kabir Sharma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
    }
  }
]
</script>
