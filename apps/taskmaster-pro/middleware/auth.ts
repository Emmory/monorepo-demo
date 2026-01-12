export default defineNuxtRouteMiddleware((to, from) => {
  const { checkAuth, isAuthenticated } = useAuth()
  
  if (process.client) {
    checkAuth()
  }
  
  if (!isAuthenticated.value && to.path !== '/login') {
    return navigateTo('/login')
  }
  
  if (isAuthenticated.value && to.path === '/login') {
    return navigateTo('/dashboard')
  }
})