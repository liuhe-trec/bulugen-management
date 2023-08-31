<script setup lang="ts">
import useUserStore from '@/store/modules/user';
const userStroe = useUserStore()
// 声明周期,挂载完毕
onMounted(() => {
  userStroe.userInfo()
})
</script>

<template>
  <div>Home</div>
</template>

<style lang="scss" scoped></style>
