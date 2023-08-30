<script setup lang="ts"></script>

<template>
  <div class="tabbar-left">
    <!-- 顶部左侧静态图标 -->
    <el-icon style="margin-right: 10px" size="20px">
      <Expand />
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
