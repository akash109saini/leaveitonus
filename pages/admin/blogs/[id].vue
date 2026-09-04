<template>
  <div>
    <div class="page-header">
      <div class="breadcrumb-back">
        <NuxtLink to="/admin/blogs" class="back-link">← Back to Blogs</NuxtLink>
        <h1 class="page-title">{{ isNew ? 'New Blog Post' : 'Edit Blog Post' }}</h1>
      </div>
      <div class="header-actions">
        <button class="btn-ghost" @click="saveAsDraft">Save Draft</button>
        <button class="btn-primary" @click="publish">
          {{ form.status === 'published' ? 'Update Post' : 'Publish Post' }}
        </button>
      </div>
    </div>

    <div v-if="saved" class="success-toast">✅ Blog post saved successfully!</div>

    <div class="editor-layout">
      <!-- Main Editor -->
      <div class="editor-main">
        <div class="editor-card">
          <AdminFormField id="title" label="Post Title" v-model="form.title" placeholder="Enter an engaging post title…" required />
          <AdminFormField id="slug" label="URL Slug" v-model="form.slug" placeholder="my-blog-post-slug" hint="Auto-generated from title. Editable." />
          <AdminFormField id="excerpt" label="Excerpt Summary" type="textarea" v-model="form.excerpt" placeholder="Short description shown on blog archive cards…" :rows="3" />
          <AdminFormField id="body" label="Post Body (Markdown)" type="textarea" v-model="form.body" placeholder="Write your full blog content here using Markdown formatting…" :rows="16" />
        </div>

        <!-- Preview -->
        <div v-if="form.body" class="preview-card">
          <div class="preview-label">Live Content Preview</div>
          <h2 class="preview-title">{{ form.title || 'Untitled Post' }}</h2>
          <p class="preview-excerpt">{{ form.excerpt }}</p>
          <div class="preview-body">{{ form.body }}</div>
        </div>
      </div>

      <!-- Sidebar Settings -->
      <div class="editor-sidebar">
        <div class="editor-card">
          <div class="sidebar-section-label">Post Metadata</div>
          <AdminFormField id="author" label="Author" v-model="form.author" placeholder="Author name" required />
          <AdminFormField
            id="category"
            label="Category"
            type="select"
            v-model="form.category"
            :options="[
              { value: 'Marketing', label: 'Marketing' },
              { value: 'Content', label: 'Content Strategy' },
              { value: 'Performance', label: 'Performance Ads' },
              { value: 'Influencer', label: 'Creator & Influencer' },
              { value: 'Production', label: 'Video Production' },
              { value: 'Industry', label: 'Industry Insights' },
              { value: 'Case Study', label: 'Case Study' },
            ]"
            placeholder="Select category"
          />
          <AdminFormField id="tags" label="Tags (comma-separated)" v-model="tagsInput" placeholder="seo, marketing, creative" hint="Separate tags with commas" />
        </div>

        <div class="editor-card">
          <div class="sidebar-section-label">Featured Media</div>
          <AdminFormField id="coverImage" label="Cover Image URL" v-model="form.coverImage" placeholder="https://images.unsplash.com/..." />
          <div v-if="form.coverImage" class="cover-preview">
            <img :src="form.coverImage" alt="Cover preview" class="cover-img" @error="form.coverImage = ''" />
          </div>
        </div>

        <div class="editor-card">
          <div class="sidebar-section-label">Publication Status</div>
          <div class="status-toggle">
            <button
              v-for="s in ['draft', 'published']"
              :key="s"
              class="status-btn"
              :class="form.status === s ? `status-btn--${s}` : ''"
              @click="form.status = s as 'draft' | 'published'"
            >
              {{ s.charAt(0).toUpperCase() + s.slice(1) }}
            </button>
          </div>
        </div>

        <button v-if="!isNew" class="btn-danger-full" @click="showDeleteModal = true">Delete Post</button>
      </div>
    </div>

    <AdminModal
      v-model="showDeleteModal"
      title="Delete Post?"
      :message="`'${form.title}' will be permanently deleted.`"
      icon="🗑️"
      variant="danger"
      confirm-text="Delete"
      @confirm="doDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminFormField from '~/components/admin/AdminFormField.vue'
