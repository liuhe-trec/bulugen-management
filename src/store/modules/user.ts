//创建用户相关的小仓库
import { defineStore } from 'pinia'
import type { IUserLogin } from '@/api/UserApi'
import userApi from '@/api/UserApi'
// 创建仓库
const useUserStore = defineStore('User', {
  // 存储数据
  state: () => {
    return {}
  },
  // 异步|逻辑
  actions: {
    // 用户登录方法
    async userLogin(param: IUserLogin) {
      console.log(param)
      const result = await userApi.userLoginRequest()
      console.log(result)
      return 'ok'
    }
  },
  // 计算
  getters: {}
})
export default useUserStore
