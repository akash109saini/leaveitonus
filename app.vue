<template>
  <div class="min-h-screen bg-brand-dark text-white flex flex-col font-body selection:bg-brand-lime selection:text-black">
    <!-- Floating Header -->
    <AppHeader />

    <!-- Main View Routing -->
    <main class="flex-grow">
      <NuxtPage />
    </main>

    <!-- Multi-Column Footer -->
    <AppFooter />

    <!-- Global Accessible Video Modal -->
    <VideoModal />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import VideoModal from '~/components/VideoModal.vue'
</script>
