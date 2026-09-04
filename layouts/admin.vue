<template>
  <div class="admin-shell">
    <!-- Sidebar -->
    <AdminSidebar :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />

    <!-- Main Content Area -->
    <div class="admin-main" :class="sidebarCollapsed ? 'admin-main--collapsed' : ''">
      <AdminTopBar @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed" />
      <div class="admin-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminSidebar from '~/components/admin/AdminSidebar.vue'
import AdminTopBar from '~/components/admin/AdminTopBar.vue'

const sidebarCollapsed = ref(false)
</script>

<style scoped>
.admin-shell {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  color: #0f172a;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

.admin-main {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background: #f8fafc;
}

.admin-main--collapsed {
  margin-left: 72px;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .admin-main {
    margin-left: 0;
  }
}
</style>
