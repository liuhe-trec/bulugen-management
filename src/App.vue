<script setup lang="ts">
// 使用 <script setup> 时，不需要像传统的 Vue 组件一样显式地声明 data、computed、
//methods 等选项，而是通过将相关代码放在 setup 内部来定义它们。这样可以减少冗余的代码，
//提高组件的可维护性
  console.log(lpk('Index'))
  let show: boolean = true
</script>

<template>
  <div class="app-w">
    Bulugen-Management
    {{ app.getConfig('baseUrl') }}
    <Icon icon="icon-iconfont5"/>
    <van-button type="primary">主要按钮</van-button>
    <van-calendar v-model:show="show" />
  </div>
</template>

<style scoped>
.app-w{
  display: flex;
  color: brown;
}
</style>
