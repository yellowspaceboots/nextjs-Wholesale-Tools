
import cookie from 'js-cookie'
import { redirectToLogin } from './redirect'

export const logout = async (client) => {
  client.resetStore()
  cookie.remove('token')
  redirectToLogin()
}
