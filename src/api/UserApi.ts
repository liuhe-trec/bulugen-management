import { get } from 'lodash'
import baseApi from './BaseApi'
import { APIMethods } from '@/utils/Constants'

export interface IUser {
  id: number
  name: string
  token: string
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
      name: get(item, 'name'),
      token: get(item, 'token')
    }
  }
}

export default {
  ...baseApi.initApi<
    IUser,
    Pick<BaseAPIType.IAllowMethods<IUser>, APIMethods.GET | APIMethods.DELETE>
  >(initBaseAPIParams),
  getSelfInfo(): Promise<IUser> {
    return Promise.resolve({
      // 校验跳转到登录画面
      id: 1,
      name: 'zs',
      token: ''
    })
  },
  userLoginRequest(loginInfo: IUserLogin): Promise<IUser> {
    return Ajax.get<IUser>({
      url: '/dev-api/v1/public/user/login',
      params: loginInfo
    })
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        Tools.processApiError('error.title.login', e)
        return {} as IUser
      })
  }
}
