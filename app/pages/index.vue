<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const error = ref<string | null>(null)

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
    } catch (err) {
      console.error('Login error:', err)
      error.value = err instanceof Error ? err.message : 'Authentication failed'
      // Wait a bit before redirecting to show the error
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
  }
})
</script>

<template>
  <div v-if="route.query.code" class="loading">
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-else>
      Authenticating...
    </div>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
