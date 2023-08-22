import modelUserApi, { IUser } from "@/api/UserApi"
import { changeLocale, mergeLpk } from "@/config/lpk"
import { LOGIN_PATH, LOGIN_TOKEN } from "@/utils/Constants"
import { changeTheme } from "@/config/theme"

let iLoginUser: IUser = {
} as IUser

// 这种export需要import引入才可以使用
export const initLoginUserInfo = async () => {
    if (Tools.Cookie.getItem(LOGIN_TOKEN)) {
        iLoginUser = await modelUserApi.getSelfInfo()
    }
}

// export default再appcontroller里可以直接调用
export default {
    getLoginUser(): IUser {
        return iLoginUser
    },
    redirectToLogin() {
        document.location.href = LOGIN_PATH
    },
    changeLocale,
    mergeLpk,
    changeTheme,
}