<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Quotation Management</h1>
        <p class="page-desc">Create, manage and print professional client quotations.</p>
      </div>
      <NuxtLink to="/admin/quotations/new" class="btn-primary">+ New Quotation</NuxtLink>
    </div>

    <AdminDataTable
      :columns="columns"
      :data="quotations"
      :searchable="true"
      search-placeholder="Search quotations…"
      empty-text="No quotations found."
    >
      <template #actions>
        <select v-model="filterStatus" class="filter-select">
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </template>

      <template #cell-quotationNumber="{ row }">
        <div class="ref-cell">
          <span class="ref-code">{{ row.quotationNumber }}</span>
          <span v-if="row.companyName" class="ref-company">{{ row.companyName }}</span>
        </div>
      </template>

      <template #cell-clientName="{ row }">
        <div class="cell-title">
          <div class="cell-main">{{ row.clientCompany || row.clientName }}</div>
          <div class="cell-sub">{{ row.clientName }} · {{ row.clientPhone }}</div>
        </div>
      </template>

      <template #cell-serviceCategory="{ row }">
        <span class="category-pill">{{ row.serviceCategory || 'Standard Services' }}</span>
      </template>

      <template #cell-grandTotal="{ row }">
        <span class="amount">{{ formatCurrency(row.batchTotalAmount || row.grandTotal, row.currency) }}</span>
      </template>

      <template #cell-status="{ row }">
        <AdminStatusBadge :status="row.status" />
      </template>

      <template #cell-date="{ row }">
        {{ formatDate(row.date) }}
      </template>

      <template #cell-actions="{ row }">
        <div class="action-btns">
          <NuxtLink :to="`/admin/quotations/${row.id}`" class="action-btn action-btn--edit">Edit</NuxtLink>
          <NuxtLink :to="`/admin/quotations/print/${row.id}`" target="_blank" class="action-btn action-btn--print">🖨️ Print</NuxtLink>
          <button class="action-btn action-btn--delete" @click="confirmDelete(row)">Delete</button>
        </div>
      </template>
    </AdminDataTable>

    <AdminModal
      v-model="showDeleteModal"
      title="Delete Quotation?"
      :message="`Delete quotation ${deleteTarget?.quotationNumber}? This action cannot be undone.`"
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
import { useQuotations, type Quotation } from '~/composables/useQuotations'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const { getQuotations, deleteQuotation } = useQuotations()
const filterStatus = ref('')
const showDeleteModal = ref(false)
const deleteTarget = ref<Quotation | null>(null)
const allQuotations = ref(getQuotations())

const quotations = computed(() =>
  filterStatus.value
    ? allQuotations.value.filter((q) => q.status === filterStatus.value)
    : allQuotations.value
)

const columns = [
  { key: 'quotationNumber', label: 'Quotation Ref', sortable: true },
  { key: 'clientName', label: 'Client / Company', sortable: true },
  { key: 'serviceCategory', label: 'Category' },
  { key: 'grandTotal', label: 'Total Amount', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'actions', label: 'Actions' },
]

const formatDate = (d: string) => {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return d
  }
}

const formatCurrency = (amount: number, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount || 0)
}

const confirmDelete = (q: Quotation) => {
  deleteTarget.value = q
  showDeleteModal.value = true
}

const doDelete = () => {
  if (deleteTarget.value) {
    deleteQuotation(deleteTarget.value.id)
    allQuotations.value = getQuotations()
  }
  showDeleteModal.value = false
  deleteTarget.value = null
}
</script>

<style scoped>
.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; }
.page-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: #0f172a; }
.page-desc { font-size: 13.5px; color: #64748b; margin-top: 4px; }

.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  background: #0284c7; color: #ffffff; border: none; border-radius: 8px;
  padding: 10px 20px; font-size: 13px; font-weight: 700; cursor: pointer;
  text-decoration: none; white-space: nowrap; transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);
}
.btn-primary:hover { background: #0369a1; }

.filter-select {
  background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px;
  padding: 8px 12px; color: #0f172a; font-size: 12.5px; outline: none;
}
.filter-select:focus { border-color: #0284c7; }

.ref-cell { display: flex; flex-direction: column; gap: 2px; }
.ref-code { font-weight: 700; color: #0284c7; font-size: 13px; }
.ref-company { font-size: 11px; color: #64748b; }

.cell-title { display: flex; flex-direction: column; gap: 2px; }
.cell-main { font-size: 13.5px; font-weight: 700; color: #0f172a; }
.cell-sub { font-size: 11.5px; color: #64748b; }

.category-pill {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  font-size: 11.5px;
  font-weight: 600;
  color: #475569;
}

.amount { font-weight: 700; color: #0f172a; font-size: 13.5px; }

.action-btns { display: flex; gap: 6px; flex-wrap: wrap; }

.action-btn {
  padding: 5px 11px; border-radius: 6px; font-size: 12px;
  font-weight: 700; cursor: pointer; text-decoration: none;
  border: 1px solid transparent; transition: all 0.2s;
}
.action-btn--edit { background: #f0f9ff; border-color: #bae6fd; color: #0284c7; }
.action-btn--edit:hover { background: #e0f2fe; }
.action-btn--print { background: #f0fdf4; border-color: #bbf7d0; color: #16a34a; }
.action-btn--print:hover { background: #dcfce7; }
.action-btn--delete { background: #fef2f2; border-color: #fee2e2; color: #ef4444; }
.action-btn--delete:hover { background: #fee2e2; }
</style>
