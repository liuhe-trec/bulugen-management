// 基础模块的路由配置
// 收集所有的路由信息
import { ROUTER_VIEW_KEY } from '@/utils/Constants'
import Index from '@/views/Index/Index.vue'
import { get } from 'lodash'
import { Router, RouteRecordRaw, createRouter, createWebHistory } from "vue-router"


type RouteRecordRawExt = RouteRecordRaw & { children?: RouteRecordRawExt[] }
let giAllRouters: RouteRecordRawExt[] = []

export const initRouter: () => Router = () => {
    let routers: RouteRecordRawExt[] = [
        {path: '/', redirect: '/index'},
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
                        requireAuth: false
                    }
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/views/My/My.vue'),
                    meta: {
                        title: lpk('page.my.Title'),
                    }
                }
            ]
        },
        {
            path: '/login',
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
    // 聚合业务模块的路由信息
    routers = routers.concat(app.getAllBModRoutes())
    // 把404的路由放到最后
    routers.push({ path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('@/views/NotFound.vue') })
    // 收集所有"宿主路由" 对应的各个业务模块的"属于子路由"
    giAllRouters = routers
    gatherBelongToRoute()
    // 创建路由
    const iRouter = createRouter({
        history: createWebHistory(),
        routes: routers, // 变量名和属性名一致的话可以省略属性名
    })
    // 路由守卫
    iRouter.afterEach((to, _from) => {
        const title = get(to, 'meta.title', '') as string
        title && (document.title = title)
    })
    return iRouter
}

const gatherBelongToRoute = () => {
    const _Do = (hostRoute: RouteRecordRawExt, iRoutes: RouteRecordRawExt[]) => {
        const holdRouterViewKey = get(hostRoute, 'meta.hostRouterViewKey')
        if (!holdRouterViewKey || !iRoutes.length) {
            return
        }
        for (let i=0; i<iRoutes.length;) {
            const iFindItem = iRoutes[i]
            if (hostRoute == iFindItem) {
                i++
                continue
            }
            if (holdRouterViewKey == get(iFindItem, 'meta.belongToRouterViewKey')){
                hostRoute.children = hostRoute.children || []
                hostRoute.children.push(iFindItem)
                iRoutes.splice(i, 1)
            } else {
                iFindItem.children && (_Do(hostRoute, iFindItem.children))
                i++
            }
        }
    }
    giAllRouters.map(item => _Do(item, giAllRouters))
}