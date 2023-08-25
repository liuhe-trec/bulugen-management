import { LOGIN_PATH, ROUTER_VIEW_KEY } from '@/utils/Constants'
import Index from '@/views/Index/Index.vue'

// 对外暴漏配置路由
export const constantRoute = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    name: 'index',
    component: Index,
    meta: {
      title: lpk('page.index.Title'),
      requireAuth: false,
      hostRouterViewKey: ROUTER_VIEW_KEY.Index
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Index/Home.vue'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/My/My.vue'),
        meta: {
          title: lpk('page.my.Title'),
          requireAuth: false,
          keepAlive: false
        }
      }
    ]
  },
  {
    path: LOGIN_PATH,
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
      title: lpk('page.login.Title'),
      requireAuth: false
    }
  },
  {
    path: '/regist',
    name: 'regist',
    component: () => import('@/views/Login/Regist.vue'),
    meta: {
      title: lpk('page.login.Regist'),
      requireAuth: false
    }
  }
]
