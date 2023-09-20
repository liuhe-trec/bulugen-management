import { IResponse } from '@/utils/Request'
import BaseApi from '@/api/BaseApi'
import { APIMethods } from '@/utils/Constants'

enum TradeMarkApi {
  // 获取品牌列表
  TRADEMARK_URL = '/dev-api/admin/product/baseTrademark/:page/:limit',
  // 添加新的品牌
  ADD_NEW_TRADEMARK = '/dev-api/admin/product/baseTrademark/save',
  // 更新现有品牌
  UPDATE_TRADEMARK = '/dev-api/admin/product/baseTrademark/update',
  // 删除现有品牌
  DELETE_TRADMARK = '/dev-api/admin/product/baseTrademark/remove/:id'
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

const initTradeMarkApiParams: BaseAPIType.IInitParams = {
  uri: {
    [APIMethods.POST]: {
      path: TradeMarkApi.ADD_NEW_TRADEMARK,
      errMsg: 'error.product.get'
    },
    [APIMethods.PUT]: {
      path: TradeMarkApi.UPDATE_TRADEMARK,
      errMsg: 'error.product.get'
    },
    [APIMethods.DELETE]: {
      path: TradeMarkApi.DELETE_TRADMARK,
      errMsg: 'error.product.get'
    }
  }
}

export default {
  ...BaseApi.initApi<
    TradeMark,
    Pick<
      BaseAPIType.IAllowMethods<TradeMark>,
      APIMethods.POST | APIMethods.PUT | APIMethods.DELETE
    >
  >(initTradeMarkApiParams),
  // 获取已有品牌
  async getTrademark(
    page: number,
    limit: number
  ): Promise<IResponse<TradeMardResponseData>> {
    let trademarkUrl = TradeMarkApi.TRADEMARK_URL.replace(
      ':page',
      page.toString()
    )
    trademarkUrl = trademarkUrl.replace(':limit', limit.toString())
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
