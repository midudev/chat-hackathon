import type { RequestHandler } from '@sveltejs/kit'
import twilio from 'twilio'

const TWILIO_ACCOUNT_SID = import.meta.env.VITE_PUBLIC_TWILIO_ACCOUNT_SID
const TWILIO_API_KEY = import.meta.env.VITE_PUBLIC_TWILIO_API_KEY
const TWILIO_API_SECRET = import.meta.env.VITE_PUBLIC_TWILIO_API_SECRET
const SERVICE_SID = import.meta.env.VITE_PUBLIC_SERVICE_SID

console.log({
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
  SERVICE_SID,
})

export const get: RequestHandler = async ({ request }) => {
  const jwt = request.headers.get('jwt')
  if (jwt == null) return { status: 401 }

  // This is temporal as we're allowing anonymous users
  const identity = jwt.startsWith('anonymous')
    ? jwt.split('_')[1]
    : null

  // Lo que haríamos de verdad
  // const user = await supabase.auth.api.getUser(jwt)
  // const identity = user.data.user_metadata.user_name
  // console.log({identity})

  if (identity == null) return { status: 401 }

  const { AccessToken } = twilio.jwt
  const { ChatGrant } = AccessToken

  const accessToken = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET, {
      identity
    })

  const conversationsGrant = new ChatGrant({
    serviceSid: SERVICE_SID
  })

  accessToken.addGrant(conversationsGrant)

  console.log(accessToken.toJwt())

  return {
    status: 200,
    body: {
      accessToken: accessToken.toJwt()
    }
  }
}