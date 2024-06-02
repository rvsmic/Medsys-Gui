import { apiConnection } from './apiConnection'

export default {
  getVisits(token, id=null) {
    return apiConnection.get('/service/visits', { 
      params: { id: id },
      headers: { token: token }
    })
  },
  postVisit(token, visit) {
    return apiConnection.post('/service/visits', { 
      params: { visit: visit },
      headers: { token: token }
    })
  },
  patchVisit(token, id, visit) {
    return apiConnection.patch('/service/visits', { 
      params: {
        id: id,
        visit: visit
      },
      headers: { token: token }
    })
  },
  deleteVisit(token, id) {
    return apiConnection.delete('/service/visits', { 
      params: { id: id },
      headers: { token: token }
    })
  }
}
