import sysCfg, { ISysCfg, ISysCfgBModItem } from './syscfg'
import appController from '@/controller/AppController'

const app = {
    // 获取系统配置信息
    getConfig<T>(key: keyof ISysCfg): T{
        return sysCfg[key] as T
    },
    // 判断是否启用了指定的业务模块
    checkBmodIsEnable(moduleName: string): boolean{
        const bmodNames: ISysCfgBModItem[] = app.getConfig<ISysCfgBModItem[]>('bmodNames')
        if (bmodNames.find(item => item.name == moduleName && item.enable)){
            return true
        }
        return false
    },
    getAppController(){
        return appController
    },

}

export type IApp = typeof app

export default app