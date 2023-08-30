<script setup lang="ts"></script>

<template>
  <div class="tabbar">
    <Breadcrumb></Breadcrumb>
    <TabbarSetting></TabbarSetting>
  </div>
</template>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, rgb(233, 217, 217), rgb(248, 216, 216), rgb(249, 205, 205));
}
</style>
