import syscfg from './config/syscfg'
import { initRoutes } from './router'

// 业务模块入口
export const entryInit = async () => {
  // 判断是否开启当前业务模块
  if (!app.checkBmodIsEnable(syscfg.moduleName)) {
    return
  }
  // 初始化语言包
  app
    .getAppController()
    .mergeLpk(import.meta.glob('./locals/*', { eager: true }))
  // 2.初始化当前模块的配置信息
  // 3.初始化当前模块的状态管理信息
  // 4.初始化当前模块的路由信息
  initRoutes()
}
