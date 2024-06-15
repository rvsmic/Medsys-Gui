import { apiConnection } from './apiConnection'

export default {
  getVisits(token) {
    return apiConnection.get('/service/visits', { 
      headers: { token: token }
    })
  },
  getVisit(token, id) {
    return apiConnection.get('/service/visits', { 
      params: { id: id },
      headers: { token: token }
    })
  },
  postVisit(token, visit) {
    return apiConnection.post(
      '/service/visits',
      visit,
      { 
        headers: { token: token }
      }
    )
  },
  patchVisit(token, id, visit) {
    return apiConnection.patch(
      '/service/visits', 
      visit,
      { 
        params: { id: id },
        headers: { token: token }
      }
    )
  },
  deleteVisit(token, id) {
    return apiConnection.delete('/service/visits', { 
      params: { id: id },
      headers: { token: token }
    })
  }
}
