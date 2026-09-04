import { useAdminStorage, adminGenerateId } from './useAdminStorage'

export interface Blog {
  id: string
  title: string
  slug: string
  author: string
  category: string
  tags: string[]
  coverImage: string
  excerpt: string
  body: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'lious_blogs'
const { read, write } = useAdminStorage<Blog[]>(STORAGE_KEY, [])

export function useBlogs() {
  const getBlogs = (): Blog[] => read()

  const getBlog = (id: string): Blog | undefined =>
    read().find((b) => b.id === id)

  const createBlog = (data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog => {
    const blogs = read()
    const now = new Date().toISOString()
    const blog: Blog = { ...data, id: adminGenerateId(), createdAt: now, updatedAt: now }
    write([...blogs, blog])
    return blog
  }

  const updateBlog = (id: string, data: Partial<Blog>): Blog | null => {
    const blogs = read()
    const idx = blogs.findIndex((b) => b.id === id)
    if (idx === -1) return null
    const updated = { ...blogs[idx], ...data, updatedAt: new Date().toISOString() }
    blogs[idx] = updated
    write(blogs)
    return updated
  }

  const deleteBlog = (id: string): boolean => {
    const blogs = read()
    const filtered = blogs.filter((b) => b.id !== id)
    if (filtered.length === blogs.length) return false
    write(filtered)
    return true
  }

  return { getBlogs, getBlog, createBlog, updateBlog, deleteBlog }
}
