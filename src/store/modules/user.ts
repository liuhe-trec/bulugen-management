//创建用户相关的小仓库
import { defineStore } from 'pinia'
// 创建仓库
const useUserStore = defineStore('User', {
  // 存储数据
  state: () => {
    return {}
  },
  // 异步|逻辑
  actions: {
    // 用户登录方法
    userLogin(data) {}
  },
  // 计算
  getters: {}
})
export default useUserStore
