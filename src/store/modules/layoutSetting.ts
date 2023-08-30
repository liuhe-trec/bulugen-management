// layout组件相关配置仓库
import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('LayoutSettingStore', {
  state: () => {
    return {
      fold: false //用于控制菜单折叠还是收起的控制
    }
  }
})

export default useLayoutSettingStore
