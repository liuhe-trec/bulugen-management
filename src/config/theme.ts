import { THEME_OPTIONS } from "@/utils/Constants"
import { get } from "lodash"

// 系统主题的定义
const themeStorageName: string = 'theme' // 存储主题字段名称
const defaultTheme: string = THEME_OPTIONS[0] // 默认主题
let currentUseTheme: string = ''

// 初始化主题
export const initTheme = () => {
    changeTheme(getTheme(), false)
}

export const changeTheme = (themeName: string, isNeedSave: boolean = true) => {
    // 不支持的主题或者正在使用的主题
    if (!THEME_OPTIONS.find(themeItem => themeItem == themeName)) {
        return
    }
    // 变更主题
    document.documentElement.setAttribute('data-theme', themeName)
    if (!isNeedSave || currentUseTheme == themeName) {
        return
    }
    currentUseTheme = themeName
    // 保存
    // 1.如果用户登录.更新主题
    // 2.本地保存
    Tools.LocalStorage.setItem(themeStorageName, currentUseTheme)
}

// 获取当前正在使用的主题
export const getTheme = (): string => {
    if (currentUseTheme) {
        return currentUseTheme
    }
    const loginUser = app.getAppController().getLoginUser()
    // 优先从登录者的信息中获取
    const themeFromUser = get(loginUser, 'cust.theme')
    if (typeof themeFromUser === 'string') {
        currentUseTheme = themeFromUser
        return currentUseTheme
    }
    // 其次从本地存储中获取
    currentUseTheme = Tools.LocalStorage.getItem(themeStorageName)
    // 使用默认主题
    currentUseTheme = currentUseTheme || defaultTheme
    return currentUseTheme
}