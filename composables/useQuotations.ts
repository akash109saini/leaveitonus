import { useAdminStorage, adminGenerateId } from './useAdminStorage'

export interface ServiceItem {
  id: string
  name: string
  description: string
  unit: string
  defaultUnitPrice: number
  category: string
}

export interface QuotationLineItem {
  serviceId?: string
  serviceName: string
  description: string
  unit: string
  qty: number
  unitPrice: number
  total: number
}

export interface BatchItem {
  description: string
  amount: number
}

export interface ReferenceLink {
  title: string
  url: string
  type?: 'video' | 'doc' | 'drive' | 'sheet' | 'link'
}

export interface Quotation {
  id: string
  quotationNumber: string
  companyName: string
  providerSubtitle?: string
  providerContact?: string
  clientName: string
  clientCompany: string
  clientEmail?: string
  clientPhone: string
  clientAddress: string
  serviceCategory: string
  lineItems: QuotationLineItem[]
  enableBatchBreakdown?: boolean
  batchTitle?: string
  batchItems?: BatchItem[]
  batchTotalText?: string
  batchTotalAmount?: number
  referenceLinks?: ReferenceLink[]
  subtotal: number
  taxPercent: number
  taxAmount: number
  discountPercent: number
  discountAmount: number
  grandTotal: number
  currency: string
  date: string
  validUntil: string
  notes: string
  termsTitle?: string
  termsList?: string[]
  terms: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected'
  createdAt: string
  updatedAt: string
}

const QUOTATIONS_KEY = 'lious_quotations'
const SERVICES_KEY = 'lious_services'

