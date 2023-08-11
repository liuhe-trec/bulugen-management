import { createApp } from 'vue'
import App from './App.vue'
import { initApp } from '@/config/init'

// 引入normalize.css 抹平各个浏览器的默认样式
import 'normalize.css/normalize.css'
import './assets/fonts/iconfont.css'
// TODO 导入一些全局样式

// 初始化优化,因为初始化要异步调用,所以用自执行函数把他包起来
(async () => {
    // createApp(App).mount('#app')
    // 一.初始化系统基础配置信息(保证所有模块的基础数据都加载完成后,才创建UI)
    // 1.全局变量(app,挂载处理全局配置等),语言包(获取文本内容国际化),
    //   Ajax,Tools定义(尽可能少的使用全局变量,性能考虑)
    // 2.异步加载基础模块的配置信息
    // 3.异步加载业务模块,并完成基本的初始化
    initApp()
    // 二.初始化UI
    const uiApp = createApp(App)
    // 三.注册全局组件
    // 四.向根组件绑定全局对象
    uiApp.config.globalProperties.app = window.app
    // 五.初始化状态管理与路由,并渲染根组件
    uiApp.mount('#app')
})()
