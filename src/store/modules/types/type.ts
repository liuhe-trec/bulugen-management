import { RouteRecordRawExt } from "@/router"

export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRawExt[]
}