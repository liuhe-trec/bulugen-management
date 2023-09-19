<script setup lang="ts">
import TrademarkApi, {
  Records,
  TradeMark
} from '@/bmod/product/api/product/trademark/TrademarkApi'
import { ElMessage, UploadProps } from 'element-plus'
// 组合式API函数ref
// 当前页码
let pageNo = ref<number>(1)
// 每页显示的条目数
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有品牌的数组
let trademarkArr = ref<Records>([])
// 控制对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})
// 添加品牌按钮触发
const addTrademark = () => {
  dialogFormVisible.value = true
}
// 修改品牌信息
const updateTrademark = () => {
  dialogFormVisible.value = true
}
// dirloag的取消和确认
const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = () => {
  dialogFormVisible.value = false
}

const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  let result = await TrademarkApi.getTrademark(pageNo.value, limit.value)
  if (result.code == 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 当下拉菜单的值被改变的时候
const sizeChange = () => {
  getHasTrademark()
}

// 上传图片->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 上传文件之前可以约束文件类型与大小
  // 格式png|jpg|gif 4M
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size < 4 * 1024 * 1024) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件格式务必PNG|JPG|GIF'
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF'
    })
    return false
  }
}
// 上传图片->上传图片成功的函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response) => {
  // response是接口返回的数据,uploadFile也是接口返回的数据,包括大小之类的
  trademarkParams.logoUrl = response.data
}
// 组件生命周期方法
onMounted(() => {
  getHasTrademark()
})
</script>

<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" icon="Plus" @click="addTrademark"
        >添加品牌</el-button
      >
      <!-- 表格组件: 用于 展示已有品牌的数据-->
      <el-table style="margin: 10px 0px" border :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        />
        <!-- el-table-column: 默认展示数据用div 也可以用插槽来实现-->
        <el-table-column label="品牌名称" prop="tmName">
          <template #default="{ row }">
            <h1>{{ row.tmName }}</h1>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <!-- eslint-disable-next-line vue/valid-attribute-name  -->
          <template #="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="row.logoUrl"
              fit="scale-down"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <!-- eslint-disable-next-line vue/valid-attribute-name  -->
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :small="true"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes, total"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="sizeChange"
      />
    </el-card>
    <!-- 对话框组件:在添加品牌与修改已有品牌业务的时候使用结构 -->
    <!-- 
      v-model用于控制对话框显示还是隐藏 
      title 设置左上角的标题
    -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="84px">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="84px">
          <!-- 
            upload组件相应的属性
            action: 上传图片的请求地址
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽: footer -->
      <template #footer>
        <el-button type="primary" size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
