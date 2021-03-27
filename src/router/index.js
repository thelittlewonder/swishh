import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import Report from '@/components/Report'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/:id',
    name: 'Report',
    component: Report
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router