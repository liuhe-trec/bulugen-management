<script setup lang="ts">
// 获取layout配置相关的仓库
import useLayoutSettingStore from '@/store/modules/layoutSetting'
const layoutSettingStore = useLayoutSettingStore()

const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<template>
  <div class="tabbar-left">
    <!-- 顶部左侧静态图标 -->
    <el-icon style="margin-right: 10px" size="20px" @click="changeIcon">
      <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.tabbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
</style>
