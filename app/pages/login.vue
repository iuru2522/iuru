<script setup>
const config = useRuntimeConfig()

const handleTwitchLogin = () => {
  const twitchAuthUrl = new URL('https://id.twitch.tv/oauth2/authorize')
  twitchAuthUrl.searchParams.append('client_id', config.public.TWITCH_CLIENT_ID)
  twitchAuthUrl.searchParams.append('redirect_uri', encodeURI(config.public.TWITCH_REDIRECT_URI.trim()))
  twitchAuthUrl.searchParams.append('response_type', 'code')
  twitchAuthUrl.searchParams.append('scope', 'user:read:email')

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