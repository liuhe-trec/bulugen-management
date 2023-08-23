import type { RouteRecordRaw } from "vue-router";
import syscfg from "../config/syscfg";
import { ROUTER_VIEW_KEY } from "@/utils/Constants";

export const initRoutes = () => {
  const path = `/${syscfg.moduleName}`;
  // 定义当前模块的路由信息
  const iRoutes: RouteRecordRaw[] = [
    {
      name: "blogIndex",
      path: path,
      meta: {
        title: lpk("Blob"),
        requireAuth: false,
        belongToRouterViewKey: ROUTER_VIEW_KEY.Index,
      },
      component: () => import("../views/Index/BolgIndex.vue"),
    },
    {
      name: "articleDetail",
      path: `${path}/article/detail/:id`,
      meta: {
        requireAuth: false,
      },
      component: () => import("../views/article/Detail/ArticleDetail.vue"),
    },
    {
      name: "editArticle",
      path: `${path}/edit`,
      meta: {
        title: lpk("page.blog.article.edit"),
      },
      component: () => import("../views/article/Edit/EditArticle.vue"),
    },
  ];

  app.registBModRoute(iRoutes);
};
