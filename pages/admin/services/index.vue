<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Services Catalog</h1>
        <p class="page-desc">Manage standard services with units and default rates available when creating quotations.</p>
      </div>
      <button class="btn-primary" @click="openNew">+ Add New Service</button>
    </div>

    <div v-if="saved" class="success-toast">✅ Service changes saved!</div>

    <AdminDataTable
      :columns="columns"
      :data="services"
      :searchable="true"
      search-placeholder="Search services…"
      empty-text="No services found."
    >
      <template #cell-name="{ row }">
        <div class="service-name-cell">
          <div class="font-bold text-slate-900">{{ row.name }}</div>
          <div class="text-xs text-slate-500 line-clamp-1">{{ row.description }}</div>
        </div>
      </template>

      <template #cell-unit="{ row }">
        <span class="unit-badge">{{ row.unit || 'Per Item' }}</span>
      </template>

      <template #cell-defaultUnitPrice="{ row }">
        <span class="amount">{{ formatCurrency(row.defaultUnitPrice) }}</span>
      </template>

      <template #cell-category="{ row }">
        <span class="category-tag">{{ row.category }}</span>
      </template>

      <template #cell-actions="{ row }">
        <div class="action-btns">
          <button class="action-btn action-btn--edit" @click="openEdit(row)">Edit</button>
          <button class="action-btn action-btn--delete" @click="confirmDelete(row)">Delete</button>
        </div>
      </template>
    </AdminDataTable>

    <!-- Service Form Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
          <div class="form-modal">
            <div class="form-modal-header">
              <h2>{{ isEditing ? 'Edit Service' : 'Add New Service' }}</h2>
              <button @click="showForm = false" class="close-btn">✕</button>
            </div>
            <div class="form-body">
              <AdminFormField id="svcName" label="Service Name" v-model="form.name" placeholder="e.g. Product Image Editing" required />
              <AdminFormField id="svcDesc" label="Default Description" type="textarea" v-model="form.description" placeholder="Background removal/change and high-end Photoshop finishing..." :rows="3" />
              <div class="form-grid-2">
                <AdminFormField id="svcUnit" label="Unit Pricing Type" v-model="form.unit" placeholder="Per Image / Per Month" />
                <AdminFormField id="svcPrice" label="Default Rate (₹)" type="number" v-model="form.defaultUnitPrice" placeholder="40" step="1" min="0" />
              </div>
              <AdminFormField
                id="svcCategory"
                label="Category"
                type="select"
                v-model="form.category"
                :options="[
                  { value: 'Product Editing', label: 'Product Editing' },
                  { value: 'Content', label: 'Content' },
                  { value: 'Social', label: 'Social Media' },
                  { value: 'Performance', label: 'Performance Ads' },
                  { value: 'Influencer', label: 'Influencer Marketing' },
                  { value: 'Production', label: 'Production / TVC' },
                  { value: 'Digital', label: 'Digital / SEO' },
                  { value: 'Other', label: 'Other' },
                ]"
              />
            </div>
            <div class="form-actions">
              <button class="btn-ghost" @click="showForm = false">Cancel</button>
              <button class="btn-primary" @click="saveService">{{ isEditing ? 'Save Changes' : 'Create Service' }}</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <AdminModal
      v-model="showDeleteModal"
      title="Delete Service?"
      :message="`'${deleteTarget?.name}' will be permanently removed.`"
      icon="⚡"
      variant="danger"
      confirm-text="Yes, Delete"
      @confirm="doDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminDataTable from '~/components/admin/AdminDataTable.vue'
import AdminFormField from '~/components/admin/AdminFormField.vue'
import AdminModal from '~/components/admin/AdminModal.vue'
import { useQuotations, type ServiceItem } from '~/composables/useQuotations'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { getServices, createService, updateService, deleteService } = useQuotations()

const services = ref<ServiceItem[]>([])
const showForm = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const saved = ref(false)
const deleteTarget = ref<ServiceItem | null>(null)
const editingId = ref('')

const form = ref({ name: '', description: '', unit: 'Per Image', category: 'Product Editing', defaultUnitPrice: 40 })

onMounted(() => { services.value = getServices() })

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(n || 0)

const columns = [
  { key: 'name', label: 'Service & Description', sortable: true },
  { key: 'unit', label: 'Unit' },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'defaultUnitPrice', label: 'Rate (₹)', sortable: true },
  { key: 'actions', label: 'Actions' },
]

const openNew = () => {
  isEditing.value = false
  form.value = { name: '', description: '', unit: 'Per Image', category: 'Product Editing', defaultUnitPrice: 40 }
  showForm.value = true
}

const openEdit = (svc: ServiceItem) => {
  isEditing.value = true
  editingId.value = svc.id
  form.value = { name: svc.name, description: svc.description, unit: svc.unit || 'Per Item', category: svc.category, defaultUnitPrice: svc.defaultUnitPrice }
  showForm.value = true
}

const saveService = () => {
  const payload = { ...form.value, defaultUnitPrice: Number(form.value.defaultUnitPrice) }
  if (isEditing.value) {
    updateService(editingId.value, payload)
  } else {
    createService(payload)
  }
  services.value = getServices()
  showForm.value = false
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}

const confirmDelete = (svc: ServiceItem) => {
  deleteTarget.value = svc
  showDeleteModal.value = true
}

const doDelete = () => {
  if (deleteTarget.value) {
    deleteService(deleteTarget.value.id)
    services.value = getServices()
  }
  showDeleteModal.value = false
  deleteTarget.value = null
}
</script>

<style scoped>
.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; }
.page-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; }
.page-desc { font-size: 13.5px; color: #64748b; margin-top: 4px; }

.btn-primary { background: #0284c7; color: #ffffff; border: none; border-radius: 8px; padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: all 0.2s; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25); }
.btn-primary:hover { background: #0369a1; }

.btn-ghost { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 20px; font-size: 13px; font-weight: 700; color: #475569; cursor: pointer; transition: all 0.2s; }
.btn-ghost:hover { background: #f1f5f9; color: #0f172a; }

.success-toast { background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px 18px; font-size: 13px; color: #15803d; font-weight: 600; margin-bottom: 20px; }

.amount { font-weight: 700; color: #0f172a; font-size: 13.5px; }

.unit-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}

.category-tag { background: #f0f9ff; border: 1px solid #bae6fd; color: #0284c7; font-size: 11.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px; }

.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.action-btns { display: flex; gap: 6px; }
.action-btn { padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; border: 1px solid transparent; transition: all 0.2s; }
.action-btn--edit { background: #f0f9ff; border-color: #bae6fd; color: #0284c7; }
.action-btn--edit:hover { background: #e0f2fe; }
.action-btn--delete { background: #fef2f2; border-color: #fee2e2; color: #ef4444; }
.action-btn--delete:hover { background: #fee2e2; }

.modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 999; padding: 20px; }

.form-modal { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; width: 100%; max-width: 520px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }

.form-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid #f1f5f9; }
.form-modal-header h2 { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 800; color: #0f172a; }
.close-btn { background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; transition: color 0.2s; }
.close-btn:hover { color: #0f172a; }

.form-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.form-actions { display: flex; gap: 10px; padding: 16px 24px; border-top: 1px solid #f1f5f9; justify-content: flex-end; background: #f8fafc; }

.modal-enter-active, .modal-leave-active { transition: opacity 0.2s, transform 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96); }
</style>
