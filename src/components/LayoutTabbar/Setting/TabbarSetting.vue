<script setup lang="ts">
// 获取仓库
import useLayoutSettingStore from '@/store/modules/layoutSetting'
const layoutSettingStroe = useLayoutSettingStore()
const updateRefresh = () => {
  layoutSettingStroe.refresh = !layoutSettingStroe.refresh
}
const fullScreen = () => {
  // DOM对象的属性判断是不是全屏
  let isFull = document.fullscreenElement
  if (!isFull) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<template>
  <div class="tabbar-right">
    <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
      src="../../../../public/logo.png"
      style="width: 24px; height: 24px; margin: 0 10px"
    />
    <el-dropdown>
      <span class="el-dropdown-link">
        Admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.tabbar-right {
  display: flex;
  align-items: center;
}
</style>
