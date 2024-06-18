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
  },
  getPatients(token) {
    return apiConnection.get('/service/patients', { 
      headers: { token: token }
    })
  },
  getPatient(token, id) {
    return apiConnection.get('/service/patients', { 
      params: { id: id },
      headers: { token: token }
    })
  },
  postPatient(token, patient) {
    return apiConnection.post(
      '/service/patients',
      patient,
      { 
        headers: { token: token }
      }
    )
  },
  patchPatient(token, id, patient) {
    return apiConnection.patch(
      '/service/patients', 
      patient,
      { 
        params: { id: id },
        headers: { token: token }
      }
    )
  },
  deletePatient(token, id) {
    return apiConnection.delete('/service/patients', { 
      params: { id: id },
      headers: { token: token }
    })
  },
  getPrescriptions(token) {
    return apiConnection.get('/service/prescriptions', { 
      headers: { token: token }
    })
  },
  getPrescription(token, id) {
    return apiConnection.get('/service/prescriptions', { 
      params: { id: id },
      headers: { token: token }
    })
  },
  postPrescription(token, prescription) {
    return apiConnection.post(
      '/service/prescriptions',
      prescription,
      { 
        headers: { token: token }
      }
    )
  },
  patchPrescription(token, id, prescription) {
    return apiConnection.patch(
      '/service/prescriptions', 
      prescription,
      { 
        params: { id: id },
        headers: { token: token }
      }
    )
  },
  deletePrescription(token, id) {
    return apiConnection.delete('/service/prescriptions', { 
      params: { id: id },
      headers: { token: token }
    })
  },
}
