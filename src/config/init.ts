import app from './app'
import Tools from '@/utils/Tools'

// 声明全局变量相关的类型
type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
type IGlobalVars = {
    [key in IGlobalVarsKey]?: any
}

const iGlobalVars: IGlobalVars = {
    app,
    Tools // 全局应用对象,包含全局数据操作的方法
}

Object.keys(iGlobalVars).forEach(keyStr => {
    (window as any)[keyStr as IGlobalVarsKey] = iGlobalVars[keyStr as IGlobalVarsKey]
})

export const initApp = async () => {
    
}

