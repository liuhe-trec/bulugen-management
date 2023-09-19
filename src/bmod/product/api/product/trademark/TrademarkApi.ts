import { IResponse } from '@/utils/Request'

enum TradeMarkApi {
  // 获取品牌列表
  TRADEMARK_URL = '/dev-api/admin/product/baseTrademark/',
  // 添加新的品牌
  ADD_NEW_TRADEMARK = '/dev-api/admin/product/baseTrademark/save',
  // 更新现有品牌
  UPDATE_TRADEMARK = '/dev-api/admin/product/baseTrademark/update'
}

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
  // 获取已有品牌
  async getTrademark(
    page: number,
    limit: number
  ): Promise<IResponse<TradeMardResponseData>> {
    const trademarkUrl = TradeMarkApi.TRADEMARK_URL + `${page}/${limit}`
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
  },
  // 添加新品牌
  async addNewTrademark(data: TradeMark): Promise<IResponse> {
    return Ajax.post({
      url: TradeMarkApi.ADD_NEW_TRADEMARK,
      data
    })
      .then((res) => {
        return res
      })
      .catch((e) => {
        return e
      })
  },
  // 修改品牌信息
  async updateTrademark(data: TradeMark): Promise<IResponse> {
    return Ajax.put({
      url: TradeMarkApi.UPDATE_TRADEMARK,
      data
    })
      .then((res) => {
        return res
      })
      .catch((e) => {
        return e
      })
  }
}