// Seed initial digital marketing quotations with Leave It On Us branding
const SAMPLE_QUOTATIONS: Quotation[] = [
  {
    id: 'lious-quote-01',
    quotationNumber: 'LIOUS2026082801',
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
        serviceId: 'svc-reels-ip',
        serviceName: 'Short-Form Video Production & Reels IP',
        description: '15 cinematic vertical reels/shorts per month with viral hook scripting, professional studio/on-location shoot, and high-retention pacing.',
        unit: 'Per Month (15 Reels)',
        qty: 1,
        unitPrice: 45000,
        total: 45000
      },
      {
        serviceId: 'svc-ads-scale',
        serviceName: 'Meta & Google Ads Performance Scaling',
        description: 'End-to-end media buying, audience testing, dynamic ad creative iterations, ROAS optimization, and weekly performance reporting.',
        unit: 'Per Month',
        qty: 1,
        unitPrice: 35000,
        total: 35000
      },
      {
        serviceId: 'svc-creator-seed',
        serviceName: 'Creator & Influencer Sourcing & Seeding',
        description: 'Campaign management with 10 vetted lifestyle and fashion creators, script briefs, usage rights acquisition, and engagement tracking.',
        unit: 'Per Campaign (10 Creators)',
        qty: 1,
        unitPrice: 40000,
        total: 40000
      },
      {
        serviceId: 'svc-seo-suite',
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
    subtotal: 140000,
    taxPercent: 0,
    taxAmount: 0,
    discountPercent: 0,
    discountAmount: 0,
    grandTotal: 140000,
    currency: 'INR',
    date: 'August 28, 2026',
    validUntil: 'September 28, 2026',
    notes: 'Package tailored for scaling direct-to-consumer revenue and brand attention.',
    referenceLinks: [
      { title: 'Brand Aesthetic & Visual Moodboard Reel', url: 'https://youtube.com/shorts/sample1', type: 'video' },
      { title: 'Content Calendar & Strategy Playbook', url: 'https://docs.google.com/document/d/sample-doc', type: 'doc' }
    ],
    termsTitle: 'Terms & Working Conditions',
    termsList: [
      '**Creative Strategy Kickoff:** Dedicated script briefs & visual moodboards delivered within **3 working days** of agreement.',
      '**Content Revisions:** Includes **2 rounds of feedback and revisions** per video asset prior to final publishing.',
      '**Transparent Reporting:** Bi-weekly growth review calls and **24/7 real-time dashboard** access provided.'
    ],
    terms: '• Creative Strategy Kickoff: Dedicated script briefs & visual moodboards delivered within **3 working days** of agreement.\n• Content Revisions: Includes **2 rounds of feedback and revisions** per video asset prior to final publishing.\n• Transparent Reporting: Bi-weekly growth review calls and **24/7 real-time dashboard** access provided.',
    status: 'sent',
    createdAt: '2026-08-28T10:00:00.000Z',
    updatedAt: '2026-08-28T10:00:00.000Z'
  },
  {
    id: 'lious-quote-02',
    quotationNumber: 'LIOUS2026090101',
    companyName: 'Leave It On Us',
    providerSubtitle: 'Creator-Led Digital Marketing & Production Agency',
    providerContact: 'Contact / WhatsApp: +91 98765 43210',
    clientCompany: 'Zenith Health & Nutrition',
    clientName: 'Mr. Rohit Mehra',
    clientPhone: '+91 97112 88990',
    clientEmail: '',
    clientAddress: 'Indiranagar, Bengaluru, Karnataka',
    serviceCategory: 'Social Media Management & Paid Ads Funnel',
    lineItems: [
      {
        serviceId: 'svc-smm-pro',
        serviceName: 'Social Media Channel Management',
        description: 'Daily reel and carousel publishing on Instagram & LinkedIn, caption copywriting, active community engagement, and hashtag strategy.',
        unit: 'Per Month',
        qty: 1,
        unitPrice: 30000,
        total: 30000
      },
      {
        serviceId: 'svc-ugc-ads',
        serviceName: 'High-Converting UGC Ad Creatives',
        description: 'Batch of 8 high-performing User Generated Content (UGC) video hooks and problem-solution angles for paid Meta ads.',
        unit: 'Per Batch (8 Creatives)',
        qty: 1,
        unitPrice: 32000,
        total: 32000
      },
      {
        serviceId: 'svc-meta-ads',
        serviceName: 'Paid Ads Funnel Management & Media Buying',
        description: 'Meta & Google Ads campaign architecture, retargeting funnels, custom audience building, and weekly budget allocation.',
        unit: 'Per Month',
        qty: 1,
        unitPrice: 28000,
        total: 28000
      }
    ],
    enableBatchBreakdown: true,
    batchTitle: 'Quarterly Retainer Pricing Breakdown',
    batchItems: [
      { description: 'Complete Organic Social Media Management:', amount: 30000 },
      { description: '8 High-Converting UGC Video Ad Creatives:', amount: 32000 },
      { description: 'Paid Meta & Google Ads Media Buying:', amount: 28000 }
    ],
    batchTotalText: 'Total Retainer per Month:',
    batchTotalAmount: 90000,
    subtotal: 90000,
    taxPercent: 0,
    taxAmount: 0,
    discountPercent: 0,
    discountAmount: 0,
    grandTotal: 90000,
    currency: 'INR',
    date: 'September 01, 2026',
    validUntil: 'October 01, 2026',
    notes: 'Designed to establish market authority and scale paid customer acquisition profitably.',
    referenceLinks: [
      { title: 'Meta Ads Retargeting Architecture Flowchart', url: 'https://whimsical.com/sample-flow', type: 'doc' },
      { title: 'High-Converting UGC Hook Examples (Drive Folder)', url: 'https://drive.google.com/drive/folders/sample', type: 'drive' }
    ],
    termsTitle: 'Terms & Working Conditions',
    termsList: [
      '**Competitor & Brand Audit:** Complete organic and paid media audit provided **free of cost** upon project signup.',
      '**Ad Spend Transparency:** Media ad spend is billed directly through client ad accounts for 100% transparency.',
      '**Retainer Period:** Standard **3-month trial period** with 30-day notice thereafter.'
    ],
    terms: '• Competitor & Brand Audit: Complete organic and paid media audit provided **free of cost** upon project signup.\n• Ad Spend Transparency: Media ad spend is billed directly through client ad accounts for 100% transparency.\n• Retainer Period: Standard **3-month trial period** with 30-day notice thereafter.',
    status: 'accepted',
    createdAt: '2026-09-01T11:30:00.000Z',
    updatedAt: '2026-09-01T11:30:00.000Z'
  }
]

const DEFAULT_SERVICES: ServiceItem[] = [
  { id: 'svc-1', name: 'Short-Form Video Production & Reels IP', description: 'Cinematic vertical reels/shorts with viral hook scripting, shoot, and high-retention pacing.', unit: 'Per Month', defaultUnitPrice: 45000, category: 'Content' },
  { id: 'svc-2', name: 'Meta & Google Ads Performance Scaling', description: 'End-to-end media buying, audience testing, ad creative iterations, and ROAS optimization.', unit: 'Per Month', defaultUnitPrice: 35000, category: 'Performance' },
  { id: 'svc-3', name: 'Creator & Influencer Marketing', description: 'Campaign management with vetted creators, script briefs, usage rights, and tracking.', unit: 'Per Campaign', defaultUnitPrice: 40000, category: 'Influencer' },
  { id: 'svc-4', name: 'Social Media Channel Management', description: 'Daily reels/carousels publishing, community management, and growth hacks.', unit: 'Per Month', defaultUnitPrice: 30000, category: 'Social' },
  { id: 'svc-5', name: 'High-Converting UGC Video Creatives', description: 'Batch of 8 authentic UGC video variations and problem-solution angles for paid ads.', unit: 'Per Batch', defaultUnitPrice: 32000, category: 'Content' },
  { id: 'svc-6', name: 'Brand Commercial / TVC Production', description: 'Full-scale cinematic commercial production with VFX, color grading, and sound design.', unit: 'Per Video', defaultUnitPrice: 150000, category: 'Production' },
  { id: 'svc-7', name: 'On-Page SEO & Content Strategy', description: 'Technical SEO audit, keyword mapping, high-intent blog publishing, and rank tracking.', unit: 'Per Month', defaultUnitPrice: 20000, category: 'Digital' },
]

