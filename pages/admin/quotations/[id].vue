<template>
  <div>
    <div class="page-header">
      <div class="breadcrumb-back">
        <NuxtLink to="/admin/quotations" class="back-link">← Back to Quotations</NuxtLink>
        <h1 class="page-title">{{ isNew ? 'New Digital Marketing Quotation' : `Edit Quotation — ${form.quotationNumber}` }}</h1>
      </div>
      <div class="header-actions">
        <select v-model="form.status" class="status-select">
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <NuxtLink v-if="!isNew" :to="`/admin/quotations/print/${form.id}`" target="_blank" class="btn-ghost">
          🖨️ Open Print View
        </NuxtLink>
        <button class="btn-primary" @click="save">
          {{ isNew ? 'Create Quotation' : 'Save Changes' }}
        </button>
      </div>
    </div>

    <div v-if="saved" class="success-toast">✅ Quotation successfully saved!</div>

    <div class="editor-layout">
      <!-- Main form -->
      <div class="editor-main">
        <!-- 1. Provider / Header Info -->
        <div class="editor-card">
          <div class="card-heading">1. Provider / Agency Information</div>
          <div class="form-grid-3">
            <AdminFormField id="companyName" label="Agency Brand Name" v-model="form.companyName" placeholder="Leave It On Us" />
            <AdminFormField id="providerSubtitle" label="Tagline / Subtitle" v-model="form.providerSubtitle" placeholder="Creator-Led Digital Marketing & Production Agency" />
            <AdminFormField id="providerContact" label="Header Contact / WhatsApp" v-model="form.providerContact" placeholder="Contact / WhatsApp: +91 98765 43210 · hello@leaveitonus.com" />
          </div>
        </div>

        <!-- 2. Client & Quotation Metadata -->
        <div class="editor-card">
          <div class="card-heading">2. Client &amp; Quotation Details (Two-Column Card)</div>
          <div class="form-grid-2">
            <!-- Client Details -->
            <div class="inner-subcard">
              <div class="subcard-title text-sky-700 font-bold mb-3">CLIENT DETAILS</div>
              <div class="flex flex-col gap-3">
                <AdminFormField id="clientCompany" label="Company / Brand Name" v-model="form.clientCompany" placeholder="Aura Lifestyle Apparel" required />
                <AdminFormField id="clientName" label="Contact Person" v-model="form.clientName" placeholder="Ms. Priya Sharma" required />
                <AdminFormField id="clientPhone" label="Mobile / WhatsApp" type="tel" v-model="form.clientPhone" placeholder="+91 98201 54321" required />
                <AdminFormField id="clientEmail" label="Email (Optional)" type="email" v-model="form.clientEmail" placeholder="priya@auralifestyle.in" />
              </div>
            </div>

            <!-- Quotation Info -->
            <div class="inner-subcard">
              <div class="subcard-title text-sky-700 font-bold mb-3">QUOTATION INFO</div>
              <div class="flex flex-col gap-3">
                <AdminFormField id="quotationNumber" label="Quotation Ref #" v-model="form.quotationNumber" placeholder="LIOUS/DM/2026/01" required />
                <AdminFormField id="date" label="Quotation Date" v-model="form.date" placeholder="August 28, 2026" required />
                <AdminFormField id="serviceCategory" label="Service Category" v-model="form.serviceCategory" placeholder="Full-Funnel Digital Marketing & Creator Growth" />
                <AdminFormField id="validUntil" label="Valid Until" v-model="form.validUntil" placeholder="September 28, 2026" />
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Line Items Table -->
        <div class="editor-card">
          <div class="card-heading-row">
            <div class="card-heading">3. Service Line Items</div>
            <button class="btn-add-service" @click="showServicePicker = !showServicePicker">
              + Insert from Catalog
            </button>
          </div>

          <!-- Service Catalog Picker Modal / Dropdown -->
          <div v-if="showServicePicker" class="service-picker">
            <div class="service-picker-header">
              <span class="font-bold text-xs text-slate-600">Select a digital marketing service:</span>
              <button @click="showServicePicker = false" class="text-xs text-slate-400 hover:text-slate-600">✕ Close</button>
            </div>
            <div
              v-for="svc in availableServices"
              :key="svc.id"
              class="service-pick-item"
              @click="addServiceLine(svc)"
            >
              <div>
                <div class="spi-name">{{ svc.name }}</div>
                <div class="spi-unit">{{ svc.unit || 'Per Month' }} · {{ svc.description }}</div>
              </div>
              <div class="spi-price">{{ formatCurrency(svc.defaultUnitPrice) }}</div>
            </div>
          </div>

          <!-- Items Table -->
          <div class="items-table">
            <div class="items-header">
              <span class="ih-no">#</span>
              <span class="ih-service">Service Description</span>
              <span class="ih-unit">Unit</span>
              <span class="ih-rate">Rate (₹)</span>
              <span class="ih-qty">Qty</span>
              <span class="ih-total">Total</span>
              <span></span>
            </div>
            <div v-if="form.lineItems.length === 0" class="items-empty">
              No service line items added yet. Click "+ Add Custom Line" or insert from catalog above.
            </div>
            <div class="item-row" v-for="(item, idx) in form.lineItems" :key="idx">
              <span class="item-sno">{{ idx + 1 }}</span>
              <div class="item-fields">
                <input v-model="item.serviceName" placeholder="Service Name (e.g. Short-Form Video Production)" class="item-input font-semibold" @input="recalc(idx)" />
                <textarea v-model="item.description" placeholder="Description / deliverables..." class="item-input item-desc" rows="2"></textarea>
              </div>
              <input v-model="item.unit" placeholder="Per Month" class="item-input item-unit" />
              <input v-model.number="item.unitPrice" type="number" min="0" step="1000" class="item-input item-price" @input="recalc(idx)" />
              <input v-model.number="item.qty" type="number" min="1" class="item-input item-qty" @input="recalc(idx)" />
              <div class="item-total">{{ formatCurrency(item.total) }}</div>
              <button class="item-remove" @click="removeLine(idx)" title="Remove item">✕</button>
            </div>
            <button class="btn-add-line" @click="addBlankLine">+ Add Custom Service Line</button>
          </div>
        </div>

        <!-- 4. Batch Pricing / Package Breakdown Section -->
        <div class="editor-card">
          <div class="card-heading-row">
            <div>
              <div class="card-heading">4. Package Pricing Breakdown Card (Blue Box)</div>
              <div class="text-xs text-slate-500">Matches the blue highlighted breakdown card shown on the quotation.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="form.enableBatchBreakdown" />
              <span class="toggle-slider"></span>
              <span class="toggle-label">{{ form.enableBatchBreakdown ? 'Enabled' : 'Disabled' }}</span>
            </label>
          </div>

          <div v-if="form.enableBatchBreakdown" class="batch-edit-body">
            <AdminFormField id="batchTitle" label="Breakdown Box Title" v-model="form.batchTitle" placeholder="Monthly Growth Package Breakdown (3-Month Campaign)" />

            <div class="batch-items-edit">
              <div class="text-xs font-bold text-slate-700 uppercase mb-2">Breakdown Deliverables</div>
              <div v-for="(bItem, bIdx) in form.batchItems" :key="bIdx" class="batch-item-input-row">
                <input v-model="bItem.description" placeholder="e.g. 15 Viral Vertical Reels & Shorts Production:" class="item-input flex-1" />
                <input v-model.number="bItem.amount" type="number" placeholder="45000" class="item-input w-28 text-right" @input="recalcBatchTotal" />
                <button class="item-remove" @click="form.batchItems.splice(bIdx, 1)">✕</button>
              </div>
              <button class="btn-sub-add" @click="form.batchItems.push({ description: '', amount: 0 })">+ Add Breakdown Deliverable</button>
            </div>

            <div class="form-grid-2 pt-3 border-t border-slate-200">
              <AdminFormField id="batchTotalText" label="Total Label" v-model="form.batchTotalText" placeholder="Total per Month (Complete Creator Engine):" />
              <AdminFormField id="batchTotalAmount" label="Total Package Amount (₹)" type="number" v-model="form.batchTotalAmount" placeholder="140000" />
            </div>
          </div>
        </div>

        <!-- 5. Terms & Working Conditions Box -->
        <div class="editor-card">
          <div class="card-heading">5. Terms &amp; Working Conditions (Orange Highlight Box)</div>
          <AdminFormField id="termsTitle" label="Box Heading" v-model="form.termsTitle" placeholder="Terms & Working Conditions" />
          <AdminFormField
            id="terms"
            label="Terms Bullet Points (One per line, use **text** for bold highlight)"
            type="textarea"
            v-model="form.terms"
            :rows="4"
            placeholder="• Creative Strategy Kickoff: Dedicated script briefs & visual moodboards delivered within **3 working days** of agreement.&#10;• Content Revisions: Includes **2 rounds of feedback and revisions** per video asset prior to final publishing.&#10;• Transparent Reporting: Bi-weekly growth review calls and **24/7 real-time dashboard** access provided."
          />
        </div>

        <!-- 6. Reference Videos & Documentation Links -->
        <div class="editor-card">
          <div class="card-heading-row">
            <div>
              <div class="card-heading">6. Reference Videos &amp; Documentation Links</div>
              <div class="text-xs text-slate-500">Attach sample video links, moodboards, PDF playbooks, or Google Drive folders for client review.</div>
            </div>
            <button class="btn-sub-add" @click="addReferenceLink">
              + Add Reference Link
            </button>
          </div>

          <div v-if="form.referenceLinks && form.referenceLinks.length > 0" class="ref-links-edit-list">
            <div v-for="(rLink, rIdx) in form.referenceLinks" :key="rIdx" class="ref-link-input-row">
              <select v-model="rLink.type" class="item-input w-36">
                <option value="video">🎬 Video Ref</option>
                <option value="doc">📄 Document</option>
                <option value="drive">📁 Google Drive</option>
                <option value="link">🔗 Web Link</option>
              </select>
              <input v-model="rLink.title" placeholder="Link Title (e.g. Sample Viral Hook Video)" class="item-input flex-1" />
              <input v-model="rLink.url" placeholder="https://..." class="item-input flex-1" />
              <button class="item-remove" title="Remove Link" @click="form.referenceLinks.splice(rIdx, 1)">✕</button>
            </div>
          </div>
          <div v-else class="text-sm text-slate-400 py-4 text-center border border-dashed border-slate-200 rounded-lg">
            No reference links added yet. Click "+ Add Reference Link" above to attach reference videos or documents.
          </div>
        </div>
      </div>

      <!-- Sidebar summary card -->
      <div class="editor-sidebar">
        <div class="editor-card summary-card">
          <div class="card-heading">Quotation Summary</div>
          <div class="summary-row"><span>Ref Number:</span><span class="font-bold text-sky-600">{{ form.quotationNumber }}</span></div>
          <div class="summary-row"><span>Client:</span><span class="font-medium text-slate-800">{{ form.clientCompany || form.clientName }}</span></div>
          <div class="summary-row"><span>Deliverables:</span><span>{{ form.lineItems.length }} items</span></div>
          <div class="summary-row"><span>Subtotal:</span><span>{{ formatCurrency(form.subtotal) }}</span></div>
          <div class="summary-row" v-if="form.enableBatchBreakdown">
            <span>Package Total:</span>
            <span class="summary-total">{{ formatCurrency(form.batchTotalAmount || form.grandTotal) }}</span>
          </div>
          <div class="summary-row" v-else>
            <span>Grand Total:</span>
            <span class="summary-total">{{ formatCurrency(form.grandTotal) }}</span>
          </div>

          <div class="sidebar-actions mt-4 flex flex-col gap-2">
            <button class="btn-primary w-full text-center" @click="save">
              💾 Save Quotation
            </button>
            <NuxtLink v-if="!isNew" :to="`/admin/quotations/print/${form.id}`" target="_blank" class="print-btn">
              🖨️ Preview &amp; Print Quotation
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminFormField from '~/components/admin/AdminFormField.vue'
import { useQuotations, type Quotation, type ServiceItem } from '~/composables/useQuotations'

definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

const route = useRoute()
const router = useRouter()
const { getQuotation, createQuotation, updateQuotation, getServices } = useQuotations()

const id = route.params.id as string
const isNew = computed(() => id === 'new')
const saved = ref(false)
const showServicePicker = ref(false)
const availableServices = ref<ServiceItem[]>([])

const form = ref<Quotation>({
  id: '',
  quotationNumber: 'LIOUS20260906',
  companyName: 'Leave It On Us',
  providerSubtitle: 'Creator-Led Digital Marketing & Production Agency',
  providerContact: 'Contact / WhatsApp: +91 98765 43210',
  clientCompany: 'Aura Lifestyle Apparel',
  clientName: 'Ms. Priya Sharma',
  clientPhone: '+91 98201 54321',
  clientEmail: '',
  clientAddress: 'Bandra West, Mumbai, Maharashtra',
  serviceCategory: 'Full-Funnel Digital Marketing & Creator Growth',
  lineItems: [
    {
      serviceName: 'Short-Form Video Production & Reels IP',
      description: '15 cinematic vertical reels/shorts per month with viral hook scripting, professional studio/on-location shoot, and high-retention pacing.',
      unit: 'Per Month (15 Reels)',
      qty: 1,
      unitPrice: 45000,
      total: 45000
    },
    {
      serviceName: 'Meta & Google Ads Performance Scaling',
      description: 'End-to-end media buying, audience testing, dynamic ad creative iterations, ROAS optimization, and weekly performance reporting.',
      unit: 'Per Month',
      qty: 1,
      unitPrice: 35000,
      total: 35000
    },
    {
      serviceName: 'Creator & Influencer Sourcing & Seeding',
      description: 'Campaign management with 10 vetted lifestyle and fashion creators, script briefs, usage rights acquisition, and engagement tracking.',
      unit: 'Per Campaign (10 Creators)',
      qty: 1,
      unitPrice: 40000,
      total: 40000
    },
    {
      serviceName: 'On-Page SEO & Content Strategy',
      description: 'Technical SEO audit, keyword mapping, high-intent eCommerce blog publishing, and search rank tracking.',
      unit: 'Per Month',
      qty: 1,
      unitPrice: 20000,
      total: 20000
    }
  ],
  enableBatchBreakdown: true,
  batchTitle: 'Monthly Growth Package Breakdown (3-Month Campaign)',
  batchItems: [
    { description: '15 Viral Vertical Reels & Shorts Production:', amount: 45000 },
    { description: 'Full-Funnel Meta & Google Ads Media Buying:', amount: 35000 },
    { description: '10 Vetted Creator Seeding & Usage Rights:', amount: 40000 },
    { description: 'Technical & On-Page SEO Growth Suite:', amount: 20000 }
  ],
  batchTotalText: 'Total per Month (Complete Creator Engine):',
  batchTotalAmount: 140000,
  referenceLinks: [
    { title: 'Brand Aesthetic & Visual Moodboard Reel', url: 'https://youtube.com/shorts/sample1', type: 'video' },
    { title: 'Content Calendar & Strategy Playbook', url: 'https://docs.google.com/document/d/sample-doc', type: 'doc' }
  ],
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
  terms: '• Creative Strategy Kickoff: Dedicated script briefs & visual moodboards delivered within **3 working days** of agreement.\n• Content Revisions: Includes **2 rounds of feedback and revisions** per video asset prior to final publishing.\n• Transparent Reporting: Bi-weekly growth review calls and **24/7 real-time dashboard** access provided.',
  status: 'sent',
  createdAt: '',
  updatedAt: ''
})

