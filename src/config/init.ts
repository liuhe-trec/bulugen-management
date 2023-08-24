import app from "./app";
import Tools from "@/utils/Tools";
import { lpk, initLpk } from "./lpk";
import { initLoginUserInfo } from "@/controller/AppController";
import { App } from "vue";
import { initTheme } from "./theme";
import Ajax from "@/utils/Request";

// 声明全局变量相关的类型
type IGlobalVarsKey = "app" | "lpk" | "Tools" | "Ajax";
type IGlobalVars = {
  [key in IGlobalVarsKey]?: any;
};

const iGlobalVars: IGlobalVars = {
  app,
  Tools,
  lpk, // 全局应用对象,包含全局数据操作的方法
  Ajax,
};

Object.keys(iGlobalVars).forEach((keyStr) => {
  (window as any)[keyStr as IGlobalVarsKey] =
    iGlobalVars[keyStr as IGlobalVarsKey];
});

export const initApp = async () => {
  // 初始化基础业务相关信息(获取当前登陆者信息等)
  // await 等用户信息获取到了再执行其他
  await initLoginUserInfo();

  // 主题定制
  // - 方式1:针对不同主题去书写不同的样式文件,在系统初始化时候,去server端进行加载
  // - 方式2:通过scss变量与scss函数和mixin来实现主题的定制
  //       通过document.body.setAttribute('data-theme','blue') 来切换主题
  // - 方式3:通过css变量来实现主题的定制
  initTheme();
  // 初始化语言包,import.meta.glob不支持以变量的方式加载数据
  // 所以全部加载,然后再过滤不需要的语言包内容
  initLpk();
  //
  // 初始化业务模块
  const iAllEntry: GlobalType.IRecord = import.meta.glob("@/bmod/*/entry.ts", {
    eager: true,
  });
  for (const path in iAllEntry) {
    const iEntryFile = iAllEntry[path];
    iEntryFile && iEntryFile.entryInit && (await iEntryFile.entryInit());
  }
};

export const initGlobalComponents = (uiAPP: App<Element>) => {
  const iAllGlobalComponents: GlobalType.IRecord = import.meta.glob(
    "@/components/*/src/*.vue",
    { eager: true },
  );
  Object.keys(iAllGlobalComponents).map((path: string) => {
    const paths = path.split("/");
    const componentName = paths[paths.length - 3];
    uiAPP.component(componentName, iAllGlobalComponents[path].default);
  });
};
