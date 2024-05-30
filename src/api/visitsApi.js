import { apiConnection } from './apiConnection'

export default {
  getVisits() {
    return apiConnection.get('/visits', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
}
