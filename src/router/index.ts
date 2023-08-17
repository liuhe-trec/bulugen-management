// 基础模块的路由配置
// 收集所有的路由信息
import Index from '@/views/Index/Index.vue'
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
                    component: () => import('@/views/Index/Home.vue'),
                    meta: {
                        title: lpk('page.my.Title'),
                    }
                }
            ]
        }
    ]
    const iRouter = createRouter({
        history: createWebHistory(),
        routes: routers, // 变量名和属性名一致的话可以省略属性名
    })
    return iRouter
}