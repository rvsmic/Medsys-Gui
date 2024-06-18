import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VisitsView from '../views/VisitsView.vue'
import PatientsView from '../views/PatientsView.vue'
import PrescriptionsView from '../views/PrescriptionsView.vue'

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
    }
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

export default router
