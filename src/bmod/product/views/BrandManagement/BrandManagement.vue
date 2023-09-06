<script setup lang="ts">
// 组合式API函数ref
// 当前页码
let pageNo = ref<number>(1)
// 每页显示的条目数
let limit = ref<number>(3)
</script>

<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格组件: 用于 展示已有品牌的数据-->
    <el-table style="margin: 10px 0px;" border>
      <el-table-column label="序号" width="80px" align="center"/>
      <el-table-column label="品牌名称" />
      <el-table-column label="品牌LOGO" />
      <el-table-column label="品牌操作" />
    </el-table>
    <!-- 分页器组件 -->
     <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :small="true"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes, total"
      :total="400"/>
  </el-card>
</template>

<style lang="scss" scoped></style>
