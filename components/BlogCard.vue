<template>
  <div class="glass-card rounded-3xl overflow-hidden group border border-white/10 flex flex-col justify-between h-full hover:border-brand-yellow/50 transition-all duration-300">
    <!-- Article Image Header -->
    <div class="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface">
      <img 
        :src="post.image" 
        :alt="post.title" 
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
      />

      <div class="absolute top-4 left-4 z-10">
        <span class="text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-brand-yellow text-black shadow-md">
          {{ post.category }}
        </span>
      </div>
    </div>

    <!-- Article Content -->
    <div class="p-6 flex flex-col justify-between flex-grow">
      <div>
        <!-- Clean Text Meta (Card icons removed as requested) -->
        <div class="flex items-center gap-2 text-xs text-brand-textMuted mb-2">
          <span>{{ post.date }}</span>
          <span>•</span>
          <span>{{ post.readTime }}</span>
        </div>

        <h3 class="font-display font-bold text-xl text-white group-hover:text-brand-yellow transition-colors duration-200 line-clamp-2">
          {{ post.title }}
        </h3>

        <p class="text-xs text-brand-textSec mt-2 leading-relaxed line-clamp-3">
          {{ post.excerpt }}
        </p>
      </div>

      <!-- Author & Read CTA -->
      <div class="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <img :src="post.author.avatar" :alt="post.author.name" class="w-7 h-7 rounded-full object-cover border border-white/20" />
          <span class="text-xs font-semibold text-white">{{ post.author.name }}</span>
        </div>

        <span class="text-xs font-bold text-brand-yellow group-hover:underline flex items-center gap-1">
          Read Article <ArrowUpRight class="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'

interface BlogPost {
  id: string | number
  title: string
  category: string
  excerpt: string
  date: string
  readTime: string
  image: string
  author: {
    name: string
    avatar: string
  }
}

defineProps<{
  post: BlogPost
}>()
</script>
