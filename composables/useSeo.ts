import { useAdminStorage } from './useAdminStorage'

export interface PageSeo {
  pageKey: string
  pageLabel: string
  title: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  canonical: string
  robots: string
  schema: string
}

const DEFAULT_PAGES: PageSeo[] = [
  {
    pageKey: 'home', pageLabel: 'Home',
    title: 'Leave It On Us — Creator-Led Digital Marketing & Production Agency',
    metaDescription: 'Build Attention & Scale Revenue with Creator-Led Marketing, Performance Ads, Talent Strategy, and Original Content IP. Leave It On Us.',
    ogTitle: 'Leave It On Us', ogDescription: 'Creator-Led Digital Marketing & Production Agency', ogImage: '', canonical: '', robots: 'index, follow', schema: ''
  },
  {
    pageKey: 'about', pageLabel: 'About',
    title: 'About Us — Leave It On Us',
    metaDescription: 'Learn about the team behind Leave It On Us — a creator-first marketing and production agency.',
    ogTitle: 'About — Leave It On Us', ogDescription: 'Our story, mission and team.', ogImage: '', canonical: '', robots: 'index, follow', schema: ''
  },
  {
    pageKey: 'blogs', pageLabel: 'Blogs',
    title: 'Blog — Leave It On Us',
    metaDescription: 'Insights, case studies and industry thinking from the Leave It On Us team.',
    ogTitle: 'Blog — Leave It On Us', ogDescription: 'Marketing insights and case studies.', ogImage: '', canonical: '', robots: 'index, follow', schema: ''
  },
  {
    pageKey: 'clients', pageLabel: 'Clients',
    title: 'Our Clients — Leave It On Us',
    metaDescription: 'Brands that trust Leave It On Us for creator-led marketing and production.',
    ogTitle: 'Clients — Leave It On Us', ogDescription: 'Our client portfolio.', ogImage: '', canonical: '', robots: 'index, follow', schema: ''
  },
  {
    pageKey: 'work', pageLabel: 'Work',
    title: 'Our Work — Leave It On Us',
    metaDescription: 'Case studies and campaign results from Leave It On Us.',
    ogTitle: 'Work — Leave It On Us', ogDescription: 'Award-winning campaigns.', ogImage: '', canonical: '', robots: 'index, follow', schema: ''
  },
  {
    pageKey: 'contact', pageLabel: 'Contact',
    title: 'Contact Us — Leave It On Us',
    metaDescription: 'Get in touch with the Leave It On Us team to start your next campaign.',
    ogTitle: 'Contact — Leave It On Us', ogDescription: 'Start your project today.', ogImage: '', canonical: '', robots: 'index, follow', schema: ''
  },
]

const STORAGE_KEY = 'lious_seo'
const { read, write } = useAdminStorage<PageSeo[]>(STORAGE_KEY, DEFAULT_PAGES)

export function useSeo() {
  const getAllPages = (): PageSeo[] => {
    const stored = read()
    // Merge defaults with stored (ensure new pages are included)
    const merged = DEFAULT_PAGES.map((def) => {
      const found = stored.find((s) => s.pageKey === def.pageKey)
      return found ?? def
    })
    return merged
  }

  const getPage = (pageKey: string): PageSeo => {
    const pages = getAllPages()
    return pages.find((p) => p.pageKey === pageKey) ?? DEFAULT_PAGES[0]
  }

  const updatePage = (pageKey: string, data: Partial<PageSeo>): PageSeo => {
    const all = getAllPages()
    const idx = all.findIndex((p) => p.pageKey === pageKey)
    if (idx === -1) {
      const newPage = { ...DEFAULT_PAGES[0], ...data, pageKey }
      write([...all, newPage])
      return newPage
    }
    all[idx] = { ...all[idx], ...data }
    write(all)
    return all[idx]
  }

  return { getAllPages, getPage, updatePage }
}
