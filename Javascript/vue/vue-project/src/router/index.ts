import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/timeSlicing',
      name: 'timeSlicing',
      component: () => import('../views/TimeSlicing')
    }
  ]
})

export default router
