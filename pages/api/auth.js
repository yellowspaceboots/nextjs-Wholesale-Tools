import cookie from 'cookie'
import { FAUNA_SECRET_COOKIE } from '../../utils/fauna-auth'

export default async function auth (req, res) {
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const faunaSecret = cookies[FAUNA_SECRET_COOKIE]

  if (!faunaSecret) {
    return res.status(401).send('Auth cookie missing.')
  }

  res.status(200).json({ [FAUNA_SECRET_COOKIE]: faunaSecret })
}
