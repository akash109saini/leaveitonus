<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Blog Management</h1>
        <p class="page-desc">Create, edit and publish blog posts and industry insights.</p>
      </div>
      <NuxtLink to="/admin/blogs/new" class="btn-primary">
        + New Blog Post
      </NuxtLink>
    </div>

    <AdminDataTable
      :columns="columns"
      :data="blogs"
      :searchable="true"
      search-placeholder="Search blogs…"
      empty-text="No blog posts found. Create your first post!"
    >
      <template #actions>
        <select v-model="filterStatus" class="filter-select">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </template>

      <template #cell-title="{ row }">
        <div class="cell-title">
          <div class="cell-main">{{ row.title }}</div>
          <div class="cell-sub">{{ row.category || 'General' }} · By {{ row.author || 'Editorial Team' }}</div>
        </div>
      </template>

      <template #cell-tags="{ row }">
        <div class="tags-wrap">
          <span v-for="tag in (row.tags || []).slice(0, 3)" :key="tag" class="tag-pill">{{ tag }}</span>
          <span v-if="(row.tags || []).length > 3" class="text-xs text-slate-400">+{{ row.tags.length - 3 }}</span>
        </div>
      </template>

      <template #cell-status="{ row }">
        <AdminStatusBadge :status="row.status" />
      </template>

      <template #cell-createdAt="{ row }">
        {{ formatDate(row.createdAt) }}
      </template>

      <template #cell-actions="{ row }">
        <div class="action-btns">
          <NuxtLink :to="`/admin/blogs/${row.id}`" class="action-btn action-btn--edit">Edit</NuxtLink>
          <button class="action-btn action-btn--delete" @click="confirmDelete(row)">Delete</button>
        </div>
      </template>
    </AdminDataTable>

    <AdminModal
      v-model="showDeleteModal"
      title="Delete Blog Post?"
      :message="`Are you sure you want to delete '${deleteTarget?.title}'? This action cannot be undone.`"
      icon="🗑️"
      variant="danger"
      confirm-text="Yes, Delete"
      @confirm="doDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminDataTable from '~/components/admin/AdminDataTable.vue'
import AdminStatusBadge from '~/components/admin/AdminStatusBadge.vue'
import AdminModal from '~/components/admin/AdminModal.vue'
import { useBlogs, type Blog } from '~/composables/useBlogs'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { getBlogs, deleteBlog } = useBlogs()
const filterStatus = ref('')
const showDeleteModal = ref(false)
const deleteTarget = ref<Blog | null>(null)
const allBlogs = ref(getBlogs())

const blogs = computed(() => {
  return filterStatus.value
    ? allBlogs.value.filter((b) => b.status === filterStatus.value)
    : allBlogs.value
})

const columns = [
  { key: 'title', label: 'Post Title', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'tags', label: 'Tags' },
  { key: 'createdAt', label: 'Date', sortable: true },
  { key: 'actions', label: 'Actions' },
]

const formatDate = (iso: string) => {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return iso
  }
}

const confirmDelete = (blog: Blog) => {
  deleteTarget.value = blog
  showDeleteModal.value = true
}

const doDelete = () => {
  if (deleteTarget.value) {
    deleteBlog(deleteTarget.value.id)
    allBlogs.value = getBlogs()
  }
  showDeleteModal.value = false
  deleteTarget.value = null
}
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

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #0284c7;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);
}
.btn-primary:hover { background: #0369a1; }

.filter-select {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 12px;
  color: #0f172a;
  font-size: 12.5px;
  outline: none;
}
.filter-select:focus { border-color: #0284c7; }

.cell-title { display: flex; flex-direction: column; gap: 2px; }
.cell-main { font-size: 13.5px; font-weight: 700; color: #0f172a; }
.cell-sub { font-size: 11.5px; color: #64748b; }

.tags-wrap { display: flex; gap: 4px; flex-wrap: wrap; }
.tag-pill { background: #f1f5f9; border: 1px solid #e2e8f0; color: #475569; font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 5px; }

.action-btns { display: flex; gap: 6px; }

.action-btn {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.action-btn--edit {
  background: #f0f9ff;
  border-color: #bae6fd;
  color: #0284c7;
}
.action-btn--edit:hover { background: #e0f2fe; }

.action-btn--delete {
  background: #fef2f2;
  border-color: #fee2e2;
  color: #ef4444;
}
.action-btn--delete:hover { background: #fee2e2; }
</style>
