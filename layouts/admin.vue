<template>
  <div class="admin-shell">
    <!-- Mobile Backdrop Overlay -->
    <transition name="fade">
      <div
        v-if="mobileMenuOpen"
        class="sidebar-backdrop"
        @click="mobileMenuOpen = false"
      ></div>
    </transition>

    <!-- Sidebar -->
    <AdminSidebar
      :collapsed="sidebarCollapsed"
      :mobile-open="mobileMenuOpen"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
      @close="mobileMenuOpen = false"
    />

    <!-- Main Content Area -->
    <div class="admin-main" :class="sidebarCollapsed ? 'admin-main--collapsed' : ''">
      <AdminTopBar @toggle-sidebar="handleToggleSidebar" />
      <div class="admin-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
import AdminTopBar from '~/components/admin/AdminTopBar.vue'

const route = useRoute()
const sidebarCollapsed = ref(false)
const mobileMenuOpen = ref(false)

const handleToggleSidebar = () => {
  if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
    mobileMenuOpen.value = !mobileMenuOpen.value
  } else {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
}

// Auto-close mobile drawer when switching routes
watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  color: #0f172a;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  position: relative;
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  z-index: 998;
}

.admin-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: #f8fafc;
  min-width: 0;
}

.admin-main--collapsed {
  margin-left: 72px;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  overflow-x: hidden;
  max-width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .admin-main {
    margin-left: 0 !important;
  }
  .admin-content {
    padding: 1.25rem 1rem;
  }
}

@media (max-width: 640px) {
  .admin-content {
    padding: 1rem 0.75rem;
  }
}
</style>
