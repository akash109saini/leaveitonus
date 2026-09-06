<template>
  <div class="print-container">
    <!-- Top toolbar (hidden on print) -->
    <div class="no-print print-toolbar">
      <NuxtLink :to="`/admin/quotations/${id}`" class="toolbar-btn toolbar-btn--back">
        ← Back to Editor
      </NuxtLink>
      <NuxtLink to="/admin/quotations" class="toolbar-btn toolbar-btn--secondary">
        📋 All Quotations
      </NuxtLink>
      <button @click="triggerPrint" class="toolbar-btn toolbar-btn--primary">
        🖨️ Print / Save as PDF
      </button>
    </div>

    <!-- Paper Sheet -->
    <div class="sheet">
      <!-- HEADER with Leave It On Us Branding -->
      <div class="sheet-header">
        <div class="brand-left">
          <img
            src="/images/logo-black.png"
            alt="Leave It On Us Media"
            class="quotation-brand-logo"
          />
        </div>

        <div class="brand-right">
          <div class="company-title">{{ q.companyName || 'Leave It On Us' }}</div>
          <div class="company-tagline">{{ q.providerSubtitle || 'Creator-Led Digital Marketing & Production Agency' }}</div>
          <div class="company-contact">{{ q.providerContact || 'Contact / WhatsApp: +91 98765 43210' }}</div>
        </div>
      </div>

      <!-- Accent Top Divider -->
      <div class="header-divider"></div>

      <!-- SERVICE QUOTATION BANNER -->
      <div class="service-quotation-banner">
        <div class="banner-accent-bar"></div>
        <h1 class="banner-title">SERVICE QUOTATION</h1>
      </div>

      <!-- CLIENT DETAILS & QUOTATION INFO (2-column bordered card) -->
      <div class="info-card-grid">
        <!-- Client Details Column -->
        <div class="info-column info-column--left">
          <div class="info-heading">CLIENT DETAILS</div>
          <div class="info-row">
            <span class="info-label">Company:</span>
            <span class="info-value font-semibold">{{ q.clientCompany || q.clientName || 'Aura Lifestyle Apparel' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Contact Person:</span>
            <span class="info-value">{{ q.clientName || 'Ms. Priya Sharma' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Mobile:</span>
            <span class="info-value">{{ q.clientPhone || '+91 98201 54321' }}</span>
          </div>
        </div>

        <!-- Quotation Info Column -->
        <div class="info-column info-column--right">
          <div class="info-heading">QUOTATION INFO</div>
          <div class="info-row">
            <span class="info-label">Quotation Ref:</span>
            <span class="info-value font-bold text-amber-700">{{ q.quotationNumber || 'LIOUS20260906' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Date:</span>
            <span class="info-value">{{ q.date || formatDate(new Date().toISOString()) }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Service Category:</span>
            <span class="info-value">{{ q.serviceCategory || 'Full-Funnel Digital Marketing & Creator Growth' }}</span>
          </div>
          <div v-if="q.validUntil" class="info-row">
            <span class="info-label">Valid Until:</span>
            <span class="info-value">{{ q.validUntil }}</span>
          </div>
        </div>
      </div>

      <!-- SERVICE LINE ITEMS TABLE -->
      <table class="services-table">
        <thead>
          <tr>
            <th class="th-sno">S.NO</th>
            <th class="th-desc">SERVICE DESCRIPTION</th>
            <th class="th-unit">UNIT</th>
            <th class="th-rate">RATE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in q.lineItems" :key="idx" class="table-row">
            <td class="td-sno">{{ idx + 1 }}</td>
            <td class="td-desc">
              <div class="service-name">{{ item.serviceName }}</div>
              <div v-if="item.description" class="service-description">{{ item.description }}</div>
            </td>
            <td class="td-unit">{{ item.unit || 'Per Item' }}</td>
            <td class="td-rate">{{ formatRate(item.unitPrice) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- BATCH PRICING / GROWTH PACKAGE BREAKDOWN BOX (Cyan-Blue Box) -->
      <div v-if="q.enableBatchBreakdown !== false && (q.batchItems?.length || q.lineItems?.length)" class="batch-breakdown-card">
        <div class="batch-card-title">
          {{ q.batchTitle || 'Monthly Growth Package Breakdown' }}
        </div>

        <div class="batch-items-list">
          <template v-if="q.batchItems && q.batchItems.length > 0">
            <div v-for="(bItem, bIdx) in q.batchItems" :key="bIdx" class="batch-item-row">
              <span class="batch-item-desc">• {{ bItem.description }}</span>
              <span class="batch-item-amount">{{ formatRate(bItem.amount) }}</span>
            </div>
          </template>
          <template v-else>
            <div v-for="(item, idx) in q.lineItems" :key="idx" class="batch-item-row">
              <span class="batch-item-desc">• {{ item.qty || 1 }} {{ item.serviceName }} @ {{ formatRate(item.unitPrice) }}:</span>
              <span class="batch-item-amount">{{ formatRate(item.total || (item.qty * item.unitPrice)) }}</span>
            </div>
          </template>
        </div>

        <div class="batch-total-row">
          <span class="batch-total-label">{{ q.batchTotalText || 'Total per Month (Complete Creator Engine):' }}</span>
          <span class="batch-total-value">{{ formatRate(q.batchTotalAmount || q.grandTotal) }}</span>
        </div>
      </div>

      <!-- STANDARD TOTALS (if batch breakdown is disabled) -->
      <div v-else class="standard-totals-card">
        <div class="st-row">
          <span>Subtotal:</span>
          <span>{{ formatRate(q.subtotal) }}</span>
        </div>
        <div v-if="q.taxPercent" class="st-row">
          <span>GST ({{ q.taxPercent }}%):</span>
          <span>{{ formatRate(q.taxAmount) }}</span>
        </div>
        <div v-if="q.discountAmount" class="st-row">
          <span>Discount:</span>
          <span>- {{ formatRate(q.discountAmount) }}</span>
        </div>
        <div class="st-row st-grand">
          <span>Grand Total:</span>
          <span>{{ formatRate(q.grandTotal) }}</span>
        </div>
      </div>

      <!-- TERMS & WORKING CONDITIONS (Warm Light Orange Highlight Box) -->
      <div class="terms-card">
        <div class="terms-title">{{ q.termsTitle || 'Terms & Working Conditions' }}</div>
        <div class="terms-content">
          <div v-if="q.termsList && q.termsList.length > 0" class="terms-list">
            <div v-for="(term, tIdx) in q.termsList" :key="tIdx" class="term-bullet">
              • <span v-html="renderTerm(term)"></span>
            </div>
          </div>
          <div v-else class="terms-raw">
            <div v-for="(line, lIdx) in parsedTerms" :key="lIdx" class="term-bullet">
              <span v-html="renderTerm(line)"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. REFERENCE VIDEOS & DOCUMENTATION LINKS (Yellow/Gold Card) -->
      <div v-if="q.referenceLinks && q.referenceLinks.length > 0" class="reference-links-card">
        <div class="ref-card-title">
          <span class="ref-icon">🔗</span> Reference Videos &amp; Documentation Links
        </div>
        <div class="ref-links-list">
          <a
            v-for="(rLink, rIdx) in q.referenceLinks"
            :key="rIdx"
            :href="rLink.url"
            target="_blank"
            rel="noopener noreferrer"
            class="ref-link-item"
          >
            <div class="ref-link-main">
              <span class="ref-type-badge" :class="`ref-type--${rLink.type || 'video'}`">
                {{ rLink.type === 'video' ? '🎬 Video Ref' : rLink.type === 'doc' ? '📄 Documentation' : rLink.type === 'drive' ? '📁 Google Drive' : '🔗 Web Link' }}
              </span>
              <span class="ref-link-title">{{ rLink.title || rLink.url }}</span>
            </div>
            <span class="ref-link-url">{{ rLink.url }} ↗</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuotations, type Quotation } from '~/composables/useQuotations'

definePageMeta({ layout: false })

const route = useRoute()
const id = route.params.id as string
const { getQuotation, getQuotations } = useQuotations()

const q = ref<Quotation>({
  id: '',
  quotationNumber: 'LIOUS/DM/2026/01',
  companyName: 'Leave It On Us',
  providerSubtitle: 'Creator-Led Digital Marketing & Production Agency',
  providerContact: 'Contact / WhatsApp: +91 98765 43210 · hello@leaveitonus.com',
  clientCompany: 'Aura Lifestyle Apparel',
  clientName: 'Ms. Priya Sharma',
  clientPhone: '+91 98201 54321',
  clientEmail: 'priya@auralifestyle.in',
  clientAddress: 'Bandra West, Mumbai, Maharashtra',
  serviceCategory: 'Full-Funnel Digital Marketing & Creator Growth',
  lineItems: [],
  enableBatchBreakdown: true,
  batchTitle: 'Monthly Growth Package Breakdown',
  batchItems: [],
  batchTotalText: 'Total per Month:',
  batchTotalAmount: 140000,
  subtotal: 140000,
  taxPercent: 0,
  taxAmount: 0,
  discountPercent: 0,
  discountAmount: 0,
  grandTotal: 140000,
  currency: 'INR',
  date: 'August 28, 2026',
  validUntil: 'September 28, 2026',
  notes: '',
  termsTitle: 'Terms & Working Conditions',
  termsList: [],
  terms: '',
  status: 'sent',
  createdAt: '',
  updatedAt: ''
})

onMounted(() => {
  const found = getQuotation(id)
  if (found) {
    q.value = found
  } else {
    const list = getQuotations()
    if (list && list.length > 0) {
      q.value = list[0]
    }
  }
})

const parsedTerms = computed(() => {
  if (!q.value.terms) return []
  return q.value.terms.split('\n').filter(Boolean)
})

const renderTerm = (text: string) => {
  if (!text) return ''
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

const formatDate = (iso: string) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

const formatRate = (amt: number) => {
  if (amt === undefined || amt === null) return '₹0.00'
  return '₹' + Number(amt).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const triggerPrint = () => {
  if (import.meta.client) {
    window.print()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap');

.print-container {
  min-height: 100vh;
  background-color: #f1f5f9;
  padding: 32px 16px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1e293b;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Toolbar */
.print-toolbar {
  width: 100%;
  max-width: 820px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 20px;
}

.toolbar-btn {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
}

.toolbar-btn--back {
  background: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
  margin-right: auto;
}
.toolbar-btn--back:hover {
  background: #f8fafc;
  color: #0f172a;
}

.toolbar-btn--secondary {
  background: #ffffff;
  color: #b45309;
  border: 1px solid #fde68a;
}
.toolbar-btn--secondary:hover {
  background: #fefce8;
}

.toolbar-btn--primary {
  background: #ffe300;
  color: #000000;
  border: 1px solid #facc15;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(255, 227, 0, 0.35);
}
.toolbar-btn--primary:hover {
  background: #fde047;
}

/* Paper Sheet Layout */
.sheet {
  width: 100%;
  max-width: 820px;
  background: #ffffff;
  padding: 44px 48px;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  box-sizing: border-box;
}

/* 1. Header */
.sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.brand-left {
  display: flex;
  align-items: center;
}

.quotation-brand-logo {
  height: 52px;
  max-width: 240px;
  object-fit: contain;
}

.brand-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.company-title {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.3px;
}

.company-tagline {
  font-size: 11.5px;
  font-weight: 600;
  color: #475569;
}

.company-contact {
  font-size: 11.5px;
  font-weight: 600;
  color: #1e293b;
  margin-top: 2px;
}

/* Divider line */
.header-divider {
  height: 3px;
  background-color: #ffe300;
  margin-bottom: 24px;
}

/* 2. Banner */
.service-quotation-banner {
  display: flex;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 2px;
  margin-bottom: 24px;
  overflow: hidden;
}

.banner-accent-bar {
  width: 7px;
  height: 48px;
  background-color: #ffe300;
  flex-shrink: 0;
}

.banner-title {
  font-size: 19px;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: 0.8px;
  padding: 12px 18px;
  margin: 0;
}

/* 3. Client & Quotation Info Card */
.info-card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1.5px solid #fde047;
  border-radius: 4px;
  margin-bottom: 24px;
  background-color: #ffffff;
}

.info-column {
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-column--left {
  border-right: 1.5px solid #fde68a;
}

.info-heading {
  font-size: 12px;
  font-weight: 800;
  color: #b45309;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.info-row {
  display: flex;
  font-size: 12.5px;
  line-height: 1.4;
}

.info-label {
  font-weight: 700;
  color: #1e293b;
  min-width: 105px;
}

.info-value {
  color: #334155;
}

/* 4. Services Table */
.services-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
}

.services-table thead tr {
  background-color: #ffe300;
  color: #000000;
}

.services-table th {
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-align: left;
  color: #000000;
}

.th-sno {
  width: 50px;
}

.th-desc {
  width: auto;
}

.th-unit {
  width: 130px;
  text-align: center;
}

.th-rate {
  width: 100px;
  text-align: right;
}

.table-row {
  border-bottom: 1px solid #e2e8f0;
}

.table-row:nth-child(even) {
  background-color: #fcfbf5;
}

.services-table td {
  padding: 12px 14px;
  vertical-align: top;
  font-size: 12.5px;
}

.td-sno {
  color: #64748b;
  font-weight: 500;
}

.service-name {
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 3px;
}

.service-description {
  font-size: 11.5px;
  color: #64748b;
  line-height: 1.45;
}

.td-unit {
  text-align: center;
  color: #334155;
  font-weight: 500;
  font-size: 12px;
}

.td-rate {
  text-align: right;
  font-weight: 700;
  color: #0f172a;
}

/* 5. Batch Breakdown Box */
.batch-breakdown-card {
  background-color: #fefce8;
  border: 1.5px solid #fde047;
  border-radius: 6px;
  padding: 16px 20px;
  margin-bottom: 24px;
}

.batch-card-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #92400e;
  margin-bottom: 12px;
}

.batch-items-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
  margin-bottom: 10px;
}

.batch-item-row {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  color: #1e293b;
}

.batch-item-desc {
  font-weight: 500;
}

.batch-item-amount {
  font-weight: 600;
  color: #0f172a;
}

.batch-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1.5px solid #fde047;
}

.batch-total-label {
  font-size: 13px;
  font-weight: 800;
  color: #78350F;
}

.batch-total-value {
  font-size: 16px;
  font-weight: 900;
  color: #92400e;
}

/* Standard Totals Card */
.standard-totals-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
  max-width: 320px;
  margin-left: auto;
}

.st-row {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  color: #475569;
  padding: 4px 0;
}

.st-grand {
  border-top: 1.5px solid #fde047;
  margin-top: 6px;
  padding-top: 8px;
  font-size: 14px;
  font-weight: 800;
  color: #b45309;
}

/* 6. Terms & Working Conditions Box */
.terms-card {
  background-color: #fffdf0;
  border-left: 5px solid #f97316;
  border-radius: 2px;
  padding: 16px 20px;
  border-top: 1px solid #fef3c7;
  border-right: 1px solid #fef3c7;
  border-bottom: 1px solid #fef3c7;
}

.terms-title {
  font-size: 13.5px;
  font-weight: 800;
  color: #ea580c;
  margin-bottom: 8px;
}

.terms-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.term-bullet {
  font-size: 12px;
  color: #334155;
  line-height: 1.5;
}

/* 7. Reference Links Box */
.reference-links-card {
  margin-top: 20px;
  background-color: #fefce8;
  border: 1.5px solid #fde047;
  border-radius: 6px;
  padding: 16px 20px;
}

.ref-card-title {
  font-size: 13px;
  font-weight: 800;
  color: #92400e;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ref-links-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ref-link-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 12px;
  background: #ffffff;
  border: 1px solid #fef08a;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.ref-link-item:hover {
  border-color: #eab308;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.ref-link-main {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ref-type-badge {
  font-size: 10.5px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ref-type--video {
  background: #fee2e2;
  color: #b91c1c;
}

.ref-type--doc {
  background: #e0f2fe;
  color: #0369a1;
}

.ref-type--drive {
  background: #dcfce7;
  color: #15803d;
}

.ref-type--link {
  background: #fef3c7;
  color: #b45309;
}

.ref-link-title {
  font-size: 12px;
  font-weight: 700;
  color: #0f172a;
}

.ref-link-url {
  font-size: 11px;
  font-weight: 600;
  color: #b45309;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Print Media Styles */
@media print {
  .no-print {
    display: none !important;
  }
  body, html {
    background: #ffffff !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .print-container {
    background: #ffffff !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  .sheet {
    box-shadow: none !important;
    border-radius: 0 !important;
    padding: 24px 30px !important;
    max-width: 100% !important;
    width: 100% !important;
  }
  @page {
    margin: 10mm 12mm;
    size: A4 portrait;
  }
}
</style>
