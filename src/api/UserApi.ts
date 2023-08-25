import { get } from 'lodash'
import baseApi from './BaseApi'
import { APIMethods } from '@/utils/Constants'

export interface IUser {
  id: number
  name: string
}

export interface IUserLogin {
  username: string
  password: string
}

const initBaseAPIParams: BaseAPIType.IInitParams = {
  uri: {
    [APIMethods.GET]: {
      path: '/data_get.json',
      errMsg: 'err.user.load'
      // fnUrlTransfer(_url, _params) {
      //     return 'abcdefg'
      // },
      // fnParamsTransfer(_url, _params) {
      //     return {
      //         id: 99999999
      //     }
      // }
    },
    [APIMethods.LIST]: { path: '/data.json', errMsg: 'err.user.load' }
  },
  mapper(item: GlobalType.IRecord): IUser {
    return {
      id: get(item, 'id'),
      name: get(item, 'name')
    }
  }
}

export default {
  ...baseApi.initApi<
    IUser,
    Pick<BaseAPIType.IAllowMethods<IUser>, APIMethods.GET | APIMethods.LIST>
  >(initBaseAPIParams),
  getSelfInfo(): Promise<IUser> {
    return Promise.resolve({
      // 校验跳转到登录画面
      id: 1,
      name: 'zs'
    })
  },
  userLoginRequest(): Promise<IUser> {
    setTimeout
    return Promise.resolve({
      // 校验跳转到登录画面
      id: 1,
      name: 'zs'
    })
  }
}
