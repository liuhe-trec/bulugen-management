import { APIMethods } from '@/utils/Constants'
import { IResponse } from '@/utils/Request'
import { get } from 'lodash'

type IFnUrlAndParamsTransfer = (
  type: string,
  uriItem: BaseAPIType.IURIItem,
  params: GlobalType.IRecord
) => {
  url: string
  params: GlobalType.IRecord
}
const transferUrlAndParams: IFnUrlAndParamsTransfer = (
  type,
  uriItem,
  params = {}
) => {
  let url = uriItem.path
  if ('get' === type || 'delete' === type) {
    const idName = 'id'
    const pageName = 'page'
    const limitName = 'limit'
    url = url.replace(`:${idName}`, get(params, idName))
    url = url.replace(`:${pageName}`, get(params, pageName))
    url = url.replace(`:${limitName}`, get(params, limitName))
  }
  uriItem.fnUrlTransfer && (url = uriItem.fnUrlTransfer(url, params))
  uriItem.fnParamsTransfer && (params = uriItem.fnParamsTransfer(url, params))
  return {
    url,
    params
  }
}

export default {
  initApi<T = any, R = BaseAPIType.IAllowMethods<T>>(
    initParams: BaseAPIType.IInitParams<T>
  ): R {
    const allMethods: BaseAPIType.IAllowMethods<T> = {} as any
    ;[
      APIMethods.GET,
      APIMethods.LIST,
      APIMethods.POST,
      APIMethods.PUT,
      APIMethods.PATCH,
      APIMethods.DELETE
    ].map((method) => {
      switch (method) {
        case APIMethods.GET:
          {
            allMethods[method] = (params: GlobalType.IRecord): Promise<T> => {
              return Ajax.get<T>({
                ...transferUrlAndParams(
                  'get',
                  get(initParams, 'uri.get'),
                  params
                )
              })
                .then((res) => {
                  return initParams.mapper
                    ? initParams.mapper(res.data)
                    : (res.data as T)
                })
                .catch((e) => {
                  Tools.processApiError(get(initParams, 'uri.get.errMsg'), e)
                  return {} as T
                })
            }
          }
          break
        case APIMethods.LIST:
          {
            allMethods[method] = (
              params: GlobalType.IRecord
            ): Promise<BaseAPIType.IListResult<T>> => {
              const iResult: BaseAPIType.IListResult<T> = {
                total: 0,
                items: []
              }
              return Ajax.get<T>({
                ...transferUrlAndParams(
                  method,
                  get(initParams, `uri.${method}`),
                  params
                )
              })
                .then((res) => {
                  const { total, items = [] } =
                    res.data as unknown as BaseAPIType.IListResult<T>
                  iResult.total = total
                  iResult.items = initParams.mapper
                    ? items.map((item) => {
                        return initParams.mapper!(item)
                      })
                    : items
                  return iResult
                })
                .catch((e) => {
                  Tools.processApiError(
                    get(initParams, `uri.${method}.errMsg`),
                    e
                  )
                  return iResult
                })
            }
          }
          break
        case APIMethods.POST:
        case APIMethods.PUT:
        case APIMethods.PATCH:
        case APIMethods.DELETE:
          {
            allMethods[method] = (
              params: GlobalType.IRecord
            ): Promise<IResponse> => {
              return Ajax[method]<T>({
                ...transferUrlAndParams(
                  method,
                  get(initParams, `uri.${method}`),
                  params
                )
              }).catch((e) => {
                Tools.processApiError(
                  get(initParams, `uri.${method}.errMsg`),
                  e
                )
                return {} as IResponse
              })
            }
          }
          break
      }
    })
    return allMethods as unknown as R
  }
}
