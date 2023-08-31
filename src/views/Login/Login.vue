<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import useUserStore from '@/store/modules/user'
import type { IUserLogin } from '@/api/UserApi'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()
let userStore = useUserStore()
// 收集账号和密码信息
let loginForm = reactive({ username: 'admin', password: '123456' })
// 自定义校验规则
const validatorUserName = (_rule: any, _value: any, callback: any) => {
  // rule: 校验规则对象 value: 表单元素文本内容 callback: 规则放行函数决定是否通过
  // if (/^\d{5,10}$/.test(value)) {
  //   callback()
  // } else {
  //   callback(new Error('长度至少5位'))
  // }
  callback()
}
// 表单校验配置对象
const loginRules = {
  username: [
    {
      required: true,
      min: 3,
      max: 15,
      message: 'Length should be 3 to 15',
      trigger: 'change'
    },
    { trigger: 'change', validator: validatorUserName }
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: 'Length should be 6 to 15',
      trigger: 'change'
    }
  ]
}
let loginLoading = ref(false)
let loginFormValidate = ref()
const loginAction = async () => {
  // 表单校验
  await loginFormValidate.value.validate()
  loginLoading.value = true
  const userLoginParam: IUserLogin = {
    username: loginForm.username,
    password: loginForm.password
  }
  try {
    await userStore.userLogin(userLoginParam)
    loginLoading.value = false
    // 判断 路由中是否有query参数，有的就跳query
    const redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/'})
    // 登录成功的提示信息
    ElNotification({
      title: `HI,${Tools.Time.getTimeMsg()}好!`,
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
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormValidate"
        >
          <h1>Hello,</h1>
          <h2>welecome to Bulugen management!</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              :show-password="true"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="loginLoading"
              class="login_btn"
              @click="loginAction"
              >登录</el-button
            >
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
