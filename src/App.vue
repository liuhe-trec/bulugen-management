<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { getLocale } from './config/lpk'
let locale = ref(zhCn)
if (getLocale() === "en-US") {
  locale.value = en
}
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
