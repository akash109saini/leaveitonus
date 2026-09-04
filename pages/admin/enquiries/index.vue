<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Client Enquiries</h1>
        <p class="page-desc">Inbound client leads and project briefs submitted through the website.</p>
      </div>
      <div class="filter-group">
        <button
          v-for="f in filters"
          :key="f.value"
          class="filter-btn"
          :class="activeFilter === f.value ? 'filter-btn--active' : ''"
          @click="activeFilter = f.value"
        >
          {{ f.label }}
          <span class="filter-count">{{ getCount(f.value) }}</span>
        </button>
      </div>
    </div>

    <!-- Enquiry Detail Drawer -->
    <transition name="drawer">
      <div v-if="selectedEnquiry" class="enquiry-drawer">
        <div class="drawer-header">
          <div class="drawer-title">Enquiry Details</div>
          <button class="close-btn" @click="selectedEnquiry = null">✕</button>
        </div>
        <div class="drawer-body">
          <div class="drawer-avatar">{{ selectedEnquiry.name.charAt(0).toUpperCase() }}</div>
          <div class="drawer-name">{{ selectedEnquiry.name }}</div>
          <AdminStatusBadge :status="selectedEnquiry.status" class="drawer-badge" />

          <div class="detail-grid">
            <div class="detail-item"><div class="detail-label">Email Address</div><div class="detail-val">{{ selectedEnquiry.email }}</div></div>
            <div class="detail-item"><div class="detail-label">Phone / Mobile</div><div class="detail-val">{{ selectedEnquiry.phone || '—' }}</div></div>
            <div class="detail-item"><div class="detail-label">Company / Brand</div><div class="detail-val">{{ selectedEnquiry.company || '—' }}</div></div>
            <div class="detail-item"><div class="detail-label">Budget Range</div><div class="detail-val">{{ selectedEnquiry.budget || '—' }}</div></div>
            <div class="detail-item detail-item--full">
              <div class="detail-label">Services Interested In</div>
              <div class="detail-tags">
                <span v-for="s in selectedEnquiry.services" :key="s" class="detail-tag">{{ s }}</span>
              </div>
            </div>
            <div class="detail-item detail-item--full">
              <div class="detail-label">Client Message / Project Brief</div>
              <div class="detail-val detail-message">{{ selectedEnquiry.message }}</div>
            </div>
            <div class="detail-item"><div class="detail-label">Date Received</div><div class="detail-val">{{ formatDate(selectedEnquiry.createdAt) }}</div></div>
          </div>

          <div class="drawer-actions">
            <div class="status-updater">
              <div class="detail-label">Update Enquiry Status</div>
              <div class="status-buttons">
                <button
                  v-for="s in ['new', 'in-progress', 'closed']"
                  :key="s"
                  class="status-upd-btn"
                  :class="selectedEnquiry.status === s ? `status-upd-btn--${s}` : ''"
                  @click="updateStatus(selectedEnquiry.id, s as any)"
                >
                  {{ s }}
                </button>
              </div>
            </div>
            <div class="drawer-btns">
              <a :href="`mailto:${selectedEnquiry.email}?subject=Regarding your enquiry - Leave It On Us`" class="drawer-btn drawer-btn--email">
                ✉️ Reply via Email
              </a>
              <button class="drawer-btn drawer-btn--delete" @click="confirmDelete(selectedEnquiry)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <AdminDataTable
      :columns="columns"
      :data="filteredEnquiries"
      :searchable="true"
      search-placeholder="Search enquiries by name, company, email…"
      empty-text="No enquiries found in this category."
    >
      <template #cell-name="{ row }">
        <div class="cell-title">
          <div class="cell-main">{{ row.name }}</div>
          <div class="cell-sub">{{ row.company || 'Individual' }}</div>
        </div>
      </template>
      <template #cell-services="{ row }">
        <div class="services-cell">
          <span v-for="s in (row.services || []).slice(0, 2)" :key="s" class="service-chip">{{ s }}</span>
          <span v-if="(row.services || []).length > 2" class="service-more">+{{ row.services.length - 2 }}</span>
        </div>
      </template>
      <template #cell-status="{ row }">
        <AdminStatusBadge :status="row.status" />
      </template>
      <template #cell-createdAt="{ row }">
        {{ formatDate(row.createdAt) }}
      </template>
      <template #cell-actions="{ row }">
        <button class="action-btn action-btn--view" @click="selectedEnquiry = row">Review</button>
      </template>
    </AdminDataTable>

    <AdminModal
      v-model="showDeleteModal"
      title="Delete Enquiry?"
      :message="`Delete enquiry from ${deleteTarget?.name}?`"
      icon="🗑️"
      variant="danger"
      confirm-text="Delete"
      @confirm="doDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminDataTable from '~/components/admin/AdminDataTable.vue'
import AdminStatusBadge from '~/components/admin/AdminStatusBadge.vue'
import AdminModal from '~/components/admin/AdminModal.vue'
import { useEnquiries, type Enquiry } from '~/composables/useEnquiries'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { getEnquiries, updateEnquiry, deleteEnquiry } = useEnquiries()

const allEnquiries = ref(getEnquiries())
const activeFilter = ref('')
const selectedEnquiry = ref<Enquiry | null>(null)
const showDeleteModal = ref(false)
const deleteTarget = ref<Enquiry | null>(null)

