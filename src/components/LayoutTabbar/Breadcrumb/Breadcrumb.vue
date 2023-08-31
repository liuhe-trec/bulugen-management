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
      <el-breadcrumb-item
        v-for="(item, index) in Tools.Router.getRoute().matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 标题 -->
        <span style="margin: 0 2px;">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
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