const { read: readQ, write: writeQ } = useAdminStorage<Quotation[]>(QUOTATIONS_KEY, SAMPLE_QUOTATIONS)
const { read: readS, write: writeS } = useAdminStorage<ServiceItem[]>(SERVICES_KEY, DEFAULT_SERVICES)

export function useQuotations() {
  const getQuotations = (): Quotation[] => {
    const list = readQ()
    // If the list is empty or still contains old webnetworx samples or old ref formats (less than 15 chars), update with fresh Leave It On Us quotations
    if (!list || list.length === 0 || list.some(q => q.companyName === 'Webnetworx' || q.quotationNumber?.includes('/DM/') || (q.quotationNumber?.length ?? 0) < 15)) {
      writeQ(SAMPLE_QUOTATIONS)
      return SAMPLE_QUOTATIONS
    }
    return list
  }

  const getQuotation = (id: string): Quotation | undefined => {
    const list = getQuotations()
    return list.find((q) => q.id === id)
  }

  const generateQuotationNumber = (): string => {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const datePrefix = `LIOUS${yyyy}${mm}${dd}`
    
    // Calculate sequence number for today
    const list = readQ() || []
    const todayQuotes = list.filter(q => q.quotationNumber?.startsWith(datePrefix))
    const seq = String(todayQuotes.length + 1).padStart(2, '0')
    return `${datePrefix}${seq}`
  }

  const createQuotation = (data: Omit<Quotation, 'id' | 'createdAt' | 'updatedAt'>): Quotation => {
    const list = getQuotations()
    const now = new Date().toISOString()
    const q: Quotation = {
      ...data,
      id: adminGenerateId(),
      quotationNumber: data.quotationNumber || generateQuotationNumber(),
      companyName: data.companyName || 'Leave It On Us',
      providerSubtitle: data.providerSubtitle || 'Creator-Led Digital Marketing & Production Agency',
      providerContact: data.providerContact || 'Contact / WhatsApp: +91 98765 43210 · hello@leaveitonus.com',
      createdAt: now,
      updatedAt: now
    }
    writeQ([q, ...list])
    return q
  }

  const updateQuotation = (id: string, data: Partial<Quotation>): Quotation | null => {
    const list = getQuotations()
    const idx = list.findIndex((q) => q.id === id)
    if (idx === -1) return null
    const updated = { ...list[idx], ...data, updatedAt: new Date().toISOString() }
    list[idx] = updated
    writeQ(list)
    return updated
  }

  const deleteQuotation = (id: string): boolean => {
    const list = getQuotations()
    const filtered = list.filter((q) => q.id !== id)
    if (filtered.length === list.length) return false
    writeQ(filtered)
    return true
  }

  // Services
  const getServices = (): ServiceItem[] => {
    const list = readS()
    if (!list || list.length === 0) {
      writeS(DEFAULT_SERVICES)
      return DEFAULT_SERVICES
    }
    return list
  }

  const getService = (id: string): ServiceItem | undefined => getServices().find((s) => s.id === id)

  const createService = (data: Omit<ServiceItem, 'id'>): ServiceItem => {
    const list = getServices()
    const s: ServiceItem = { ...data, id: adminGenerateId() }
    writeS([...list, s])
    return s
  }

  const updateService = (id: string, data: Partial<ServiceItem>): ServiceItem | null => {
    const list = getServices()
    const idx = list.findIndex((s) => s.id === id)
    if (idx === -1) return null
    list[idx] = { ...list[idx], ...data }
    writeS(list)
    return list[idx]
  }

  const deleteService = (id: string): boolean => {
    const list = getServices()
    const filtered = list.filter((s) => s.id !== id)
    if (filtered.length === list.length) return false
    writeS(filtered)
    return true
  }

  return {
    getQuotations, getQuotation, createQuotation, updateQuotation, deleteQuotation,
    getServices, getService, createService, updateService, deleteService
  }
}
