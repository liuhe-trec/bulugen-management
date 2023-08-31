<script setup lang="ts">
// 获取仓库
import useLayoutSettingStore from '@/store/modules/layoutSetting'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router';
const $route = useRoute()

const layoutSettingStroe = useLayoutSettingStore()
const userStroe = useUserStore()
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
// 退出登录点击回调
const logout = () => {
  userStroe.userLogout()
  // 3.跳转到登录页面
  Tools.Router.pushToLoginPage($route.path)
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
        {{ userStroe.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
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