const addReferenceLink = () => {
  if (!form.value.referenceLinks) form.value.referenceLinks = []
  form.value.referenceLinks.push({ title: '', url: '', type: 'video' })
}

onMounted(() => {
  availableServices.value = getServices()
  if (!isNew.value) {
    const q = getQuotation(id)
    if (q) form.value = { ...q }
  }
})

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: form.value.currency || 'INR', maximumFractionDigits: 2 }).format(amount || 0)
}

const recalc = (idx: number) => {
  const item = form.value.lineItems[idx]
  item.total = (item.qty || 1) * (item.unitPrice || 0)
  recalcTotals()
}

const recalcBatchTotal = () => {
  if (form.value.batchItems && form.value.batchItems.length > 0) {
    form.value.batchTotalAmount = form.value.batchItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
  }
}

const recalcTotals = () => {
  const subtotal = form.value.lineItems.reduce((s, i) => s + (i.total || 0), 0)
  form.value.subtotal = subtotal
  form.value.discountAmount = Math.round(subtotal * (form.value.discountPercent / 100))
  const afterDiscount = subtotal - form.value.discountAmount
  form.value.taxAmount = Math.round(afterDiscount * (form.value.taxPercent / 100))
  form.value.grandTotal = afterDiscount + form.value.taxAmount
  if (!form.value.batchTotalAmount) {
    form.value.batchTotalAmount = form.value.grandTotal
  }
}

