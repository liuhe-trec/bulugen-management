import { IUser } from "@/api/UserApi"
import { changeLocal } from "@/config/lpk"

let iLoginUser: IUser = {
} as IUser

export default {
    getLoginUser(): IUser {
        return iLoginUser
    },
    changeLocal
}