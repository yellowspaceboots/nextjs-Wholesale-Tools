import { query as q } from 'faunadb'
import { serverClient, serializeFaunaCookie } from '../../utils/fauna-auth'

export default async function login (req, res) {
  const { email, password } = await req.body

  try {
    if (!email || !password) {
      throw new Error('Email and password must be provided.')
    }

    const loginRes = await serverClient.query(
      q.Call(q.Function('login_user'), { email, password })
    )

    if (!loginRes.token) {
      throw new Error('No secret present in login query response.')
    }

    const cookieSerialized = serializeFaunaCookie(loginRes.token)

    res.setHeader('Set-Cookie', cookieSerialized)
    res.status(200).end()
  } catch (error) {
    res.status(400).send(error.message)
  }
}
