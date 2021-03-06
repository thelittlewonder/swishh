import Vue from 'vue'
import Router from 'vue-router'
import vueHeadful from 'vue-headful';
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import Report from '@/components/Report'

Vue.use(Router)
Vue.component('vue-headful', vueHeadful);

export default new Router({
  mode: 'history',
  routes: [
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
})
