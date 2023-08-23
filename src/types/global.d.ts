import { IApp } from "@/config/app";
import { ITools } from "@/utils/Tools";
import { IFnLpk } from "@/config/lpk";
import { IAjax } from "@/utils/Request";

declare global {
  // 这是一个全局声明，用于在全局作用域中声明一些类型和变量，使其在整个项目中可用。
  declare namespace GlobalType {
    // 这里创建了一个名为GlobalType的命名空间，用来存放全局的类型定义。
    type IKey = string | number; // 定义了一个叫做IKey的类型，它可以是字符串或数字。
    type IRecord = Record<IKey, any>; // 定义了一个叫做IRecord的类型，它是一个键值对，其中键为IKey类型，值可以是任意类型。
  }
  declare namespace BaseAPIType {
    interface IAllowMethods<T> {
      get(params: GlobalType.IRecord): Promise<T>;
      list(params: GlobalType.IRecord): Promise<IListResult<T>>;
      post(params: GlobalType.IRecord): Promise<IResponse>;
      put(params: GlobalType.IRecord): Promise<IResponse>;
      delete(params: GlobalType.IRecord): Promise<IResponse>;
      patch(params: GlobalType.IRecord): Promise<IResponse>;
    }
    interface IListResult<T = any> {
      total: number;
      items: T[];
    }
    interface IURIItem {
      path: string;
      errMsg: string;
      fnUrlTransfer?: (url: string, params: IRecord) => string;
      fnParamsTransfer?: (url: string, params: IRecord) => IRecord;
    }
    interface IURI {
      [key: string]: IURIItem;
    }
    interface IInitParams<T = IRecord> {
      mapper?: (item: IRecord) => T;
      uri: IURI;
    }
  }
  // 这里是类型的声明
  const app: IApp;
  const Tools: ITools;
  const lpk: IFnLpk;
  const Ajax: IAjax;

  type ITimeout = ReturnType<typeof setTimeout>;
  interface Window {
    app: IApp;
    Tools: ITools; // 全局工具库对象,公用方法
    lpk: IFnLpk; //全局语言包 支持函数
    Ajax: IAjax;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    app: IApp;
    Tools: ITools;
    lpk: IFnLpk;
  }
}

// export {

// }
