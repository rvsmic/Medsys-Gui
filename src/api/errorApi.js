import { apiConnection } from './apiConnection'

export default {
  postError(token, error) {
    return apiConnection.post(
      '/error',
      error,
      { 
        headers: { token: token }
      }
    )
  }
}
