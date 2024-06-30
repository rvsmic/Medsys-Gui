import { apiConnection } from './apiConnection'

export default {
  getUser(token, id=null) {
    return apiConnection.get('/info/user', {
      params: { id: id },
      headers: { token: token }
    })
  },
  changePassword(token, data) {
    return apiConnection.patch(
      '/info/password',
      data, 
      {
        headers: { token: token }
      }
    )
  }
}