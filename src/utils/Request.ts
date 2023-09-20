// 基于Axios实现Ajax请求的封装
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { APIMethods, LOGIN_TOKEN } from './Constants'
import { get } from 'lodash'
import app from '@/config/app'
// import useUserStore from '@/store/modules/user'

// 定义或扩展Axios的类型
let timerLoading: ITimeout
export interface AxiosRequestConfigExt extends AxiosRequestConfig {
  reqParams?: AxiosRequestConfigExt
  showLoading?: boolean // 是否显示loading提示
  isNeedCachePrevent?: boolean // 是否加上防缓存的cp随机数
  isNeedJsonStringify?: boolean // 是否需要JSON.stringify
  isNeedQSStringfy?: boolean //是否需要qs.stringify
  is401ToLogin?: boolean // 当401的时候是否需要跳转到登录页面
}
export interface IResponse<T = any> {
  code: number
  data: T
  msg: string
  ok: boolean
}
// 设置axios默认配置选项
axios.defaults.headers.head['Content-Type'] = 'application/json;chartset=utf-8'
// 定义该模块内全局变量
const axiosInstance: AxiosInstance = axios.create({
  baseURL: app.getConfig('baseUrl'),
  timeout: 10000
})

const getMethods: string[] = [
  APIMethods.GET,
  APIMethods.POST,
  APIMethods.PATCH,
  APIMethods.PUT,
  APIMethods.DELETE
].map((method) => {
  return method.toUpperCase()
})
// 定义常用请求方法
type IAjaxMethod =
  | APIMethods.GET
  | APIMethods.POST
  | APIMethods.PATCH
  | APIMethods.PUT
  | APIMethods.DELETE

type IFnAjaxMethodHandler = <T = any>(
  reqParams: AxiosRequestConfigExt
) => Promise<IResponse<T>>
// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  // const userStore = useUserStore()
  // if (userStore.token) {
  //   config.headers.token = userStore.token
  // }
  return config
})
// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    // 清除加载loading 计时器
    clearTimeout(timerLoading)
    Tools.hideLoadMask()
    //获取响应内容,以及请求时传递的参数
    const { status, data, config } = res
    const { reqParams = {} } = config as AxiosRequestConfigExt
    const { is401ToLogin = false } = reqParams

    // http status: 200
    if (200 == status) {
      if (data) {
        if (401 == data.code && is401ToLogin) {
          app.getAppController().redirectToLogin()
          return data
        } else if ((data.code >= 400 && data.code <= 404) || 500 == data.code) {
          return Promise.reject(data)
        }
      }
      return data
    } else {
      // http status != 200
      return Promise.reject(data)
    }
  },
  (error) => {
    // 清除加载loading 计时器
    clearTimeout(timerLoading)
    Tools.hideLoadMask()
    const { message = 'Request Error', response } = error
    const errMsg = get(response, 'data.msg', message)
    return Promise.reject({ msg: errMsg })
  }
)

// 绑定多种请求类型方法
const iAllMethods: { [key in IAjaxMethod]: IFnAjaxMethodHandler } = {} as any
getMethods.map((method) => {
  const fnHandler: IFnAjaxMethodHandler = <T = any>(
    reqParams: AxiosRequestConfigExt | string
  ): Promise<IResponse<T>> => {
    if ('GET' == method) {
      if ('string' === typeof reqParams) {
        reqParams = {
          url: reqParams,
          params: ''
        }
      }
    }
    return Ajax.request<T>(method, reqParams as AxiosRequestConfigExt)
  }
  iAllMethods[method.toLocaleLowerCase() as IAjaxMethod] = fnHandler
})

const Ajax = {
  ...iAllMethods,
  request<T = any>(
    method: string,
    reqParams: AxiosRequestConfigExt
  ): Promise<IResponse<T>> {
    // 获取请求参数
    let { url, params } = reqParams
    const {
      headers = {},
      timeout,
      showLoading,
      isNeedCachePrevent,
      isNeedJsonStringify,
      isNeedQSStringfy
    } = reqParams
    // 判断是否需要显示loading
    if (false !== showLoading) {
      clearTimeout(timerLoading)
      timerLoading = setTimeout(() => {
        Tools.showLoadMask()
      }, 200)
    }
    // 判断是否需要防缓存
    isNeedCachePrevent !== undefined && (false !== isNeedCachePrevent) && (url = Tools.addCachePrevent(url))
    // 是否需要json stringify处理
    isNeedJsonStringify && (params = JSON.stringify(params))
    // 是否需要qs.stringify
    isNeedQSStringfy && (params = qs.stringify(params))
    // 设置登录Token
    const loginToken = Tools.Cookie.getItem(LOGIN_TOKEN)
    loginToken && (headers.Authorization = `Bearer ${loginToken}`)
    const newRequestParams: AxiosRequestConfigExt = {
      url,
      method: getMethods.indexOf(method) > -1 ? method : 'GET',
      [method === 'GET' ? 'params' : 'data']: params,
      headers: Object.assign({}, headers),
      reqParams
    }
    timeout && (newRequestParams.timeout = timeout)
    return axiosInstance.request(newRequestParams)
  }
}

export type IAjax = typeof Ajax
export default Ajax
