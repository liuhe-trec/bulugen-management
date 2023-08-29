<script setup lang="ts"></script>

<template>
  <div class="logo">
    <img src="../../../../public/logo.png" />
    <p>Bulugen管理平台</p>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p{
    font-size: var(--font-size-special-cases);
    color: var(--normal-white);
    margin-left: 10px;
  }
}
</style>
