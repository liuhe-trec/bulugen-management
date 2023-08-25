import { createApp } from 'vue'
import App from './App.vue'
import { initApp, initGlobalComponents } from '@/config/init'
// 主题切换用css,采用方法3进行主题切换
import './assets/styles/base-theme.scss'
import './assets/styles/blue-theme.scss'
import './assets/styles/black-theme.scss'

// 引入normalize.css 抹平各个浏览器的默认样式
import 'normalize.css/normalize.css'
import './assets/styles/global.scss'
import './assets/fonts/iconfont.css'
import { initRouter } from './router'
// TODO 导入一些全局样式

// 初始化优化,因为初始化要异步调用,所以用自执行函数把他包起来
;(async () => {
  // 通过这个可以获取环境变量 import.meta.env
  // console.log(import.meta.env)
  // createApp(App).mount('#app')
  // 一.初始化系统基础配置信息(保证所有模块的基础数据都加载完成后,才创建UI)
  // 1.全局变量(app,挂载处理全局配置等),语言包(获取文本内容国际化),
  //   Ajax,Tools定义(尽可能少的使用全局变量,性能考虑)
  // Ajax的封装主要包括
  // 1)解决XHR异步请求产生的回调地狱问题
  // 2)基于Axios库实现Ajax的封装
  // 3)在封装好的Ajax库的基础上实现BaseAPI的封装
  // 4)在封装好的Base基础上实现各个模块的webapi调用
  // 5)Mock数据的处理
  // 2.异步加载基础模块的配置信息
  //     1).加载系统当前状态信息
  //     2).加载当前登录用户的个人信息
  // 3.异步加载业务模块,并完成基本的初始化
  await initApp()
  // 二.初始化UI
  const uiApp = createApp(App)
  // 三.注册全局组件,全局的公共组件
  initGlobalComponents(uiApp)
  // 四.向根组件绑定全局对象
  uiApp.config.globalProperties.app = window.app
  uiApp.config.globalProperties.Tools = window.Tools
  uiApp.config.globalProperties.lpk = window.lpk
  // 五.初始化状态管理与路由,并渲染根组件
  //  1).初始化基础模块
  //  2).初始化各业务模块的路由配置
  //  3).初始化路由守卫
  uiApp.use(initRouter())
  //  4).keep-alive的使用
  uiApp.mount('#app')
})()
