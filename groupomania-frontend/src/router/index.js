import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Marketplace from '../views/Marketplace.vue'
import Profil from '../views/Profil.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: Marketplace
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
