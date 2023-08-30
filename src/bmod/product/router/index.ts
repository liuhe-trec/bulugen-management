import { RouteRecordRaw } from 'vue-router'
import syscfg from '../config/syscfg'

export const initRoutes = () => {
  const path = `/${syscfg.moduleName}`
  const iRoutes: RouteRecordRaw[] = [
    {
      path: path,
      name: 'Product',
      component: () => import('@/views/Layout/Layout.vue'),
      meta: {
        title: lpk('page.product.index'),
        hidden: false,
        requireAuth: false,
        icon: 'Goods'
      },
      children: [
        {
          path: '/product/brand',
          component: () =>
            import('../views/BrandManagement/BrandManagement.vue'),
          name: 'Brand',
          meta: {
            title: lpk('page.product.brand.index'),
            hidden: false,
            requireAuth: false,
            icon: 'GoodsFilled'
          }
        },
        {
          path: '/product/attribute',
          component: () =>
            import('../views/AttributeManagement/AttributeManagement.vue'),
          name: 'Attribute',
          meta: {
            title: lpk('page.product.attribute.index'),
            hidden: false,
            requireAuth: false,
            icon: 'Files'
          }
        },
        {
          path: '/product/spu',
          component: () => import('../views/SPUManagement/SPUManagement.vue'),
          name: 'SPU',
          meta: {
            title: lpk('page.product.SPU.index'),
            hidden: false,
            requireAuth: false,
            icon: 'Basketball'
          }
        },
        {
          path: '/product/sku',
          component: () => import('../views/SKUManagement/SKUManagement.vue'),
          name: 'SKU',
          meta: {
            title: lpk('page.product.SKU.index'),
            hidden: false,
            requireAuth: false,
            icon: 'Baseball'
          }
        }
      ]
    }
  ]
  app.registBModRoute(iRoutes)
}
