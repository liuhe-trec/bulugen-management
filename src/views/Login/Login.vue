<script setup lang="ts"></script>

<template>
  <div class="content">
    <div class="login-content">Login</div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("../../assets/images/login_bg.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-content {
  text-align: center;
  @include bg();
  width: 640px;
  height: 840px;
}
</style>
