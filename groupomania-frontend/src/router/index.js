import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../components/Signup.vue'
import Marketplace from '../views/Marketplace.vue'
import Profil from '../views/Profil.vue'


const routes = [
  {
    path: '/',
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
