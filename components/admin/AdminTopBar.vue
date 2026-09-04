<template>
  <header class="admin-topbar">
    <div class="topbar-left">
      <button class="hamburger" @click="$emit('toggle-sidebar')" title="Toggle Sidebar">
        <span></span><span></span><span></span>
      </button>
      <div class="breadcrumb">
        <NuxtLink to="/admin" class="bc-home">Admin</NuxtLink>
        <span v-for="(crumb, i) in breadcrumbs" :key="i" class="bc-item">
          <span class="bc-sep">/</span>
          <span :class="i === breadcrumbs.length - 1 ? 'bc-current' : 'bc-link'">{{ crumb }}</span>
        </span>
      </div>
    </div>
    <div class="topbar-right">
      <NuxtLink to="/" target="_blank" class="view-site-btn">
        <span>🌐</span> View Public Site
      </NuxtLink>
      <button class="logout-btn" @click="logout">
        <span>⎋</span> Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()

const breadcrumbs = computed(() => {
  const parts = route.path.split('/').filter(Boolean).slice(1)
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '))
})

const logout = () => {
  if (import.meta.client) sessionStorage.removeItem('admin_auth')
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-topbar {
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

.topbar-left { display: flex; align-items: center; gap: 16px; }

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: #64748b;
  border-radius: 2px;
  transition: background 0.2s;
}
.hamburger:hover span { background: #0284c7; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.bc-home {
  color: #0284c7;
  text-decoration: none;
  font-weight: 700;
}

.bc-sep { color: #cbd5e1; margin: 0 2px; }
.bc-current { color: #0f172a; font-weight: 600; }
.bc-link { color: #64748b; }

.topbar-right { display: flex; align-items: center; gap: 10px; }

.view-site-btn, .logout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.view-site-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
}
.view-site-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: #cbd5e1;
}

.logout-btn {
  background: #fef2f2;
  border: 1px solid #fee2e2;
  color: #ef4444;
}
.logout-btn:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
}
</style>
