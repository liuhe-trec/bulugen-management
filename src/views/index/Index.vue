<script setup lang="ts">
import Logo from './Logo/Logo.vue'
import BLGMenu from './Menu/BLGMenu.vue'
// 获取相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="layout-slider">
      <!-- logo图标 -->
      <Logo />
      <!-- 展示菜单 -->
      <el-scrollbar height="400px" class="scrollbar">
        <!-- 滚动组件 -->
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#fff">
          <BLGMenu :menuList="userStore.menuRoutes"></BLGMenu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout-tabbar">456</div>
    <!-- 内容展示区域 -->
    <div class="layout-main">
      <p style="height: 10000px; background: red">main context</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  background: green;
  .layout-slider {
    width: $base-menu-width;
    height: 100vh;
    background: var(--primary-bg);
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height - 20px);
      .el-menu{
        border-right: none;
      }
    }
  }
  .layout-tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: chocolate;
    position: absolute;
    top: 0;
    left: $base-menu-width;
  }
  .layout-main {
    width: calc(100% - $base-menu-width - 40px);
    height: calc(100vh - $base-tabbar-height - 40px);
    background: purple;
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
