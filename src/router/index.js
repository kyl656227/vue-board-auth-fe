import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardWriteMod from '@/views/BoardWriteMod.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      component: () => import('../views/SignUp.vue'),
    },
    {
      path: '/signin',
      component: () => import('../views/SignIn.vue'),
    },
    {
      path: '/board/write',
      component: () => import('../views/BoardWriteMod.vue'),
    },
 
 
  ],
})

export default router
