<template>
  <div>
    <div class="page-header">
      <div class="breadcrumb-back">
        <NuxtLink to="/admin/seo" class="back-link">← Back to SEO Overview</NuxtLink>
        <h1 class="page-title">SEO Settings — {{ form.pageLabel }}</h1>
      </div>
      <button class="btn-primary" @click="save">Save SEO Settings</button>
    </div>

    <div v-if="saved" class="success-toast">✅ SEO settings saved! Changes are now live for this page.</div>

    <div class="editor-layout">
      <div class="editor-main">
        <!-- Basic Meta -->
        <div class="editor-card">
          <div class="card-heading">Basic Meta Tags</div>
          <AdminFormField id="seoTitle" label="Page Title" v-model="form.title" placeholder="Page Title | Leave It On Us" hint="50–60 characters recommended" required />
          <div class="char-count" :class="form.title.length > 60 ? 'over' : ''">{{ form.title.length }}/60 characters</div>
          <AdminFormField id="seoDesc" label="Meta Description" type="textarea" v-model="form.metaDescription" placeholder="Compelling description of the page for search engine results…" :rows="3" hint="150–160 characters recommended" />
          <div class="char-count" :class="form.metaDescription.length > 160 ? 'over' : ''">{{ form.metaDescription.length }}/160 characters</div>
          <AdminFormField id="canonical" label="Canonical URL" v-model="form.canonical" placeholder="https://leaveitonus.com/page" hint="Leave blank to use default page URL" />
          <AdminFormField
            id="robots"
            label="Search Engine Indexing (Robots)"
            type="select"
            v-model="form.robots"
            :options="[
              { value: 'index, follow', label: 'index, follow (Default — Fully indexed)' },
              { value: 'noindex, follow', label: 'noindex, follow (Not in search results)' },
              { value: 'index, nofollow', label: 'index, nofollow (No link equity)' },
              { value: 'noindex, nofollow', label: 'noindex, nofollow (Fully excluded)' },
            ]"
          />
        </div>

        <!-- Open Graph -->
        <div class="editor-card">
          <div class="card-heading">Open Graph (Social Sharing Card)</div>
          <AdminFormField id="ogTitle" label="OG Title" v-model="form.ogTitle" placeholder="Title shown when shared on WhatsApp, Twitter, LinkedIn" />
          <AdminFormField id="ogDesc" label="OG Description" type="textarea" v-model="form.ogDescription" placeholder="Description shown on social share preview cards…" :rows="3" />
          <AdminFormField id="ogImage" label="OG Image URL" v-model="form.ogImage" placeholder="https://… (1200×630px recommended)" hint="1200×630px, JPG/PNG format" />
          <div v-if="form.ogImage" class="og-preview">
            <img :src="form.ogImage" alt="OG Image Preview" class="og-img" @error="form.ogImage = ''" />
          </div>

          <!-- OG Card Preview -->
          <div class="og-card-preview">
            <div class="og-card-label">Social Media Card Preview</div>
            <div class="og-card">
              <div class="og-card-img" :style="form.ogImage ? `background-image: url(${form.ogImage})` : ''">
                <span v-if="!form.ogImage" class="text-xs text-slate-400">No OG Image Set</span>
              </div>
              <div class="og-card-body">
                <div class="og-card-site">leaveitonus.com</div>
                <div class="og-card-title">{{ form.ogTitle || form.title }}</div>
                <div class="og-card-desc">{{ form.ogDescription || form.metaDescription }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Schema Markup -->
        <div class="editor-card">
          <div class="card-heading">Structured Schema Markup (JSON-LD)</div>
          <AdminFormField id="schema" label="Custom Schema JSON" type="textarea" v-model="form.schema" placeholder='{"@context":"https://schema.org","@type":"WebPage",...}' :rows="7" hint="Optional structured data for rich search engine snippets" />
        </div>
      </div>

      <!-- Sidebar tips -->
      <div class="editor-sidebar">
        <div class="editor-card tips-card">
          <div class="tips-heading">SEO Optimization Score</div>
          <div class="tip-item" :class="form.title.length >= 30 && form.title.length <= 60 ? 'tip--ok' : 'tip--warn'">
            <span class="tip-icon">{{ form.title.length >= 30 && form.title.length <= 60 ? '✅' : '⚠️' }}</span>
            Title length (30–60 chars)
          </div>
          <div class="tip-item" :class="form.metaDescription.length >= 100 && form.metaDescription.length <= 160 ? 'tip--ok' : 'tip--warn'">
            <span class="tip-icon">{{ form.metaDescription.length >= 100 && form.metaDescription.length <= 160 ? '✅' : '⚠️' }}</span>
            Description length (100–160 chars)
          </div>
          <div class="tip-item" :class="form.ogImage ? 'tip--ok' : 'tip--warn'">
            <span class="tip-icon">{{ form.ogImage ? '✅' : '⚠️' }}</span>
            Social share OG image set
          </div>
          <div class="tip-item" :class="form.ogTitle ? 'tip--ok' : 'tip--warn'">
            <span class="tip-icon">{{ form.ogTitle ? '✅' : '⚠️' }}</span>
            Social share OG title set
          </div>
          <div class="tip-item" :class="form.robots === 'index, follow' ? 'tip--ok' : 'tip--info'">
            <span class="tip-icon">{{ form.robots === 'index, follow' ? '✅' : 'ℹ️' }}</span>
            Robots: {{ form.robots }}
          </div>
        </div>

        <div class="editor-card">
          <div class="tips-heading">Google Search Preview</div>
          <div class="serp-preview">
            <div class="serp-url">https://leaveitonus.com/{{ form.pageKey !== 'home' ? form.pageKey : '' }}</div>
            <div class="serp-title">{{ form.title || 'Page Title' }}</div>
            <div class="serp-desc">{{ form.metaDescription || 'Meta description will appear here in Google search results…' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AdminFormField from '~/components/admin/AdminFormField.vue'
import { useSeo } from '~/composables/useSeo'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const route = useRoute()
const pageKey = route.params.page as string
const { getPage, updatePage } = useSeo()

const saved = ref(false)
const form = ref({
  pageKey: '', pageLabel: '', title: '', metaDescription: '',
  ogTitle: '', ogDescription: '', ogImage: '', canonical: '', robots: 'index, follow', schema: ''
})

onMounted(() => {
  form.value = { ...getPage(pageKey) }
})

const save = () => {
  updatePage(pageKey, { ...form.value })
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}
</script>

<style scoped>
.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
.back-link { display: inline-block; font-size: 12.5px; color: #64748b; text-decoration: none; margin-bottom: 4px; font-weight: 600; transition: color 0.2s; }
.back-link:hover { color: #0284c7; }
.page-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #0f172a; }

.btn-primary {
  background: #0284c7; color: #ffffff; border: none; border-radius: 8px;
  padding: 10px 22px; font-size: 13.5px; font-weight: 700; cursor: pointer;
  transition: all 0.2s; margin-top: 24px; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);
}
.btn-primary:hover { background: #0369a1; }

.success-toast {
  background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 10px;
  padding: 12px 18px; font-size: 13px; color: #15803d; font-weight: 600; margin-bottom: 20px;
}

.editor-layout { display: grid; grid-template-columns: 1fr 300px; gap: 20px; align-items: start; }
@media (max-width: 960px) { .editor-layout { grid-template-columns: 1fr; } }

.editor-card {
  background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 24px; display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);
}

.card-heading { font-family: 'Syne', sans-serif; font-size: 14.5px; font-weight: 800; color: #0f172a; }

.char-count { font-size: 11px; color: #64748b; text-align: right; margin-top: -10px; font-weight: 500; }
.char-count.over { color: #ef4444; font-weight: 700; }

.og-img { width: 100%; height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0; }

.og-card-label { font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; margin-bottom: 8px; }

.og-card { border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden; background: #ffffff; }
.og-card-img { height: 120px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center; }
.og-card-body { padding: 12px 14px; background: #ffffff; }
.og-card-site { font-size: 10.5px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
.og-card-title { font-size: 13.5px; font-weight: 700; color: #0f172a; margin: 3px 0; }
.og-card-desc { font-size: 12px; color: #475569; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; }

.tips-card { gap: 10px; }
.tips-heading { font-size: 12.5px; font-weight: 800; color: #0f172a; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.05em; }
.tip-item { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #64748b; padding: 4px 0; }
.tip-icon { font-size: 14px; }
.tip--ok { color: #166534; font-weight: 600; }
.tip--warn { color: #854d0e; }
.tip--info { color: #0369a1; }

.serp-preview { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.serp-url { font-size: 11.5px; color: #202124; margin-bottom: 3px; }
.serp-title { font-size: 16px; color: #1a0dab; font-weight: 600; margin-bottom: 3px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; cursor: pointer; }
.serp-title:hover { text-decoration: underline; }
.serp-desc { font-size: 12.5px; color: #4d5156; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
