<script setup>
const config = useRuntimeConfig()

const handleTwitchLogin = () => {
  // Show values on the page instead of console
  const values = {
    clientId: config.public.TWITCH_CLIENT_ID,
    redirectUri: config.public.TWITCH_REDIRECT_URI
  }

  if (!values.clientId || !values.redirectUri) {
    alert('Missing environment variables. Check Cloudflare configuration.')
    return
  }

  const twitchAuthUrl = new URL('https://id.twitch.tv/oauth2/authorize')
  const params = {
    client_id: values.clientId,
    redirect_uri: values.redirectUri,
    response_type: 'code',
    scope: 'user:read:email'
  }

  window.location.href = twitchAuthUrl.toString() + '?' + new URLSearchParams(params)
}
</script>

<template>
  <div class="login-container">
    <div v-if="!config.public.TWITCH_CLIENT_ID || !config.public.TWITCH_REDIRECT_URI" class="error">
      Environment variables missing:
      <pre>
        TWITCH_CLIENT_ID: {{ config.public.TWITCH_CLIENT_ID || 'missing' }}
        TWITCH_REDIRECT_URI: {{ config.public.TWITCH_REDIRECT_URI || 'missing' }}
      </pre>
    </div>
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

.error {
  color: red;
  margin-bottom: 20px;
}
pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}
</style>