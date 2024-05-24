import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import MoviesPage from './pages/MoviesPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/genre/:genre',
    name: 'MoviesPage',
    component: MoviesPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
