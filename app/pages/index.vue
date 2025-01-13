<script setup>
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const { code } = route.query

  if (code) {
    try {
      const response = await $fetch('/api/auth/twitch', {
        method: 'POST',
        body: { code }
      })

      if (response.success) {
        localStorage.setItem('twitch_token', 'true')
        localStorage.setItem('user', JSON.stringify(response.user))
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Login error:', error)
      router.push('/login')
    }
  }
})
</script>

<template>
  <div v-if="route.query.code" class="loading">
    Authenticating...
  </div>
  <div v-else>
    <h1>Welcome to the App</h1>
    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
    <br>
    <NuxtLink to="/login">Login</NuxtLink>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
