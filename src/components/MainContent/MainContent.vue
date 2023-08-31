<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/layoutSetting'
const layoutSettingStroe = useLayoutSettingStore()
// 控制当前组件是否销毁重建
let flag = ref(true)
// 监听仓库内刷新属性变化
watch(() => layoutSettingStroe.refresh, () => {
  // 销毁路由
  flag.value = false
  // dom更新完毕
  nextTick(() => {
    flag.value = true
  })
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染 layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
// vue3的过度动画
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all .3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}

</style>
