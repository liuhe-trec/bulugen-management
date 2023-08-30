<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染 layout一级路由组件的子路由 -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
// vue3的过度动画
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all .3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}

</style>
