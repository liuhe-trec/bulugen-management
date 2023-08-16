import { get, isArray } from 'lodash'
import { LOCAL_OPTIONS } from '@/utils/Constants'

const tblLpk: Record<string, string | string[]> = {} //缓存语言包的内容

const localStorageLpkName = 'local'
// 1.初始化语言包
export const initLpk = () => {
    mergeLpk(import.meta.glob('@/locals/*', {eager: true}))
}

export const getLocale: ()=> string = () => {
    const defaultLocal = 'zh-CN'
    // 1.从登陆者自定义信息中心获取语言环境
    // get方法是从json对象中取值,是lodash的方法
    let language = get(app.getAppController().getLoginUser(), 'cust.local') || defaultLocal
    // 2.从本地存储中获取
    language = Tools.LocalStorage.getItem(localStorageLpkName) || language
    // 3.使用默认语言包
    return language
}
type ILpkFile = {
    [path: string]: {
        default: Record<string, string | string[]>
    }
}
/*  读取到的格式是这样的
{
    'zh-CN.ts':{
        default:{
            'Index': '主页'
        }
    },
    'en-US.ts':{
        default:{
            'Index': 'Home'
        }
    },
}
*/
export const mergeLpk = (importLpkFiles: ILpkFile) => {
    const localLanguage = getLocale()
    for (const path in importLpkFiles) {
        if (-1 == path.indexOf(localLanguage)) {
            continue
        }
        const { default: iLpkFileItem } = importLpkFiles[path] 
        for (const lpkKey in iLpkFileItem) {
            tblLpk[lpkKey] = iLpkFileItem[lpkKey]
        }
    }
}
export type IFnLpk = (key: string, option?:{index?: number, default?: string}) => string
export const lpk: IFnLpk = (key, option) => {
    const mixValue = tblLpk[key]
    if (isArray(mixValue)){
        if (!mixValue.length) {
            return option?.default || key
        }
        return mixValue[option?.index || 0] || key
    }
    return mixValue || option?.default || key
}

export const changeLocal = (newLocal: string) => {
    if (!LOCAL_OPTIONS.find(localItem => localItem == newLocal)) {
        return
    }
    // 1.如果用户已登录,更新用户设置 
    // TODO
    // 2.本地缓存最新语言包
    Tools.LocalStorage.setItem(localStorageLpkName, newLocal)
    // 3.刷新页面,从新加载
    document.location.reload()
}