import AdminModal from '~/components/admin/AdminModal.vue'
import { useBlogs } from '~/composables/useBlogs'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const route = useRoute()
const router = useRouter()
const { getBlog, createBlog, updateBlog, deleteBlog } = useBlogs()

const id = route.params.id as string
const isNew = computed(() => id === 'new')

const form = ref({
  title: '',
  slug: '',
  author: 'Editorial Team',
  category: 'Marketing',
  coverImage: '',
  excerpt: '',
  body: '',
  status: 'draft' as 'draft' | 'published',
})
const tagsInput = ref('')
const saved = ref(false)
const showDeleteModal = ref(false)

onMounted(() => {
  if (!isNew.value) {
    const blog = getBlog(id)
    if (blog) {
      form.value = { ...blog }
      tagsInput.value = blog.tags?.join(', ') || ''
    }
  }
})

// Auto-generate slug from title
watch(() => form.value.title, (title) => {
  if (isNew.value) {
    form.value.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
})

const getTags = () => tagsInput.value.split(',').map((t) => t.trim()).filter(Boolean)

const save = (status: 'draft' | 'published') => {
  form.value.status = status
  const payload = { ...form.value, tags: getTags() }
  if (isNew.value) {
    const created = createBlog(payload)
    router.replace(`/admin/blogs/${created.id}`)
  } else {
    updateBlog(id, payload)
  }
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}

const saveAsDraft = () => save('draft')
const publish = () => save('published')

const doDelete = () => {
  deleteBlog(id)
  router.push('/admin/blogs')
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}

.back-link {
  display: inline-block;
  font-size: 12.5px;
  color: #64748b;
  text-decoration: none;
  margin-bottom: 4px;
  font-weight: 600;
  transition: color 0.2s;
}
.back-link:hover { color: #0284c7; }

.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #0f172a;
}

.header-actions { display: flex; gap: 10px; align-items: center; margin-top: 24px; }

.btn-primary {
  background: #0284c7;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 22px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);
}
.btn-primary:hover { background: #0369a1; }

.btn-ghost {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-ghost:hover { background: #f8fafc; color: #0f172a; }

.success-toast {
  background: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  padding: 12px 18px;
  font-size: 13px;
  color: #15803d;
  font-weight: 600;
  margin-bottom: 20px;
}

.editor-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  align-items: start;
}

@media (max-width: 960px) {
  .editor-layout { grid-template-columns: 1fr; }
}

.editor-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);
}

.sidebar-section-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: -6px;
}

.cover-preview { border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
.cover-img { width: 100%; height: 140px; object-fit: cover; }

.status-toggle { display: flex; gap: 8px; }

.status-btn {
  flex: 1;
  padding: 9px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #64748b;
  transition: all 0.2s;
}

.status-btn--draft { background: #f1f5f9; border-color: #cbd5e1; color: #334155; }
.status-btn--published { background: #dcfce7; border-color: #bbf7d0; color: #15803d; }

.btn-danger-full {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background: #fef2f2;
  border: 1px solid #fee2e2;
  color: #dc2626;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-danger-full:hover { background: #fee2e2; }

.preview-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);
}

.preview-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0284c7;
  margin-bottom: 12px;
}

.preview-title {
  font-family: 'Syne', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
}

.preview-excerpt { font-size: 13.5px; color: #64748b; margin-bottom: 16px; line-height: 1.5; }

.preview-body {
  font-size: 13px;
  color: #334155;
  white-space: pre-wrap;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  line-height: 1.7;
  max-height: 300px;
  overflow-y: auto;
  padding: 14px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
</style>
