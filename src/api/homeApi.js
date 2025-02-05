import { apiConnection } from './apiConnection'

export default {
  getStats(token) {
    return apiConnection.get('/home/stats', {
      headers: { token: token }
    })
  }
}
