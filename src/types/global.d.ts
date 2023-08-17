import { IApp } from '@/config/app'
import { ITools } from '@/utils/Tools'
import { IFnLpk } from '@/config/lpk'

declare global{   // 这是一个全局声明，用于在全局作用域中声明一些类型和变量，使其在整个项目中可用。
    declare namespace GlobalType{  // 这里创建了一个名为GlobalType的命名空间，用来存放全局的类型定义。
        type IKey = string | number;  // 定义了一个叫做IKey的类型，它可以是字符串或数字。
        type IRecord = Record<IKey, any>; // 定义了一个叫做IRecord的类型，它是一个键值对，其中键为IKey类型，值可以是任意类型。
    }
    // 这里是类型的声明
    const app: IApp
    const Tools: ITools
    const lpk: IFnLpk 

    interface Window{
        app: IApp;
        Tools: ITools  // 全局工具库对象,公用方法
        lpk: IFnLpk  //全局语言包 支持函数
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        app: IApp
        Tools: ITools
        lpk: IFnLpk 
    }
}

// export {

// }