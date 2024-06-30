import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VisitsView from '../views/VisitsView.vue'
import PatientsView from '../views/PatientsView.vue'
import PrescriptionsView from '../views/PrescriptionsView.vue'
import PersonnelView from '../views/PersonnelView.vue'
import LabTestsView from '../views/LabTestsView.vue'
import UserView from '../views/UserView.vue'
import ErrorsView from '@/views/ErrorsView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wizyty',
      name: 'visits',
      component: VisitsView,
      props: true
    },
    {
      path: '/pacjenci',
      name: 'patients',
      component: PatientsView,
      props: true
    },
    {
      path: '/recepty',
      name: 'prescriptions',
      component: PrescriptionsView,
      props: true
    },
    {
      path: '/personel',
      name: 'personnel',
      component: PersonnelView,
      props: true
    },
    {
      path: '/testy',
      name: 'lab-tests',
      component: LabTestsView,
      props: true
    },
    {
      path: '/moja-strona',
      name: 'user',
      component: UserView,
      props: true
    },
    {
      path: '/bledy',
      name: 'errors',
      component: ErrorsView,
      props: true
    }
  ]
})

export default router
