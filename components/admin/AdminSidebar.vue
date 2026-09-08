<template>
  <aside
    class="admin-sidebar"
    :class="{
      'admin-sidebar--collapsed': collapsed,
      'admin-sidebar--mobile-open': mobileOpen
    }"
  >
    <!-- Logo -->
    <div class="sidebar-logo">
      <NuxtLink to="/admin" class="logo-link" @click="handleNavClick">
        <img
          v-if="!collapsed || mobileOpen"
          src="/images/logo-black.png"
          alt="Leave It On Us Admin"
          class="sidebar-logo-full"
        />
        <div v-else class="sidebar-logo-icon-wrap" title="Leave It On Us">
          <img
            src="/images/logo-black.png"
            alt="US"
            class="sidebar-logo-icon-crop"
          />
        </div>
      </NuxtLink>
      <button class="mobile-sidebar-close" @click="$emit('close')" title="Close menu" aria-label="Close menu">
        ✕
      </button>
    </div>

    <!-- Admin Badge -->
    <transition name="fade-text">
      <div v-if="!collapsed || mobileOpen" class="sidebar-badge">ADMIN PORTAL</div>
    </transition>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <div class="nav-section-label" v-if="!collapsed || mobileOpen">Overview</div>
      <NuxtLink to="/admin" class="nav-item" :class="{ active: route.path === '/admin' }" :title="collapsed && !mobileOpen ? 'Dashboard' : ''" @click="handleNavClick">
        <span class="nav-icon">📊</span>
        <transition name="fade-text"><span v-if="!collapsed || mobileOpen">Dashboard</span></transition>
      </NuxtLink>

      <div class="nav-section-label" v-if="!collapsed || mobileOpen">Content & Media</div>
      <NuxtLink to="/admin/blogs" class="nav-item" :class="{ active: route.path.startsWith('/admin/blogs') }" :title="collapsed && !mobileOpen ? 'Blogs' : ''" @click="handleNavClick">
        <span class="nav-icon">✍️</span>
        <transition name="fade-text"><span v-if="!collapsed || mobileOpen">Blog Management</span></transition>
      </NuxtLink>

      <div class="nav-section-label" v-if="!collapsed || mobileOpen">Business & Sales</div>
      <NuxtLink to="/admin/quotations" class="nav-item" :class="{ active: route.path.startsWith('/admin/quotations') }" :title="collapsed && !mobileOpen ? 'Quotations' : ''" @click="handleNavClick">
        <span class="nav-icon">📋</span>
        <transition name="fade-text"><span v-if="!collapsed || mobileOpen">Quotation Management</span></transition>
      </NuxtLink>

      <NuxtLink to="/admin/services" class="nav-item" :class="{ active: route.path.startsWith('/admin/services') }" :title="collapsed && !mobileOpen ? 'Services' : ''" @click="handleNavClick">
        <span class="nav-icon">⚡</span>
        <transition name="fade-text"><span v-if="!collapsed || mobileOpen">Services Catalog</span></transition>
      </NuxtLink>

      <NuxtLink to="/admin/enquiries" class="nav-item" :class="{ active: route.path.startsWith('/admin/enquiries') }" :title="collapsed && !mobileOpen ? 'Enquiries' : ''" @click="handleNavClick">
        <span class="nav-icon">📩</span>
        <transition name="fade-text">
          <span v-if="!collapsed || mobileOpen" class="nav-label-wrap">
            Enquiries
            <span v-if="newEnquiryCount > 0" class="nav-badge">{{ newEnquiryCount }}</span>
          </span>
        </transition>
        <span v-if="collapsed && !mobileOpen && newEnquiryCount > 0" class="nav-badge nav-badge--dot"></span>
      </NuxtLink>

      <div class="nav-section-label" v-if="!collapsed || mobileOpen">Settings & Optimization</div>
      <NuxtLink to="/admin/seo" class="nav-item" :class="{ active: route.path.startsWith('/admin/seo') }" :title="collapsed && !mobileOpen ? 'SEO' : ''" @click="handleNavClick">
        <span class="nav-icon">🔍</span>
        <transition name="fade-text"><span v-if="!collapsed || mobileOpen">SEO Management</span></transition>
      </NuxtLink>
    </nav>

    <!-- Toggle Button (Desktop only) -->
    <button class="sidebar-toggle" @click="$emit('toggle')" :title="collapsed ? 'Expand' : 'Collapse'">
      <span :style="{ transform: collapsed ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.3s' }">‹</span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useEnquiries } from '~/composables/useEnquiries'

defineProps<{
  collapsed: boolean
  mobileOpen?: boolean
}>()

const emit = defineEmits(['toggle', 'close'])

const route = useRoute()
const { getNewCount } = useEnquiries()
const newEnquiryCount = computed(() => getNewCount())

const handleNavClick = () => {
  emit('close')
}
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  box-shadow: 1px 0 3px 0 rgba(0, 0, 0, 0.02);
}

.admin-sidebar--collapsed {
  width: 72px;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 16px;
  border-bottom: 1px solid #f1f5f9;
  min-height: 72px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex: 1;
}

.sidebar-logo-full {
  height: 38px;
  max-width: 180px;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.sidebar-logo-full:hover {
  transform: scale(1.02);
}

.sidebar-logo-icon-wrap {
  width: 40px;
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
}

.sidebar-logo-icon-crop {
  height: 40px;
  max-width: none;
  object-fit: cover;
  object-position: left center;
}

.mobile-sidebar-close {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.mobile-sidebar-close:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #ef4444;
}

.sidebar-badge {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #0284c7;
  background: #f0f9ff;
  border: 1px solid #e0f2fe;
  border-radius: 6px;
  padding: 4px 10px;
  margin: 10px 16px 4px;
  white-space: nowrap;
  text-align: center;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 0;
}

.nav-section-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #94a3b8;
  padding: 16px 20px 6px;
  text-transform: uppercase;
  white-space: nowrap;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 16px;
  margin: 3px 10px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  text-decoration: none;
  transition: all 0.18s ease;
  white-space: nowrap;
  position: relative;
}

.nav-item:hover {
  background: #f8fafc;
  color: #0f172a;
}

.nav-item.active {
  background: #f0f9ff;
  color: #0284c7;
  border: 1px solid #bae6fd;
  font-weight: 700;
}

.nav-icon {
  font-size: 16px;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.nav-label-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-badge {
  background: #0284c7;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 99px;
  min-width: 18px;
  text-align: center;
}

.nav-badge--dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  min-width: 8px;
  padding: 0;
  border-radius: 50%;
}

.sidebar-toggle {
  padding: 14px;
  background: none;
  border: none;
  border-top: 1px solid #f1f5f9;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.sidebar-toggle:hover { color: #0284c7; }

.fade-text-enter-active, .fade-text-leave-active { transition: opacity 0.2s, width 0.2s; }
.fade-text-enter-from, .fade-text-leave-to { opacity: 0; }

@media (max-width: 1024px) {
  .admin-sidebar {
    width: 280px !important;
    max-width: 85vw !important;
    transform: translateX(-100%);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .admin-sidebar.admin-sidebar--mobile-open {
    transform: translateX(0);
  }
  .sidebar-toggle {
    display: none;
  }
  .mobile-sidebar-close {
    display: flex;
  }
}
</style>
