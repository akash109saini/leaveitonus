<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Admin Dashboard</h1>
        <p class="page-desc">Overview of your website content, quotations, and client enquiries.</p>
      </div>
      <div class="header-date">{{ currentDate }}</div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon-wrap" :class="stat.iconBg">
          <span class="stat-icon">{{ stat.icon }}</span>
        </div>
        <div class="stat-body">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
        <NuxtLink :to="stat.link" class="stat-link">View →</NuxtLink>
      </div>
    </div>

    <!-- Quick Access Modules -->
    <h2 class="section-title">Quick Actions</h2>
    <div class="modules-grid">
      <NuxtLink to="/admin/quotations/new" class="module-card">
        <div class="module-icon-wrap bg-blue-50 text-sky-600">📋</div>
        <div class="module-info">
          <div class="module-name">Create Quotation</div>
          <div class="module-desc">Generate quotation matching sample format</div>
        </div>
        <span class="module-arrow">→</span>
      </NuxtLink>
      <NuxtLink to="/admin/blogs/new" class="module-card">
        <div class="module-icon-wrap bg-emerald-50 text-emerald-600">✍️</div>
        <div class="module-info">
          <div class="module-name">New Blog Post</div>
          <div class="module-desc">Write and publish an article</div>
        </div>
        <span class="module-arrow">→</span>
      </NuxtLink>
      <NuxtLink to="/admin/enquiries" class="module-card">
        <div class="module-icon-wrap bg-amber-50 text-amber-600">📩</div>
        <div class="module-info">
          <div class="module-name">Client Enquiries</div>
          <div class="module-desc">{{ newEnquiries }} new enquiry waiting</div>
        </div>
        <span class="module-arrow">→</span>
      </NuxtLink>
      <NuxtLink to="/admin/seo" class="module-card">
        <div class="module-icon-wrap bg-indigo-50 text-indigo-600">🔍</div>
        <div class="module-info">
          <div class="module-name">SEO Settings</div>
          <div class="module-desc">Manage page meta &amp; OG tags</div>
        </div>
        <span class="module-arrow">→</span>
      </NuxtLink>
    </div>

    <!-- Recent Enquiries -->
    <div class="section-header-row">
      <h2 class="section-title" style="margin-bottom: 0;">Recent Enquiries</h2>
      <NuxtLink to="/admin/enquiries" class="view-all-link">View all ({{ enquiries.length }}) →</NuxtLink>
    </div>
    <div class="recent-list" v-if="recentEnquiries.length">
      <div class="recent-item" v-for="enq in recentEnquiries" :key="enq.id">
        <div class="recent-avatar">{{ enq.name.charAt(0).toUpperCase() }}</div>
        <div class="recent-info">
          <div class="recent-name">{{ enq.name }}</div>
          <div class="recent-meta">{{ enq.email }} · {{ enq.services?.join(', ') || 'General Enquiry' }}</div>
        </div>
        <AdminStatusBadge :status="enq.status" />
        <NuxtLink :to="`/admin/enquiries`" class="recent-btn">Review</NuxtLink>
      </div>
    </div>
    <div v-else class="empty-state">No enquiries yet. Client submissions from the website will appear here.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AdminStatusBadge from '~/components/admin/AdminStatusBadge.vue'
import { useBlogs } from '~/composables/useBlogs'
import { useQuotations } from '~/composables/useQuotations'
import { useEnquiries } from '~/composables/useEnquiries'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { getBlogs } = useBlogs()
const { getQuotations } = useQuotations()
const { getEnquiries, getNewCount } = useEnquiries()

const blogs = computed(() => getBlogs())
const quotations = computed(() => getQuotations())
const enquiries = computed(() => getEnquiries())
const newEnquiries = computed(() => getNewCount())
const recentEnquiries = computed(() => enquiries.value.slice(0, 5))

const currentDate = computed(() =>
  new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
)

const stats = computed(() => [
  { icon: '📋', label: 'Quotations', value: quotations.value.length, link: '/admin/quotations', iconBg: 'bg-sky-50 text-sky-600' },
  { icon: '✍️', label: 'Total Blogs', value: blogs.value.length, link: '/admin/blogs', iconBg: 'bg-emerald-50 text-emerald-600' },
  { icon: '📩', label: 'Total Enquiries', value: enquiries.value.length, link: '/admin/enquiries', iconBg: 'bg-amber-50 text-amber-600' },
  { icon: '⚡', label: 'New Enquiries', value: newEnquiries.value, link: '/admin/enquiries', iconBg: 'bg-rose-50 text-rose-600' },
])
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
}

.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
}

.page-desc { font-size: 13.5px; color: #64748b; margin-top: 4px; }
.header-date { font-size: 12.5px; color: #64748b; font-weight: 500; margin-top: 6px; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
}

.stat-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
}

.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.stat-body { flex: 1; }
.stat-value {
  font-family: 'Syne', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
}
.stat-label { font-size: 12px; font-weight: 600; color: #64748b; margin-top: 4px; }

.stat-link {
  font-size: 12px;
  font-weight: 700;
  color: #0284c7;
  text-decoration: none;
  transition: color 0.2s;
}
.stat-link:hover { color: #0369a1; }

.section-title {
  font-family: 'Syne', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 14px;
}

.section-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 14px;
}

.view-all-link {
  font-size: 12.5px;
  font-weight: 700;
  color: #0284c7;
  text-decoration: none;
}
.view-all-link:hover { text-decoration: underline; }

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 14px;
}

.module-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 18px 20px;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);
}

.module-card:hover {
  border-color: #bae6fd;
  background: #f0f9ff;
}

.module-icon-wrap {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.module-info { flex: 1; }
.module-name { font-size: 13.5px; font-weight: 700; color: #0f172a; }
.module-desc { font-size: 12px; color: #64748b; margin-top: 2px; }
.module-arrow { color: #94a3b8; font-size: 16px; transition: all 0.2s; }
.module-card:hover .module-arrow { color: #0284c7; transform: translateX(3px); }

.recent-list {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border-bottom: 1px solid #f1f5f9;
}
.recent-item:last-child { border-bottom: none; }

.recent-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e0f2fe;
  color: #0369a1;
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.recent-info { flex: 1; }
.recent-name { font-size: 13.5px; font-weight: 700; color: #0f172a; }
.recent-meta { font-size: 12px; color: #64748b; margin-top: 2px; }

.recent-btn {
  font-size: 12px;
  font-weight: 700;
  color: #0284c7;
  text-decoration: none;
  padding: 6px 12px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 6px;
  transition: all 0.2s;
}
.recent-btn:hover { background: #e0f2fe; }

.empty-state {
  padding: 32px;
  text-align: center;
  color: #64748b;
  font-size: 13px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}
</style>
