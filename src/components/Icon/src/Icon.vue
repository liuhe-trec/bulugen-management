<script setup lang="ts">
import { toRefs } from "vue";

// 类型定义
interface IIconProps {
  icon: string;
}
// 初始化,从父级传过来的
const props = defineProps<IIconProps>();
// 响应式的属性
const { icon } = toRefs(props);
</script>
<template>
  <i :class="`iconfont ${icon}`"></i>
</template>
<style></style>