const filters = [
  { value: '', label: 'All Enquiries' },
  { value: 'new', label: 'New' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
]

const getCount = (status: string) => status ? allEnquiries.value.filter((e) => e.status === status).length : allEnquiries.value.length

const filteredEnquiries = computed(() =>
  activeFilter.value ? allEnquiries.value.filter((e) => e.status === activeFilter.value) : allEnquiries.value
)

const columns = [
  { key: 'name', label: 'Client / Company', sortable: true },
  { key: 'email', label: 'Email Address', sortable: true },
  { key: 'services', label: 'Services' },
  { key: 'budget', label: 'Budget' },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'createdAt', label: 'Received Date', sortable: true },
  { key: 'actions', label: 'Action' },
]

const formatDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'

const updateStatus = (id: string, status: 'new' | 'in-progress' | 'closed') => {
  updateEnquiry(id, { status })
  allEnquiries.value = getEnquiries()
  if (selectedEnquiry.value?.id === id) selectedEnquiry.value = allEnquiries.value.find((e) => e.id === id) || null
}

const confirmDelete = (enq: Enquiry) => {
  deleteTarget.value = enq
  showDeleteModal.value = true
}

const doDelete = () => {
  if (deleteTarget.value) {
    deleteEnquiry(deleteTarget.value.id)
    allEnquiries.value = getEnquiries()
    if (selectedEnquiry.value?.id === deleteTarget.value.id) selectedEnquiry.value = null
  }
  showDeleteModal.value = false
  deleteTarget.value = null
}
</script>

<style scoped>
.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
.page-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; }
.page-desc { font-size: 13.5px; color: #64748b; margin-top: 4px; }

.filter-group { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 24px; }

.filter-btn { display: flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; background: #ffffff; border: 1px solid #cbd5e1; color: #64748b; font-size: 12.5px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
.filter-btn:hover { color: #0f172a; border-color: #94a3b8; }
.filter-btn--active { background: #f0f9ff; border-color: #0284c7; color: #0284c7; }

.filter-count { background: #f1f5f9; padding: 1px 6px; border-radius: 99px; font-size: 10.5px; font-weight: 700; }
.filter-btn--active .filter-count { background: #e0f2fe; color: #0284c7; }

/* Drawer */
.enquiry-drawer {
  position: fixed;
  top: 0; right: 0;
  width: 440px;
  max-width: 90vw;
  height: 100vh;
  background: #ffffff;
  border-left: 1px solid #e2e8f0;
  z-index: 200;
  overflow-y: auto;
  box-shadow: -10px 0 30px rgba(0,0,0,0.08);
}

.drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid #f1f5f9; position: sticky; top: 0; background: #ffffff; z-index: 1; }
.drawer-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 800; color: #0f172a; }
.close-btn { background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; transition: color 0.2s; }
.close-btn:hover { color: #0f172a; }

.drawer-body { padding: 24px; }
.drawer-avatar { width: 56px; height: 56px; border-radius: 50%; background: #e0f2fe; color: #0284c7; font-size: 22px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
.drawer-name { font-family: 'Syne', sans-serif; font-size: 19px; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 8px; }
.drawer-badge { display: block; margin: 0 auto 20px; width: fit-content; }

.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
.detail-item { display: flex; flex-direction: column; gap: 4px; }
.detail-item--full { grid-column: 1 / -1; }
.detail-label { font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #64748b; }
.detail-val { font-size: 13.5px; color: #0f172a; font-weight: 600; }
.detail-message { line-height: 1.6; color: #334155; white-space: pre-wrap; font-weight: 400; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; }

.detail-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.detail-tag { background: #f0f9ff; border: 1px solid #bae6fd; color: #0284c7; font-size: 11.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px; }

.drawer-actions { border-top: 1px solid #f1f5f9; padding-top: 20px; display: flex; flex-direction: column; gap: 16px; }

.status-updater { display: flex; flex-direction: column; gap: 8px; }
.status-buttons { display: flex; gap: 6px; }
.status-upd-btn { flex: 1; padding: 8px; border-radius: 8px; font-size: 11.5px; font-weight: 700; cursor: pointer; border: 1px solid #cbd5e1; background: #f8fafc; color: #64748b; transition: all 0.2s; text-transform: capitalize; }
.status-upd-btn--new { background: #fef9c3; border-color: #fef08a; color: #854d0e; }
.status-upd-btn--in-progress { background: #ffedd5; border-color: #fed7aa; color: #9a3412; }
.status-upd-btn--closed { background: #f1f5f9; border-color: #cbd5e1; color: #475569; }

.drawer-btns { display: flex; gap: 8px; }
.drawer-btn { flex: 1; padding: 10px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; border: 1px solid transparent; transition: all 0.2s; }
.drawer-btn--email { background: #0284c7; color: #ffffff; }
.drawer-btn--email:hover { background: #0369a1; }
.drawer-btn--delete { background: #fef2f2; border-color: #fee2e2; color: #ef4444; }
.drawer-btn--delete:hover { background: #fee2e2; }

/* Table cell styles */
.cell-title { display: flex; flex-direction: column; gap: 2px; }
.cell-main { font-size: 13.5px; font-weight: 700; color: #0f172a; }
.cell-sub { font-size: 11.5px; color: #64748b; }

.services-cell { display: flex; flex-wrap: wrap; gap: 4px; }
.service-chip { background: #f0f9ff; border: 1px solid #bae6fd; color: #0284c7; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 5px; }
.service-more { font-size: 11px; color: #64748b; padding: 2px 0; }

.action-btn { padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; border: 1px solid transparent; transition: all 0.2s; }
.action-btn--view { background: #f0f9ff; border-color: #bae6fd; color: #0284c7; }
.action-btn--view:hover { background: #e0f2fe; }

.drawer-enter-active, .drawer-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); }
</style>
