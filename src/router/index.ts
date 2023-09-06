// 基础模块的路由配置
// 收集所有的路由信息
import { LOGIN_PATH, LOGIN_TOKEN, REGIST_PATH } from '@/utils/Constants'
import { get } from 'lodash'
import {
  Router,
  RouteRecordRaw,
  createRouter,
  createWebHistory
} from 'vue-router'
import Layout from '@/views/Layout/Layout.vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 取消右上角加载的动画
nprogress.configure({ showSpinner: false })

export type RouteRecordRawExt = RouteRecordRaw & {
  children?: RouteRecordRawExt[]
}
type NullableRouter = Router | null
let giAllRouters: RouteRecordRawExt[] = []
let globalRouter: NullableRouter = null

export const initRouter: () => Router = () => {
  let routers: RouteRecordRawExt[] = [
    {
      path: '/',
      name: 'Layout',
      redirect: '/home',
      component: Layout,
      meta: {
        title: '',
        hidden: false, //是否在导航栏中隐藏
        requireAuth: false,
        // hostRouterViewKey: ROUTER_VIEW_KEY.Index, // 子路由有哪些,模块拼接
        icon: 'HomeFilled'
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home/Home.vue'),
          meta: {
            title: lpk('page.home.Title'),
            hidden: false,
            requireAuth: true,
            icon: 'HomeFilled'
          }
        }
      ]
    },
    {
      path: LOGIN_PATH,
      name: 'Login',
      component: () => import('@/views/Login/Login.vue'),
      meta: {
        title: lpk('page.login.Title'),
        hidden: true,
        requireAuth: false,
        icon: 'Key'
      }
    },
    {
      path: REGIST_PATH,
      name: 'Regist',
      component: () => import('@/views/Login/Regist.vue'),
      meta: {
        title: lpk('page.login.Regist'),
        hidden: true,
        requireAuth: false,
        icon: 'Avatar'
      }
    },
    {
      path: '/screen',
      component: () => import('@/views/Screen/BLGScreen.vue'),
      name: 'Screen',
      meta: {
        title: lpk('page.screen.Index'),
        hidden: false,
        icon: 'Monitor'
      }
    },
    {
      path: '/acl',
      redirect: '/acl/user',
      component: () => import('@/views/Layout/Layout.vue'),
      name: 'Acl',
      meta: {
        title: lpk('page.acl.index'),
        hidden: false,
        icon: 'Lock'
      },
      children: [
        {
          path: '/acl/user',
          component: () =>
            import('@/views/PermissionControl/UserControl/UserControl.vue'),
          name: 'User',
          meta: {
            title: lpk('page.acl.userControl'),
            hidden: false,
            requireAuth: true,
            icon: 'User'
          }
        },
        {
          path: '/acl/role',
          component: () =>
            import('@/views/PermissionControl/RoleControl/RoleControl.vue'),
          name: 'Role',
          meta: {
            title: lpk('page.acl.roleControl'),
            hidden: false,
            requireAuth: true,
            icon: 'UserFilled'
          }
        },
        {
          path: '/acl/menu',
          component: () =>
            import('@/views/PermissionControl/MenuControl/MenuControl.vue'),
          name: 'Acl',
          meta: {
            title: lpk('page.acl.menuControl'),
            hidden: false,
            requireAuth: true,
            icon: 'Menu'
          }
        }
      ]
    }
  ]
  // 聚合业务模块的路由信息
  routers = routers.concat(app.getAllBModRoutes())
  // 把404的路由放到最后
  routers.push({
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    meta: {
      hidden: true
    },
    component: () => import('@/views/NotFound.vue')
  })
  // 收集所有"宿主路由" 对应的各个业务模块的"属于子路由"
  giAllRouters = routers
  gatherBelongToRoute()
  // 创建路由
  const iRouter = createRouter({
    history: createWebHistory(),
    routes: giAllRouters, // 变量名和属性名一致的话可以省略属性名
    scrollBehavior() {
      //滚动行为
      return {
        left: 0,
        top: 0
      }
    }
  })
  // 路由守卫
  iRouter.beforeEach((to, _from, next) => {
    nprogress.start()
    // 用lodash的get方法取id 可以避免出现getLoginUser是空的时候.id报错
    // TODO Debug 为了调试把这个逻辑关了先
    // const userId = get(app.getAppController().getLoginUser(), 'id', '')
    const tokenStr = Tools.LocalStorage.getItem(LOGIN_TOKEN)

    if (
      !tokenStr &&
      to.matched.some(
        (record) => false !== get(record, 'meta.requireAuth', true)
      )
    ) {
      next({
        path: LOGIN_PATH,
        query: {
          // 这个属性的意思是登录成功之后可以跳转到指定的位置
          redirect: to.fullPath
        }
      })
      return
    }
    // 已登录.进入登录界面的时候,直接返回到主页
    // TODO 为了调试注释下面逻辑
    // if (userId && to.path == LOGIN_PATH) {
    //   next('/')
    //   return
    // }
    next()
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  iRouter.afterEach((to, _from) => {
    const title = get(to, 'meta.title', '') as string
    title && (document.title = title)
    nprogress.done()
  })
  globalRouter = iRouter
  return iRouter
}

const gatherBelongToRoute = () => {
  const _Do = (hostRoute: RouteRecordRawExt, iRoutes: RouteRecordRawExt[]) => {
    const holdRouterViewKey = get(hostRoute, 'meta.hostRouterViewKey')
    if (!holdRouterViewKey || !iRoutes.length) {
      return
    }
    for (let i = 0; i < iRoutes.length; ) {
      const iFindItem = iRoutes[i]
      if (hostRoute == iFindItem) {
        i++
        continue
      }
      if (holdRouterViewKey == get(iFindItem, 'meta.belongToRouterViewKey')) {
        hostRoute.children = hostRoute.children || []
        hostRoute.children.push(iFindItem)
        iRoutes.splice(i, 1)
      } else {
        iFindItem.children && _Do(hostRoute, iFindItem.children)
        i++
      }
    }
  }
  giAllRouters.map((item) => _Do(item, giAllRouters))
}
export const routerWrapper = {
  getGlobalRouter: () => globalRouter as Router,
  getAllRouters: () => giAllRouters
}
export default routerWrapper
