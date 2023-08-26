<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import useUserStore from "@/store/modules/user"
import type { IUserLogin } from '@/api/UserApi';
import $router from '@/router'
import { ElNotification } from 'element-plus';
let userStore = useUserStore()
// 收集账号和密码信息
let loginForm = reactive({ username: 'admin', password: '123456' })
let loginLoading = ref(false)

const loginAction = async () => {
  loginLoading.value = true
  const userLoginParam: IUserLogin = {
    username: loginForm.username,
    password: loginForm.password
  }
  try {
    await userStore.userLogin(userLoginParam)
    loginLoading.value = false
    $router.push('/regist')
    // 登录成功的提示信息
    ElNotification({
      title: 'Success',
      type: 'success',
      message: '登录成功!'
    })
  } catch (error) {
    loginLoading.value = false
    console.log(error)
  }
}
</script>

<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello,</h1>
          <h2>welecome to Bulugen management!</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              :prefix-icon="Lock"
              type="password"
              :show-password="true"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loginLoading" class="login_btn" @click="loginAction">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/login_bg.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background-color: var(--primary-bg);
    padding: 40px;
    h1 {
      color: var(--normal-white);
      font-size: var(--font-size-title-huge);
    }
    h2 {
      color: var(--normal-white);
      font-size: var(--font-size-special-cases);
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
