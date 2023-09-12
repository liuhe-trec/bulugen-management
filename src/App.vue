<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
let locale = ref(zhCn)
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
