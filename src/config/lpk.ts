import { get, isArray } from "lodash";
import { LOCALE_OPTIONS } from "@/utils/Constants";
// import { Locale } from "vant";
// import enUS from "vant/es/locale/lang/en-US";

const tblLpk: Record<string, string | string[]> = {}; //缓存语言包的内容

const localStorageLpkName = "locale";
// 1.初始化语言包
export const initLpk = () => {
  mergeLpk(import.meta.glob("@/locales/*", { eager: true }));
  //初始化第三方的语言库
  initUIFrameWorkLpk();
};

const initUIFrameWorkLpk = () => {
  // const vantLpk: GlobalType.IRecord = {
  //   "en-US": enUS,
  // };
  // const locale = getLocale();
  // vantLpk[locale] && Locale.use(locale, vantLpk[locale]);
};

export const getLocale: () => string = () => {
  const defaultLocale = "zh-CN";
  // 1.从登陆者自定义信息中心获取语言环境
  // get方法是从json对象中取值,是lodash的方法
  let language =
    get(app.getAppController().getLoginUser(), "cust.locale") || defaultLocale;
  // 2.从本地存储中获取
  language = Tools.LocalStorage.getItem(localStorageLpkName) || language;
  // 3.使用默认语言包
  return language;
};
type ILpkFile = {
  [path: string]: {
    default: Record<string, string | string[]>;
  };
};
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
  const localLanguage = getLocale();
  for (const path in importLpkFiles) {
    if (-1 == path.indexOf(localLanguage)) {
      continue;
    }
    const { default: iLpkFileItem } = importLpkFiles[path];
    for (const lpkKey in iLpkFileItem) {
      tblLpk[lpkKey] = iLpkFileItem[lpkKey];
    }
  }
};
export type IFnLpk = (
  key: string,
  option?: { index?: number; default?: string }
) => string;
export const lpk: IFnLpk = (key, option) => {
  const mixValue = tblLpk[key];
  if (isArray(mixValue)) {
    return mixValue[option?.index || 0] || option?.default || key;
  }
  return mixValue || option?.default || key;
};

export const changeLocale = (newLocale: string) => {
  if (!LOCALE_OPTIONS.find((localItem) => localItem == newLocale)) {
    return;
  }
  // 1.如果用户已登录,更新用户设置
  // TODO
  // 2.本地缓存最新语言包
  Tools.LocalStorage.setItem(localStorageLpkName, newLocale);
  // 3.刷新页面,从新加载
  document.location.reload();
};
