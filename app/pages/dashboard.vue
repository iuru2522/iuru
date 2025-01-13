<script setup>
definePageMeta({
  middleware: ['auth']
})

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('twitch_token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<template>
  <h1>Welcome to Dashboard!</h1>

  <button @click="handleLogout">
    Logout
  </button>
</template>