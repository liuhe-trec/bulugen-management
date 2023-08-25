# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Steps

Use yarn

1. Create Project

   ```readme
   yarn create vite
   ```

2. install dependent

   ```readme
   yarn
   yarn dev
   ```

3. remove dependent

   ```readme
   yarn remove vant
   ```

## plugins

- dependencies
- axios
- js-cookie: 管理 coodie
- lodash: 基础方法工具包
- nanoid: 随机字符串生成
- normalize.css 处理样式
- pinia 状态管理
- qs 格式组织
- vant UI 库
- vue-router 路由
- pinia 数据仓库

```readme
yarn add -S axios js-cookie lodash nanoid normalize.css pinia qs vant vue-router
```

- dev-dependencies
- @types/node
- @types/js-cookie
- @types/lodash
- @types/qs
- postcss
- postcss-modules
- postcss-pxtorem
- autoprefixer 自动前缀 css
- sass scss 插件
- unplugin-auto-import
- eslint 代码检查工具
- eslint-plugin-import 代码检查工具
- eslint-plugin-vue 代码检查工具
- eslint-plugin-node 代码检查工具
- @babel/eslint-parser 代码检查工具
- @babel/core 代码检查工具

```readme
yarn add -D @types/node @types/js-cookie @types/lodash @types/qs @types/postcss-pxtorem postcss postcss-modules postcss-pxtorem autoprefixer sass unplugin-auto-import eslint eslint-plugin-import eslint-plugin-vue eslint-plugin-node @babel/eslint-parser @babel/core
```

## 组件库

- Vant(移动端) : <https://github.com/youzan/vant>
- Element Plus: <https://element-plus.org/>
- Element的Icon图标
- MOCK数据 vite-plugin-mock:提供本地和生产服务数据

  ```readme
  yarn add vite-plugin-svg-icons -D
  ```

```readme
// 按需加载
yarn add unplugin-vue-components -D
```
