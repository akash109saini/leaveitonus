// Shared localStorage helper for admin data persistence
export function useAdminStorage<T>(key: string, defaultValue: T) {
  const read = (): T => {
    if (import.meta.server) return defaultValue
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const write = (value: T): void => {
    if (import.meta.server) return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error('Storage write error', e)
    }
  }

  return { read, write }
}

export function adminGenerateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

