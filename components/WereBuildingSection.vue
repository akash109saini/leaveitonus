<template>
  <!-- Exact Recreation of "WE'RE BUILDING SOMETHING WORTH BEING PART OF." Section from Screenshot 4 -->
  <section class="relative py-32 sm:py-40 bg-[#0B0B0C] overflow-hidden">

    <!-- Floating Job Cards (4 corners — matching screenshot 4 exact positions & tilts) -->
    <!-- TOP-LEFT card (Video Editor, -8deg tilt) -->
    <div class="absolute left-0 top-10 sm:left-8 sm:top-14 lg:left-16 lg:top-20 z-10 pointer-events-none">
      <div class="job-card w-[200px] sm:w-[220px] p-5 rounded-2xl border border-white/10 shadow-2xl rotate-[-8deg] hover:rotate-0 transition-transform duration-500 pointer-events-auto">
        <!-- Yellow icon grid (matching screenshot) -->
        <div class="mb-4">
          <svg viewBox="0 0 48 28" width="48" height="28" fill="none">
            <circle cx="8"  cy="8"  r="4" fill="#FFE300" />
            <circle cx="24" cy="8"  r="4" fill="#FFE300" />
            <circle cx="40" cy="8"  r="4" fill="#FFE300" />
            <circle cx="8"  cy="22" r="4" fill="#FFE300" />
            <circle cx="24" cy="22" r="4" fill="#FFE300" />
            <circle cx="40" cy="22" r="4" fill="#FFE300" />
          </svg>
        </div>
        <div class="text-lg sm:text-xl font-extrabold text-white leading-tight mb-1">Video Editor</div>
        <div class="text-xs text-white/40 font-medium">Leave It On Us</div>
      </div>
    </div>

    <!-- TOP-RIGHT card (Creative Lead, +6deg tilt) -->
    <div class="absolute right-0 top-4 sm:right-8 sm:top-10 lg:right-16 lg:top-14 z-10 pointer-events-none">
      <div class="job-card w-[200px] sm:w-[220px] p-5 rounded-2xl border border-white/10 shadow-2xl rotate-[6deg] hover:rotate-0 transition-transform duration-500 pointer-events-auto">
        <div class="mb-4">
          <svg viewBox="0 0 48 28" width="48" height="28" fill="none">
            <circle cx="8"  cy="8"  r="4" fill="#FFE300" />
            <circle cx="24" cy="8"  r="4" fill="#FFE300" />
            <circle cx="40" cy="8"  r="4" fill="#FFE300" />
            <circle cx="8"  cy="22" r="4" fill="#FFE300" />
            <circle cx="24" cy="22" r="4" fill="#FFE300" />
            <circle cx="40" cy="22" r="4" fill="#FFE300" />
          </svg>
        </div>
        <div class="text-lg sm:text-xl font-extrabold text-white leading-tight mb-1">Creative Lead</div>
        <div class="text-xs text-white/40 font-medium">Leave It On Us</div>
      </div>
    </div>

    <!-- BOTTOM-LEFT card (Creative Director, +5deg tilt) -->
    <div class="absolute left-0 bottom-10 sm:left-8 sm:bottom-14 lg:left-16 lg:bottom-20 z-10 pointer-events-none">
      <div class="job-card w-[200px] sm:w-[220px] p-5 rounded-2xl border border-white/10 shadow-2xl rotate-[5deg] hover:rotate-0 transition-transform duration-500 pointer-events-auto">
        <div class="mb-4">
          <svg viewBox="0 0 48 28" width="48" height="28" fill="none">
            <circle cx="8"  cy="8"  r="4" fill="#FFE300" />
            <circle cx="24" cy="8"  r="4" fill="#FFE300" />
            <circle cx="40" cy="8"  r="4" fill="#FFE300" />
            <circle cx="8"  cy="22" r="4" fill="#FFE300" />
            <circle cx="24" cy="22" r="4" fill="#FFE300" />
            <circle cx="40" cy="22" r="4" fill="#FFE300" />
          </svg>
        </div>
        <div class="text-lg sm:text-xl font-extrabold text-white leading-tight mb-1">Creative Director</div>
        <div class="text-xs text-white/40 font-medium">Leave It On Us</div>
      </div>
    </div>

    <!-- BOTTOM-RIGHT card (Social Media Manager, -7deg tilt) -->
    <div class="absolute right-0 bottom-6 sm:right-8 sm:bottom-12 lg:right-16 lg:bottom-16 z-10 pointer-events-none">
      <div class="job-card w-[200px] sm:w-[220px] p-5 rounded-2xl border border-white/10 shadow-2xl rotate-[-7deg] hover:rotate-0 transition-transform duration-500 pointer-events-auto">
        <div class="mb-4">
          <svg viewBox="0 0 48 28" width="48" height="28" fill="none">
            <circle cx="8"  cy="8"  r="4" fill="#FFE300" />
            <circle cx="24" cy="8"  r="4" fill="#FFE300" />
            <circle cx="40" cy="8"  r="4" fill="#FFE300" />
            <circle cx="8"  cy="22" r="4" fill="#FFE300" />
            <circle cx="24" cy="22" r="4" fill="#FFE300" />
            <circle cx="40" cy="22" r="4" fill="#FFE300" />
          </svg>
        </div>
        <div class="text-lg sm:text-xl font-extrabold text-white leading-tight mb-1">Social Media Manager</div>
        <div class="text-xs text-white/40 font-medium">Leave It On Us</div>
      </div>
    </div>

    <!-- Centre Content (exact font sizes & color matching screenshot 4) -->
    <div class="relative z-20 max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-8">

      <!-- Main Headline: Bebas Neue / condensed bold -->
      <h2 class="font-condensed uppercase leading-[1.0] tracking-wide">
        <div class="text-[clamp(2.6rem,7vw,5rem)] text-white font-black">WE'RE BUILDING</div>
        <div class="text-[clamp(2.6rem,7vw,5rem)] text-brand-yellow font-black text-yellow-glow">SOMETHING WORTH</div>
        <div class="text-[clamp(2.6rem,7vw,5rem)] text-white font-black">BEING PART OF.</div>
      </h2>

      <!-- Subtext — small grey centered paragraph, matching screenshot -->
      <p class="text-sm sm:text-base text-white/55 leading-relaxed max-w-xl font-medium">
        Leave It On Us is for people who believe that creativity and craft still matter — and that AI is a tool, not a replacement. 
        If you're a creator, strategist, filmmaker, or builder who wants to do the best work of your career, we'd like to meet you.
      </p>

      <!-- CTA Button — solid yellow, large rounded, matching screenshot 4 bottom-right scroll button -->
      <NuxtLink 
        to="/contact-us"
        class="btn-yellow-primary mt-2"
      >
        <span>Join Our Team</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 flex-shrink-0">
          <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
        </svg>
      </NuxtLink>
    </div>

  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Dark gradient card — matching the screenshot's dark slate card style */
.job-card {
  background: linear-gradient(145deg, #1a1a1c 0%, #111113 100%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.06);
  cursor: default;
}
.job-card:hover {
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 227, 0, 0.2);
}
</style>
