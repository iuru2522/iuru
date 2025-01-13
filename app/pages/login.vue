<script setup>
const config = useRuntimeConfig()

const handleTwitchLogin = () => {
  // Debug log to check if we're getting the values
  console.log('Config values:', {
    clientId: config.public.TWITCH_CLIENT_ID,
    redirectUri: config.public.TWITCH_REDIRECT_URI
  })

  const twitchAuthUrl = new URL('https://id.twitch.tv/oauth2/authorize')
  
  // Add null checks and default values
  const params = {
    client_id: config.public.TWITCH_CLIENT_ID || '',
    redirect_uri: config.public.TWITCH_REDIRECT_URI || '',
    response_type: 'code',
    scope: 'user:read:email'
  }

  // Log the final URL for debugging
  console.log('Auth URL params:', params)

  Object.entries(params).forEach(([key, value]) => {
    twitchAuthUrl.searchParams.append(key, value)
  })

  window.location.href = twitchAuthUrl.toString()
}
</script>

<template>
  <div class="login-container">
    <button @click="handleTwitchLogin" class="twitch-button">
      Login with Twitch
    </button>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.twitch-button {
  background-color: #9146FF;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.twitch-button:hover {
  background-color: #7d3cdb;
}
</style>