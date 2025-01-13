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
    const tokenResponse = await $fetch<TwitchTokenResponse>('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: config.public.TWITCH_CLIENT_ID as string,
        client_secret: config.TWITCH_CLIENT_SECRET as string,
        code: code as string,
        grant_type: 'authorization_code',
        redirect_uri: config.public.TWITCH_REDIRECT_URI as string
      })
    })

    // Get user info using the access token
    const userResponse = await $fetch<TwitchUserResponse>('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${tokenResponse.access_token}`,
        'Client-Id': config.public.TWITCH_CLIENT_ID as string
      }
    })

    // Here you would typically:
    // 1. Create or update user in your database
    // 2. Create a session
    // 3. Set cookies or tokens

    return {
      success: true,
      user: userResponse.data[0]
    }
  } catch (error) {
    console.error('Twitch authentication error:', error)
    throw createError({
      statusCode: 500,
      message: 'Authentication failed'
    })
  }
}) 