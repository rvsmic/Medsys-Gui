import { apiConnection } from './apiConnection'

export default {
  getPong() {
    return apiConnection.get('/ping')
  }
}
