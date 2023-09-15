//创建用户相关的小仓库
import { defineStore } from 'pinia'
import type { IUser, IUserLogin } from '@/api/UserApi'
import userApi from '@/api/UserApi'
import type { UserState } from './types/type'
import $routerWrapper from '@/router/index'
import { LOGIN_TOKEN } from '@/utils/Constants'
import { IResponse } from '@/utils/Request'
// 创建仓库
const useUserStore = defineStore('User', {
  // 存储数据
  state: (): UserState => {
    return {
      token: '',
      menuRoutes: $routerWrapper.getAllRouters(), // 存储生成菜单的数组
      username: ''
    }
  },
  // 异步|逻辑
  actions: {
    // 用户登录方法
    async userLogin(param: IUserLogin) {
      const userResult: IResponse<string> = await userApi.userLoginRequest(param)
      Tools.LocalStorage.setItem(LOGIN_TOKEN, userResult.data)
      this.token = userResult.data
    },
    // 获取用户信息
    async userInfo() {
      const result = await userApi.getSelfInfo()
      this.username = result.name
      console.log(this.username)
    },
    // 退出登录
    userLogout() {
      // TODO: 1.向服务器发出退出登录请求
      // 2.仓库中关于用户的数据要清空
      Tools.LocalStorage.removeItem(LOGIN_TOKEN)
      this.username = ''
      this.token = ''
    }
  },
  // 计算
  getters: {}
})
export default useUserStore
