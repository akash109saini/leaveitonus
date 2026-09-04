<template>
  <div class="adt-wrap">
    <!-- Search + Actions bar -->
    <div v-if="$slots.actions || searchable" class="adt-toolbar">
      <input
        v-if="searchable"
        v-model="searchQuery"
        class="adt-search"
        :placeholder="searchPlaceholder || 'Search…'"
        type="search"
      />
      <div class="adt-actions">
        <slot name="actions" />
      </div>
    </div>

    <div class="adt-table-wrap">
      <table class="adt-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key" @click="col.sortable && toggleSort(col.key)" :class="col.sortable ? 'sortable' : ''">
              {{ col.label }}
              <span v-if="col.sortable" class="sort-icon">
                {{ sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '⇅' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredData.length === 0">
            <td :colspan="columns.length" class="adt-empty">{{ emptyText || 'No records found.' }}</td>
          </tr>
          <tr v-for="(row, i) in filteredData" :key="row.id ?? i" class="adt-row">
            <td v-for="col in columns" :key="col.key">
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredData.length > 0" class="adt-footer">
      Showing {{ filteredData.length }} of {{ data.length }} records
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column { key: string; label: string; sortable?: boolean }

const props = defineProps<{
  columns: Column[]
  data: Record<string, any>[]
  searchable?: boolean
  searchPlaceholder?: string
  emptyText?: string
}>()

const searchQuery = ref('')
const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('asc')

const toggleSort = (key: string) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const filteredData = computed(() => {
  let result = [...props.data]
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    )
  }
  if (sortKey.value) {
    result.sort((a, b) => {
      const av = a[sortKey.value] ?? ''
      const bv = b[sortKey.value] ?? ''
      const cmp = String(av).localeCompare(String(bv))
      return sortDir.value === 'asc' ? cmp : -cmp
    })
  }
  return result
})
</script>

<style scoped>
.adt-wrap {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04);
}

.adt-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid #f1f5f9;
  gap: 12px;
  flex-wrap: wrap;
  background: #ffffff;
}

.adt-search {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 14px;
  color: #0f172a;
  font-size: 13px;
  outline: none;
  width: 240px;
  transition: all 0.2s;
}
.adt-search:focus {
  border-color: #0284c7;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
}
.adt-actions { display: flex; gap: 8px; margin-left: auto; }

.adt-table-wrap { overflow-x: auto; }

.adt-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.adt-table thead tr {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.adt-table th {
  padding: 12px 18px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #64748b;
  white-space: nowrap;
}

.adt-table th.sortable { cursor: pointer; user-select: none; }
.adt-table th.sortable:hover { color: #0284c7; }
.sort-icon { margin-left: 4px; opacity: 0.6; }

.adt-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s;
}
.adt-row:hover { background: #f8fafc; }
.adt-row:last-child { border-bottom: none; }

.adt-table td {
  padding: 14px 18px;
  color: #334155;
  vertical-align: middle;
}

.adt-empty {
  text-align: center;
  padding: 48px !important;
  color: #94a3b8;
  font-size: 14px;
}

.adt-footer {
  padding: 10px 18px;
  font-size: 12px;
  color: #64748b;
  border-top: 1px solid #f1f5f9;
  text-align: right;
  background: #f8fafc;
}
</style>
