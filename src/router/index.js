import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '../views/Nav.vue'
import Index from '../views/Index.vue'
import Singer from '../views/Singer.vue'
import Ranking from '../views/Ranking.vue'
import Personal from '../views/personal.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Nav',
    component: Nav,
    children:[
      {
        path: '/',
        name: 'Index',
        component: Index
      },
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/singer',
        name: 'Singer',
        component: Singer
      },
      {
        path: '/ranking',
        name: 'Ranking',
        component: Ranking
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registered',
    name: 'Registered',
    component: () => import('../views/Registered.vue')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Personal
  }
]

const router = new VueRouter({
  routes
})

export default router
