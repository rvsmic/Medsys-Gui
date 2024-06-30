import { apiConnection } from './apiConnection'

export default {
  getErrors(token) {
    return apiConnection.get('/service/errors', { 
      headers: { token: token }
    })
  },
  getError(token, id) {
    return apiConnection.get('/service/errors', { 
      params: { id: id },
      headers: { token: token }
    })
  },
  postError(token, error) {
    return apiConnection.post(
      '/service/errors',
      error,
      { 
        headers: { token: token }
      }
    )
  },
  patchError(token, id, error) {
    return apiConnection.patch(
      '/service/errors', 
      error,
      { 
        params: { id: id },
        headers: { token: token }
      }
    )
  }
}
