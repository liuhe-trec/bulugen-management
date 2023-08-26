//创建用户相关的小仓库
import { defineStore } from 'pinia'
import type { IUser, IUserLogin } from '@/api/UserApi'
import userApi from '@/api/UserApi'
import type { UserState } from './types/type'
// 创建仓库
const useUserStore = defineStore('User', {
  // 存储数据
  state: (): UserState => {
    return {
      token: ''
    }
  },
  // 异步|逻辑
  actions: {
    // 用户登录方法
    async userLogin(param: IUserLogin) {
      console.log(param)
      const result: IUser = await userApi.userLoginRequest()
      console.log(result)
      return 'ok'
    }
  },
  // 计算
  getters: {}
})
export default useUserStore
