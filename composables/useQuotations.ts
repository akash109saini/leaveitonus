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
  type?: 'video' | 'doc' | 'drive' | 'sheet' | 'link' | 'instagram'
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
  },
  {
    id: 'lious-quote-03',
    quotationNumber: 'LIOUS2026090601',
    companyName: 'Leave It On Us',
    providerSubtitle: 'Creator-Led Digital Marketing & Production Agency',
    providerContact: 'Contact / WhatsApp: +91 98765 43210',
    clientCompany: 'Shama Family Restaurant',
    clientName: 'Mr. Anas',
    clientPhone: '+91 93680 54043',
    clientEmail: '',
    clientAddress: '',
    serviceCategory: 'Social Media Handling & Meta Ads Growth Package',
    lineItems: [
      {
        serviceId: 'svc-smm-growth-suite',
        serviceName: 'Comprehensive Social Media Handling, Production & Meta Ads Growth Package',
        description: 'Complete all-inclusive monthly growth package including:\n• Social Media Handling: 10 high-retention food & ambiance reels, 5 custom graphic creatives, engaging copywriting, hashtag strategy & scheduling\n• 2 Professional On-Location Shoots: Dedicated camera shoots per month with professional lighting, food plating cinematography & interior ambiance capture\n• Meta Ads Management: Targeted local customer footfall & dining awareness campaigns optimized for 80,000+ guaranteed account reach',
        unit: 'Per Month (Complete Package)',
        qty: 1,
        unitPrice: 17000,
        total: 17000
      }
    ],
    enableBatchBreakdown: false,
    batchTitle: 'Monthly Growth Package Deliverables — Shama Family Restaurant',
    batchItems: [
      { description: 'Social Media Handling (10 Reels & 5 Creatives)', amount: 0 },
      { description: '2 Professional On-Location Shoots per Month', amount: 0 },
      { description: 'Meta Ads Management (80,000 Target Account Reach)', amount: 0 }
    ],
    batchTotalText: 'Total Retainer Price per Month:',
    batchTotalAmount: 17000,
    subtotal: 17000,
    taxPercent: 0,
    taxAmount: 0,
    discountPercent: 0,
    discountAmount: 0,
    grandTotal: 17000,
    currency: 'INR',
    date: 'September 06, 2026',
    validUntil: 'October 06, 2026',
    notes: 'Tailored social media & visual production growth package for Shama Family Restaurant to drive local footfall, customer engagement, and viral food reels.',
    referenceLinks: [
      {
        title: 'Food Experience Reel Reference',
        url: 'https://www.instagram.com/p/DWWI627CWvq/?hl=en',
        type: 'instagram'
      },
      {
        title: 'Creative & Graphic Post Reference',
        url: 'https://www.instagram.com/p/DZH7NliE22N/?hl=en',
        type: 'instagram'
      },
      {
        title: 'Influencer Marketing Reel Reference',
        url: 'https://www.instagram.com/p/DZZ9WCXBydf/?hl=en',
        type: 'instagram'
      },
      {
        title: 'Food & Ambiance Photography Reference',
        url: 'https://www.instagram.com/p/DU27Szlk7U4/?hl=en',
        type: 'instagram'
      },
      {
        title: 'Kitchen & Making Reel Reference',
        url: 'https://www.instagram.com/p/DXJMhxKiB63/',
        type: 'instagram'
      },
      {
        title: 'Presentation & Plating Reel Reference',
        url: 'https://www.instagram.com/p/DZ2acA9PhW8/',
        type: 'instagram'
      }
    ],
    termsTitle: 'Terms & Working Conditions',
    termsList: [
      '**Shooting Coordination:** On-location shoots are scheduled in advance with **Mr. Anas** during non-peak hours for optimal lighting and kitchen/staff availability.',
      '**Payment Terms:** **50% payment advance** required upon project confirmation / commencement of monthly services.',
      '**Meta Ad Spend:** Direct ad spend budget is paid through the client ad account for full financial transparency.'
    ],
    terms: '• Shooting Coordination: On-location shoots are scheduled in advance with **Mr. Anas** during non-peak hours for optimal lighting and kitchen/staff availability.\n• Payment Terms: **50% payment advance** required upon project confirmation / commencement of monthly services.\n• Meta Ad Spend: Direct ad spend budget is paid through the client ad account for full financial transparency.',
    status: 'sent',
    createdAt: '2026-09-06T10:00:00.000Z',
    updatedAt: '2026-09-06T10:00:00.000Z'
  },
  {
    id: 'lious-quote-04',
    quotationNumber: 'LIOUS2026090701',
    companyName: 'Leave It On Us',
    providerSubtitle: 'Creator-Led Digital Marketing & Production Agency',
    providerContact: 'Contact / WhatsApp: +91 98765 43210',
    clientCompany: 'Healthophia',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientAddress: '',
    serviceCategory: 'Full-Stack Performance Marketing, Social Media & Digital Operations',
    lineItems: [
      {
        serviceId: 'svc-healthophia-perf-mktg',
        serviceName: 'Full-Stack Digital Marketing & Creator Engine (Healthophia)',
        description: 'Comprehensive monthly performance marketing, content production & digital operations suite for Healthophia:\n• 14 High Quality Reels (covering all 7 departments with customized Healthophia branding)\n• 20–25 Custom Graphic Creatives & Campaign Banners\n• 5 Engaging Stories (Interactive Q&As, health tips, quizzes & highlights)\n• Website Management & Timely Content Updates\n• Google My Business (GMB) & Google Maps Optimization for all departments\n• Leads Management Sheets & Real-Time CRM Tracking\n• Target Account Reach: Around 1.5 – 2 Lakh Instagram & Meta Reach\n• Professional Reel Scripting & Concept Storyboarding\n• Creative Copywriting & High-Converting Captions\n• Major Festivals Wishing Creatives & Announcements\n• 3–4 Professional On-Site Shoots per Month\n• End-to-End Meta Ads Management (Audience Targeting, Creative Testing & ROAS Scaling across Instagram & Facebook)',
        unit: 'Per Month (Complete Package)',
        qty: 1,
        unitPrice: 85000,
        total: 85000
      }
    ],
    enableBatchBreakdown: false,
    batchTitle: 'Monthly Growth & Performance Deliverables — Healthophia',
    batchItems: [
      { description: '14 High Quality Departmental Reels & Scripting', amount: 0 },
      { description: '20–25 Custom Creatives & Campaign Banners', amount: 0 },
      { description: '5 Engaging Interactive Stories', amount: 0 },
      { description: 'Website Management & Content Updates', amount: 0 },
      { description: 'GMB Optimization for All Departments', amount: 0 },
      { description: 'Leads Management Sheets & CRM Tracking', amount: 0 },
      { description: 'Around 1.5 – 2 Lakh Instagram Account Reach', amount: 0 },
      { description: '3–4 Professional On-Site Shoots per Month', amount: 0 },
      { description: 'End-to-End Meta Ads Management (Instagram & Facebook)', amount: 0 }
    ],
    batchTotalText: 'Total Retainer Price per Month:',
    batchTotalAmount: 85000,
    subtotal: 85000,
    taxPercent: 0,
    taxAmount: 0,
    discountPercent: 0,
    discountAmount: 0,
    grandTotal: 85000,
    currency: 'INR',
    date: 'September 07, 2026',
    validUntil: 'October 07, 2026',
    notes: 'Comprehensive monthly social media performance marketing, multi-department visual content production, GMB, website and leads management suite tailored for Healthophia.',
    referenceLinks: [],
    termsTitle: 'Terms & Working Conditions',
    termsList: [
      '**Payment Terms:** **50% advance payment** required upon project confirmation / commencement of monthly services.',
      '**On-Site Shoot Scheduling:** On-site shoots should be **scheduled at least one day in advance** for team and equipment planning.',
      '**Direct Ad Spend:** Direct ad spend budget is **paid directly by the client** through their Meta ad account.',
      '**Talent & Model Costs:** Model and influencer fees (if applicable) are **paid directly by the client**.'
    ],
    terms: '• Payment Terms: **50% advance payment** required upon project confirmation / commencement of monthly services.\n• On-Site Shoot Scheduling: On-site shoots should be **scheduled at least one day in advance** for team and equipment planning.\n• Direct Ad Spend: Direct ad spend budget is **paid directly by the client** through their Meta ad account.\n• Talent & Model Costs: Model and influencer fees (if applicable) are **paid directly by the client**.',
    status: 'sent',
    createdAt: '2026-09-07T12:00:00.000Z',
    updatedAt: '2026-09-07T12:00:00.000Z'
  },
  {
    id: 'lious-quote-05',
    quotationNumber: 'LIOUS2026090801',
    companyName: 'Leave It On Us',
    providerSubtitle: 'Creator-Led Digital Marketing & Production Agency',
    providerContact: 'Contact / WhatsApp: +91 98765 43210',
    clientCompany: 'DMR Hospital',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    clientAddress: '',
    serviceCategory: 'Healthcare Web Architecture, Portal & Management System',
    lineItems: [
      {
        serviceId: 'svc-dmr-hospital-web',
        serviceName: 'DMR Hospital Website & Patient Management Portal',
        description: 'Full-scale custom healthcare portal, advanced patient management & multi-role web platform for DMR Hospital:\n• Advanced Doctor Directory with department, specialty & search filters\n• Detailed Doctor Profiles (Qualifications, bio, OPD schedule, consulting fee & booking CTA)\n• Multi-Role & Admin Access (Super Admin, Hospital Desk, Department Managers & Doctors)\n• New Patient Online Registration & Instant OPD Appointment Booking\n• Follow-up Appointment Booking & Record Lookup\n• Automated Reminders & Real-time Notifications for registrations and appointment confirmations (SMS/WhatsApp/Email)\n• Seamless Appointment Rescheduling & Cancellation workflow\n• Comprehensive Healthcare CMS: Blogs, Health Tips & Medical News management\n• Full Suite of Hospital Pages: Patient Testimonials & Video Reviews, Insurance & TPA Desk Info, About Hospital & Leadership, Department Pages, Doctors Roster, Photo/Video Gallery, Contact & Emergency 24/7 Desk, Camps & Events Page\n• Dedicated Doctor Admin Panel (Personal OPD schedule, appointment calendar, patient queue & daily OPD list)\n• Responsive Mobile-First Architecture, High-Speed Performance & SSL Security',
        unit: 'Complete Web Platform & Portal',
        qty: 1,
        unitPrice: 90000,
        total: 90000
      }
    ],
    enableBatchBreakdown: false,
    batchTitle: 'Full Healthcare Platform Deliverables — DMR Hospital',
    batchItems: [
      { description: 'Advanced Doctor Directory, Search & Detailed Doctor Profiles', amount: 0 },
      { description: 'New Patient Registration, OPD Booking & Follow-up Workflow', amount: 0 },
      { description: 'Automated Notifications & Reminders (SMS/WhatsApp/Email)', amount: 0 },
      { description: 'Dedicated Doctor Admin Panel & Multi-Role Access', amount: 0 },
      { description: 'Full Hospital Pages Suite, Insurance/TPA Desk & Video Reviews', amount: 0 },
      { description: 'Blogs & Health Tips Content Management System (CMS)', amount: 0 }
    ],
    batchTotalText: 'Total Project Cost (Turnkey Platform):',
    batchTotalAmount: 90000,
    subtotal: 90000,
    taxPercent: 0,
    taxAmount: 0,
    discountPercent: 0,
    discountAmount: 0,
    grandTotal: 90000,
    currency: 'INR',
    date: 'September 08, 2026',
    validUntil: 'October 08, 2026',
    notes: 'Complete turnkey healthcare website, patient OPD booking system, doctor management panel, and hospital digital presence suite designed specifically for DMR Hospital.',
    referenceLinks: [],
    termsTitle: 'Terms & Working Conditions',
    termsList: [
      '**Payment Milestone Terms:** **50% advance upon project sign-off**, **30% upon beta portal review/staging approval**, and **20% upon final deployment & domain go-live**.',
      '**Development & Delivery Timeline:** Standard delivery within **4 to 6 weeks** from receiving hospital assets, doctor data, and credentials.',
      '**Support & Maintenance:** Includes **1 full year of technical support**, SSL certificate configuration, server deployment, and database backup routines.',
      '**Third-Party Gateways:** SMS / WhatsApp gateway credits and Payment Gateway account charges are billed directly on actuals.'
    ],
    terms: '• Payment Milestone Terms: **50% advance upon project sign-off**, **30% upon beta portal review/staging approval**, and **20% upon final deployment & domain go-live**.\n• Development & Delivery Timeline: Standard delivery within **4 to 6 weeks** from receiving hospital assets, doctor data, and credentials.\n• Support & Maintenance: Includes **1 full year of technical support**, SSL certificate configuration, server deployment, and database backup routines.\n• Third-Party Gateways: SMS / WhatsApp gateway credits and Payment Gateway account charges are billed directly on actuals.',
    status: 'sent',
    createdAt: '2026-09-08T10:00:00.000Z',
    updatedAt: '2026-09-08T10:00:00.000Z'
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
  { id: 'svc-8', name: 'Healthcare Web Architecture & Patient Portal', description: 'Custom hospital portal, doctor directory, appointment booking, and multi-role admin system.', unit: 'Per Project', defaultUnitPrice: 90000, category: 'Production' }
]

