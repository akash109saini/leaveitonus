import { useAdminStorage, adminGenerateId } from './useAdminStorage'

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  company: string
  services: string[]
  budget: string
  message: string
  status: 'new' | 'in-progress' | 'closed'
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'lious_enquiries'
const { read, write } = useAdminStorage<Enquiry[]>(STORAGE_KEY, [])

export function useEnquiries() {
  const getEnquiries = (): Enquiry[] => read()

  const getEnquiry = (id: string): Enquiry | undefined =>
    read().find((e) => e.id === id)

  const createEnquiry = (data: Omit<Enquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Enquiry => {
    const list = read()
    const now = new Date().toISOString()
    const enquiry: Enquiry = { ...data, id: adminGenerateId(), status: 'new', createdAt: now, updatedAt: now }
    write([enquiry, ...list])
    return enquiry
  }

  const updateEnquiry = (id: string, data: Partial<Enquiry>): Enquiry | null => {
    const list = read()
    const idx = list.findIndex((e) => e.id === id)
    if (idx === -1) return null
    const updated = { ...list[idx], ...data, updatedAt: new Date().toISOString() }
    list[idx] = updated
    write(list)
    return updated
  }

  const deleteEnquiry = (id: string): boolean => {
    const list = read()
    const filtered = list.filter((e) => e.id !== id)
    if (filtered.length === list.length) return false
    write(filtered)
    return true
  }

  const getNewCount = (): number => read().filter((e) => e.status === 'new').length

  return { getEnquiries, getEnquiry, createEnquiry, updateEnquiry, deleteEnquiry, getNewCount }
}
