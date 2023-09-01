<script setup lang="ts">
import Logo from '@/components/Logo/Logo.vue'
import BLGMenu from '@/components/Menu/BLGMenu.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 获取layout相关设置
import useLayoutSettingStore from '@/store/modules/layoutSetting'
const layoutSettingStore = useLayoutSettingStore()
</script>

<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-slider">
      <!-- logo图标 -->
      <Logo />
      <!-- 展示菜单 -->
      <el-scrollbar class="scrollbar">
        <!-- 滚动组件 -->
        <el-menu
          :collapse="layoutSettingStore.fold ? true : false"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          :default-active="Tools.Router.getCurrentPath()"
        >
          <BLGMenu :menuList="userStore.menuRoutes"></BLGMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout-tabbar"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <!-- layout组件的顶部导航 -->
      <LayoutTabbar></LayoutTabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout-main"
      :class="{ fold: layoutSettingStore.fold ? true : false }"
    >
      <MainContent></MainContent>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background: var(--primary-bg);
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height - 20px);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout-tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: absolute;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout-main {
    width: calc(100vw - $base-menu-width - 40px);
    height: calc(100vh - $base-tabbar-height - 40px);
    background: purple;
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width - 40px);
      left: $base-menu-min-width;
    }
  }
}
</style>
