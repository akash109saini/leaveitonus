export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware for login page
  if (to.path === '/admin/login') return

  // Only guard admin routes
  if (to.path.startsWith('/admin')) {
    if (import.meta.client) {
      const isAuth = sessionStorage.getItem('admin_auth')
      if (!isAuth) {
        return navigateTo('/admin/login')
      }
    }
  }
})
