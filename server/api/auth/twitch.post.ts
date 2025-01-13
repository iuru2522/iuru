interface TwitchTokenResponse {
  access_token: string;
}

interface TwitchUserResponse {
  data: Array<{
    id: string;
    login: string;
    display_name: string;
    email?: string;
  }>;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { code } = await readBody(event)

  if (!code) {
    throw createError({
      statusCode: 400,
      message: 'Authorization code is required'
    })
  }

  try {
    console.log('Attempting to exchange code for token...')
    
    const tokenResponse = await $fetch<TwitchTokenResponse>('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: config.public.TWITCH_CLIENT_ID,
        client_secret: config.TWITCH_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.public.TWITCH_REDIRECT_URI
      }).toString()
    })

    console.log('Token received, fetching user info...')

    const userResponse = await $fetch<TwitchUserResponse>('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${tokenResponse.access_token}`,
        'Client-Id': config.public.TWITCH_CLIENT_ID
      }
    })

    console.log('User info received:', userResponse.data[0].display_name)

    return {
      success: true,
      user: userResponse.data[0]
    }
  } catch (error: any) {
    console.error('Twitch authentication error details:', {
      message: error.message,
      data: error.data,
      stack: error.stack
    })
    
    throw createError({
      statusCode: 500,
      message: `Authentication failed: ${error.message}`,
      cause: error
    })
  }
}) 