<script setup lang="ts">
// 获取父组件传递过来的全部路由数组
defineProps(['menuList'])
// 点击菜单的回调
const clickMenuAction = (vc: any) => {
  Tools.Router.pushToRoute(vc)
}
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 无子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
        @click="clickMenuAction"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="clickMenuAction"
      >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由 -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <BLGMenu :menuList="item.children"></BLGMenu>
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped></style>
