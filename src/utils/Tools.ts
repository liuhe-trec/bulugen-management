import cookies from 'js-cookie'
import $router from '@/router/index'
//防止请求被缓存的随机数
const cachePreventRandom = Math.random()
let cachePreventNum = 0

const iTools = {
  //显示全局遮罩
  showLoadMask() {
    console.log('showLoadMask')
  },
  hideLoadMask() {
    console.log('hideLoadMask')
  },
  addCachePrevent(url: string = ''): string {
    const queryString = url.indexOf('?')
    url +=
      (-1 == queryString ? '?' : '&') +
      'cp=' +
      (cachePreventNum++ + cachePreventRandom)
    return url
  },
  showError(title: string = '', msg: string = '') {
    alert(`${title}: ${msg}`)
  },
  processApiError(
    title: string,
    res: string | { msg: string },
    options: { isShowInfo: boolean } = { isShowInfo: true }
  ) {
    //处理api调用错误
    if ('string' == typeof res) {
      res = { msg: res }
    }
    title = lpk(title)
    const content = lpk(res.msg) || ''
    if (false !== options.isShowInfo) {
      Tools.showError(title, content)
    }
    window.console && window.console.log && console.log(res)
    const errorInfo = `${title}:${content}`
    throw errorInfo
  },
  Router: {
    // 路由操作命名空间
    pushToRgistPage() {
      $router.getGlobalRouter()!.push('/')
    }
  },
  Store: {
    // 状态管理操作命名空间
  },
  LocalStorage: {
    // 本地存储命名空间
    setItem(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value))
    },
    getItem(key: string) {
      const value = localStorage.getItem(key)
      try {
        return JSON.parse(value as string)
      } catch (e) {
        return value
      }
    },
    removeItem(key: string) {
      localStorage.removeItem(key)
    }
  },
  Cookie: {
    // Cookie操作命名空间
    setItem(key: string, value: any) {
      cookies.set(key, value, { expires: 30 })
    },
    getItem(key: string, defaultValue?: any) {
      const value = cookies.get(key) || defaultValue
      try {
        return JSON.parse(value)
      } catch (error) {
        return value
      }
    },
    removeItem(key: string) {
      cookies.remove(key)
    }
  },
  Time: {
    // 日期时间操作命名空间
    getTimeMsg() {
      let msg: string = ''
      const hour = new Date().getHours()
      if (hour <= 8) {
        msg = '早上'
      } else if (hour <= 11) {
        msg = '上午'
      } else if (hour <= 17) {
        msg = '下午'
      } else {
        msg = '晚上'
      }
      return msg
    }
  },
  Dom: {
    // Dom元素操作命名空间
  }
}

export type ITools = typeof iTools

export default iTools
