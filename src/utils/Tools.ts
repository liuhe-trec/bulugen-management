import cookies from 'js-cookie'
import { type } from 'os'

const iTools = {
    Router: { // 路由操作命名空间

    },
    Store: { // 状态管理操作命名空间

    },
    LocalStorage: {  // 本地存储命名空间
        setItem(key: string, value: any){
            localStorage.setItem(key, JSON.stringify(value))
        },
        getItem(key: string){
            const value = localStorage.getItem(key)
            try{
                return JSON.parse(value as string)
            } catch (e){
                return value
            }
        },
        removeItem(key: string){
            localStorage.removeItem(key)
        }
    },
    Cookie: {  // Cookie操作命名空间
        setItem(key: string, value: any){
            cookies.set(key,value, {expires: 30})
        },
        getItem(key: string, defaultValue: any){
            const value = cookies.get(key) || defaultValue
            try {
                return JSON.parse(value)
            } catch (error) {
                return value
                
            }
        },
        removeItem(key: string){
            cookies.remove(key)
        }
    },
    Time: {  // 日期时间操作命名空间

    },
    Dom: {  // Dom元素操作命名空间

    }
}

export type iTools = typeof iTools

export default iTools