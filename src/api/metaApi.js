import { apiConnection } from './apiConnection'

export default {
  getSelDoctors(token) {
    return apiConnection.get('/service/labeled-doctors', { 
      headers: { token: token }
    })
  },
  getSelPatients(token) {
    return apiConnection.get('/service/labeled-patients', { 
      headers: { token: token }
    })
  },
  getSelPrescriptions(token) {
    return apiConnection.get('/service/labeled-prescriptions', { 
      headers: { token: token }
    })
  },
  getSelVisits(token) {
    return apiConnection.get('/service/labeled-visits', { 
      headers: { token: token }
    })
  },
  getSelTests(token) {
    return apiConnection.get('/service/labeled-tests', { 
      headers: { token: token }
    })
  }
}