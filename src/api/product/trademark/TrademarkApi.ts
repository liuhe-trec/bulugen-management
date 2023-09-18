import { IResponse } from '@/utils/Request'

// 已有的品牌的数据类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

// 包含全部品牌数据的ts类型
export type Records = TradeMark[]

// 获取已有全部品牌的数据ts类型
export interface TradeMardResponseData {
  records: Records
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

export default {
  async getTrademark(
    page: number,
    limit: number
  ): Promise<IResponse<TradeMardResponseData>> {
    const trademarkUrl =
      '/dev-api/admin/product/baseTrademark/' + `${page}/${limit}`
    return Ajax.get({
      url: trademarkUrl
    })
      .then((res) => {
        return res as IResponse
      })
      .catch((e) => {
        Tools.processApiError('error.title.login', e)
        return {} as IResponse
      })
  }
}