const { read: readQ, write: writeQ } = useAdminStorage<Quotation[]>(QUOTATIONS_KEY, SAMPLE_QUOTATIONS)
const { read: readS, write: writeS } = useAdminStorage<ServiceItem[]>(SERVICES_KEY, DEFAULT_SERVICES)

const SEED_FLAG_KEY = 'lious_quotes_v7_dmr_hospital'

export function useQuotations() {
  const getQuotations = (): Quotation[] => {
    let list = readQ()
    // Initial seed if no data exists at all
    if (!list || !Array.isArray(list) || list.length === 0) {
      writeQ(SAMPLE_QUOTATIONS)
      return SAMPLE_QUOTATIONS
    }

    // One-time legacy cleanup if old Webnetworx samples are detected
    if (list.some(q => q.companyName === 'Webnetworx')) {
      const cleaned = list.filter(q => q.companyName !== 'Webnetworx')
      for (const sample of SAMPLE_QUOTATIONS) {
        if (!cleaned.some(q => q.id === sample.id || q.quotationNumber === sample.quotationNumber)) {
          cleaned.push({ ...sample })
        }
      }
      writeQ(cleaned)
      return cleaned
    }

    // One-time sync / update to ensure default sample quotations (Healthophia & DMR Hospital) exist and are up to date
    if (import.meta.client && localStorage.getItem(SEED_FLAG_KEY) !== 'true') {
      let modified = false
      for (const sample of SAMPLE_QUOTATIONS) {
        const idx = list.findIndex(q => q.id === sample.id || q.quotationNumber === sample.quotationNumber)
        if (idx === -1) {
          list.push({ ...sample })
          modified = true
        } else if (sample.id === 'lious-quote-04' || sample.quotationNumber === 'LIOUS2026090701' || sample.id === 'lious-quote-05' || sample.quotationNumber === 'LIOUS2026090801') {
          list[idx] = { ...sample }
          modified = true
        }
      }
      if (modified) writeQ(list)
      try {
        localStorage.setItem(SEED_FLAG_KEY, 'true')
      } catch {}
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
