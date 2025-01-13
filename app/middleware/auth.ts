export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('twitch_token')
  
  if (!token && to.path !== '/login') {
    return navigateTo('/login')
  }
}) 