import type { RouteRecordRaw } from "vue-router";
import sysCfg, { ISysCfg, ISysCfgBModItem } from "./syscfg";
import appController from "@/controller/AppController";
import { isArray } from "lodash";

// 存放所有业务模块的路由信息
let iAllBModRoutes: RouteRecordRaw[] = [];

interface IBModRouterOperation {
  registBModRoute(mixRoute: RouteRecordRaw[] | RouteRecordRaw): void;
  getAllBModRoutes(): RouteRecordRaw[];
}

const routeBModRouterOperation: IBModRouterOperation = {
  // 注册业务模块对应的路由信息
  registBModRoute(mixRoute) {
    if (!mixRoute) {
      return;
    }
    if (isArray(mixRoute)) {
      iAllBModRoutes = iAllBModRoutes.concat(mixRoute);
      return;
    }
    iAllBModRoutes.push(mixRoute);
  },
  // 获取所有路由信息
  getAllBModRoutes() {
    return iAllBModRoutes;
  },
};

const app = {
  // 通过解构的方式,把业务模块router相关操作方法导出
  ...routeBModRouterOperation,
  // 获取系统配置信息
  getConfig<T>(key: keyof ISysCfg): T {
    return sysCfg[key] as T;
  },
  // 判断是否启用了指定的业务模块
  checkBmodIsEnable(moduleName: string): boolean {
    const bmodNames: ISysCfgBModItem[] =
      app.getConfig<ISysCfgBModItem[]>("bmodNames");
    if (bmodNames.find((item) => item.name == moduleName && item.enable)) {
      return true;
    }
    return false;
  },
  getAppController() {
    return appController;
  },
};

export type IApp = typeof app;

export default app;
