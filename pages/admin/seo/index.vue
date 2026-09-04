<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">SEO Management</h1>
        <p class="page-desc">Manage meta tags, Open Graph cards, and search indexing for all public pages.</p>
      </div>
    </div>

    <div class="pages-grid">
      <NuxtLink
        v-for="page in pages"
        :key="page.pageKey"
        :to="`/admin/seo/${page.pageKey}`"
        class="page-card"
      >
        <div class="page-icon">{{ pageIcons[page.pageKey] || '📄' }}</div>
        <div class="page-info">
          <div class="page-name">{{ page.pageLabel }}</div>
          <div class="page-title-preview">{{ page.title }}</div>
          <div class="page-desc-preview">{{ page.metaDescription }}</div>
        </div>
        <div class="page-edit-btn">Configure →</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSeo, type PageSeo } from '~/composables/useSeo'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { getAllPages } = useSeo()
const pages = ref<PageSeo[]>([])

onMounted(() => { pages.value = getAllPages() })

const pageIcons: Record<string, string> = {
  home: '🏠', about: 'ℹ️', blogs: '✍️', clients: '🤝', work: '🎬', contact: '📩'
}
</script>

<style scoped>
.page-header { margin-bottom: 24px; }
.page-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; }
.page-desc { font-size: 13.5px; color: #64748b; margin-top: 4px; }

.pages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }

.page-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);
}

.page-card:hover {
  border-color: #bae6fd;
  background: #f0f9ff;
  box-shadow: 0 4px 12px 0 rgba(2, 132, 199, 0.08);
}

.page-icon { font-size: 24px; margin-top: 2px; }

.page-info { flex: 1; overflow: hidden; }
.page-name { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.page-title-preview { font-size: 12.5px; color: #0284c7; font-weight: 600; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.page-desc-preview { font-size: 12px; color: #64748b; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; }

.page-edit-btn { font-size: 12.5px; font-weight: 700; color: #64748b; transition: all 0.2s; flex-shrink: 0; padding-top: 2px; }
.page-card:hover .page-edit-btn { color: #0284c7; transform: translateX(3px); }
</style>
