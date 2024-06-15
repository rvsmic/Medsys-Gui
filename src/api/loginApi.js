import { apiConnection } from './apiConnection'

export default {
  postLogin(username, password) {
    return apiConnection.post('/login', { username, password })
  },
  postLogout(token) {
    return apiConnection.post('/logout', { token })
  }
}
