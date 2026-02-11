import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BoardWriteMod from '@/views/BoardWriteMod.vue'
import { useAuthenticationStore } from '@/stores/authentication'

/*
무조건 접근 가능한 path
로그인 되면 접근 불가능한 path (비로그인 시 접근 가능한 path)
비로그인이면 접근 불가능한 path (로그인 시 접근 가능한 path)

route객체가 meta속석이 없으면 무조건 접근 가능한 path가 되고
meta속성에 requiresAuth: true면 로그인 시 접근 가능한 path
meta속성에 requiresGuest: true면 비로그인 시 접근 가능한 path
*/


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      component: () => import('../views/SignUp.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/signin',
      component: () => import('../views/SignIn.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/board/write',
      component: () => import('../views/BoardWriteMod.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/board/list',
      component: () => import('../views/BoardList.vue'),
    },
    {
      path: '/board/:id',
      component: () => import('../views/BoardDetail.vue'),
    },

    {
      path: '/board/write/:id',
      component: () => import('../views/BoardWriteMod.vue'),
    },
  ],
});

//로그인, 비로그인 상태일 때 접근할 수 없는 라우팅 처리
// navigation guard 이용하여 처리.

//비로그인 시 이용할 수 있는 Path들


// //라우팅 될 때 마다 아래 콜백함수가 계속 실행된다.
router.beforeEach( (to, from, next) => {
  const authentication = useAuthenticationStore();
  const isSigned = authentication.state.isSigned; //true: 로그인 상태, false: 비로그인상태

  //비로그인 상태에서 로그인이 필요한 path로 가려고 할 때 
  if(to.meta.requiresAuth && !isSigned) {
    return next({ path: '/signin'});
  }

  //로그인 상태에서 비 로그인이 필요한 path로 가려고 할 때 
  if(to.meta.requiresGuest && isSigned ){
    return next({ path: '/'});
  }

  next(); //원래 처리대로 
});

export default router
