<script setup lang="ts"></script>

<template>
  <div class="tabbar-right">
    <el-button type="primary" size="small" icon="Refresh" circle></el-button>
    <el-button type="primary" size="small" icon="FullScreen" circle></el-button>
    <el-button type="primary" size="small" icon="Setting" circle></el-button>
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