const addBlankLine = () => {
  form.value.lineItems.push({ serviceName: '', description: '', unit: 'Per Month', qty: 1, unitPrice: 0, total: 0 })
}

const addServiceLine = (svc: ServiceItem) => {
  form.value.lineItems.push({
    serviceId: svc.id,
    serviceName: svc.name,
    description: svc.description,
    unit: svc.unit || 'Per Month',
    qty: 1,
    unitPrice: svc.defaultUnitPrice,
    total: svc.defaultUnitPrice,
  })
  recalcTotals()
  showServicePicker.value = false
}

const removeLine = (idx: number) => {
  form.value.lineItems.splice(idx, 1)
  recalcTotals()
}

const save = () => {
  const payload = { ...form.value }
  if (isNew.value) {
    const created = createQuotation(payload)
    router.replace(`/admin/quotations/${created.id}`)
  } else {
    updateQuotation(id, payload)
  }
  saved.value = true
  setTimeout(() => (saved.value = false), 3000)
}
</script>

<style scoped>
.page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
.back-link { display: inline-block; font-size: 12.5px; color: #64748b; text-decoration: none; margin-bottom: 4px; font-weight: 600; transition: color 0.2s; }
.back-link:hover { color: #0284c7; }
.page-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: #0f172a; }
.header-actions { display: flex; gap: 10px; align-items: center; margin-top: 24px; flex-wrap: wrap; }

.btn-primary {
  background: #0284c7; color: #ffffff; border: none; border-radius: 8px;
  padding: 10px 22px; font-size: 13.5px; font-weight: 700; cursor: pointer;
  transition: all 0.2s; white-space: nowrap; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);
}
.btn-primary:hover { background: #0369a1; }

.btn-ghost {
  background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;
  padding: 9px 16px; font-size: 13px; font-weight: 600; color: #334155;
  cursor: pointer; transition: all 0.2s; text-decoration: none;
  display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;
}
.btn-ghost:hover { background: #f8fafc; border-color: #94a3b8; }

.status-select {
  background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;
  padding: 9px 13px; color: #0f172a; font-size: 13px; outline: none; font-weight: 600;
}

.success-toast {
  background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 10px;
  padding: 12px 18px; font-size: 13px; color: #15803d; font-weight: 600; margin-bottom: 20px;
}

.editor-layout { display: grid; grid-template-columns: 1fr 300px; gap: 20px; align-items: start; }
@media (max-width: 960px) { .editor-layout { grid-template-columns: 1fr; } }

.editor-card {
  background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 22px; display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03);
}

.card-heading { font-size: 14.5px; font-weight: 800; color: #0f172a; font-family: 'Syne', sans-serif; }
.card-heading-row { display: flex; align-items: center; justify-content: space-between; }

.inner-subcard {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 16px;
}

.subcard-title {
  font-size: 12px;
  letter-spacing: 0.5px;
}

.btn-add-service {
  background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;
  padding: 6px 12px; font-size: 12px; font-weight: 700; color: #0284c7;
  cursor: pointer; transition: all 0.2s;
}
.btn-add-service:hover { background: #e0f2fe; }

.service-picker {
  display: flex; flex-direction: column; gap: 6px; background: #ffffff;
  border: 1px solid #bae6fd; border-radius: 10px; padding: 14px;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
}
.service-picker-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 6px; border-bottom: 1px solid #f1f5f9; }
.service-pick-item { display: flex; justify-content: space-between; align-items: center; padding: 9px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s; }
.service-pick-item:hover { background: #f0f9ff; }
.spi-name { font-size: 13px; font-weight: 700; color: #0f172a; }
.spi-unit { font-size: 11.5px; color: #64748b; }
.spi-price { font-size: 12.5px; color: #0284c7; font-weight: 700; }

.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
@media (max-width: 680px) { .form-grid-2, .form-grid-3 { grid-template-columns: 1fr; } }

/* Items table */
.items-table { display: flex; flex-direction: column; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
.items-header {
  display: grid; grid-template-columns: 32px 1fr 120px 90px 60px 95px 28px;
  gap: 8px; padding: 10px 14px; background: #f8fafc; font-size: 11px;
  font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #64748b; border-bottom: 1px solid #e2e8f0;
}
.items-empty { padding: 24px; text-align: center; color: #94a3b8; font-size: 13px; }

.item-row {
  display: grid; grid-template-columns: 32px 1fr 120px 90px 60px 95px 28px;
  gap: 8px; padding: 10px 14px; border-bottom: 1px solid #f1f5f9; align-items: start;
}
.item-sno { font-size: 12px; color: #94a3b8; font-weight: 600; padding-top: 8px; }
.item-fields { display: flex; flex-direction: column; gap: 4px; }

.item-input {
  background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px;
  padding: 6px 10px; color: #0f172a; font-size: 12.5px; outline: none;
  width: 100%; transition: border-color 0.2s; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
.item-input:focus { border-color: #0284c7; }
.item-desc { color: #64748b; font-size: 11.5px; resize: vertical; }
.item-qty, .item-price { text-align: right; }
.item-total { font-size: 13px; font-weight: 700; color: #0f172a; text-align: right; padding-top: 8px; }
.item-remove { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 14px; padding-top: 8px; transition: color 0.2s; }
.item-remove:hover { color: #ef4444; }

.btn-add-line {
  background: #f8fafc; border: none; color: #0284c7; font-size: 12.5px;
  font-weight: 700; cursor: pointer; padding: 12px 14px; transition: all 0.2s; text-align: left;
}
.btn-add-line:hover { background: #f0f9ff; }

/* Batch Box editing */
.batch-edit-body {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.batch-item-input-row { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
.btn-sub-add { font-size: 12px; font-weight: 700; color: #0284c7; background: none; border: none; cursor: pointer; text-align: left; padding: 4px 0; }
.btn-sub-add:hover { text-decoration: underline; }

/* Reference links edit list */
.ref-links-edit-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ref-link-input-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* Toggle */
.toggle-switch { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12.5px; font-weight: 600; color: #334155; }
.toggle-switch input { display: none; }
.toggle-slider { width: 36px; height: 20px; background: #cbd5e1; border-radius: 20px; position: relative; transition: all 0.2s; }
.toggle-slider::after { content: ''; position: absolute; width: 16px; height: 16px; background: #ffffff; border-radius: 50%; top: 2px; left: 2px; transition: all 0.2s; }
.toggle-switch input:checked + .toggle-slider { background: #0284c7; }
.toggle-switch input:checked + .toggle-slider::after { transform: translateX(16px); }

/* Summary card */
.summary-card { gap: 12px; position: sticky; top: 80px; }
.summary-row { display: flex; justify-content: space-between; font-size: 13px; color: #64748b; }
.summary-total { color: #0284c7; font-weight: 800; font-size: 16px; }

.print-btn {
  display: block; text-align: center; background: #f0fdf4; border: 1px solid #bbf7d0;
  border-radius: 8px; padding: 10px; color: #16a34a; font-size: 13px;
  font-weight: 700; text-decoration: none; transition: all 0.2s;
}
.print-btn:hover { background: #dcfce7; }
</style>
