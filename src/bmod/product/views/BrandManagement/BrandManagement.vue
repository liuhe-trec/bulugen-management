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
  trademarkParams.id = undefined
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  // 由于第一次组件还没有渲染,所以会空指针,所以用TS的?语法来解决,这事方案一,
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')
  // 方案二 用nextTick方法来解决,获取渲染后的数据
  nextTick(() => {
    formRef.value.clearValidate('tmName')
    formRef.value.clearValidate('logoUrl')
  })
  dialogFormVisible.value = true
}
// 修改品牌信息
const updateTrademark = (row: TradeMark) => {
  formRef.value?.clearValidate('tmName')
  formRef.value?.clearValidate('logoUrl')
  // ES6 语法合并对象
  Object.assign(trademarkParams, row)
  dialogFormVisible.value = true
}
// dirloag的取消和确认
const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = async () => {
  // 在发请求之前对表单进行校验,如果检验成功再进行网络请求
  await formRef.value.validate()
  if (trademarkParams.id !== undefined) {
    const result = await TrademarkApi.put(trademarkParams)
    if (result.code == 200) {
      // 修改品牌成功
      Tools.showSuccessMsg('page.product.edit.success')
      // 再次发请求
      getHasTrademark(pageNo.value)
    } else {
      // 修改品牌失败
      Tools.showErrMsg('page.product.edit.failed')
    }
    dialogFormVisible.value = false
    return
  }
  const result = await TrademarkApi.post(trademarkParams)
  if (result.code == 200) {
    // 添加品牌成功
    Tools.showSuccessMsg('page.product.add.success')
    // 再次发请求
    getHasTrademark()
  } else {
    // 添加品牌失败
    Tools.showErrMsg('page.product.add.failed')
  }
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
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // response是接口返回的数据,uploadFile也是接口返回的数据,包括大小之类的
  trademarkParams.logoUrl = response.data
  // 图片上传成功钩子中清除报错信息
  formRef.value.clearValidate('logoUrl')
}
// 组件生命周期方法
onMounted(() => {
  getHasTrademark()
})
const formRef = ref()
// 品牌校验自定义规则
const validatorTmName = (_rules: any, value: any, callBack: any) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称位数大于两位'))
  }
}
const validatorLogoUrl = (_rules: any, value: any, callBack: any) => {
  console.log('result is :' + value)
  if (value) {
    callBack()
  } else {
    callBack(new Error('图片不能为空'))
  }
}
// 表单校验规则对象
const rules = {
  // blur 失去焦点时候触发
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }]
}
// 气泡确认框确定按钮回调
const removeTradeMark = async (id: number) => {
  let result = await TrademarkApi.delete({ id })
  if (result.code == 200) {
    Tools.showSuccessMsg('page.product.delete.success')
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1
    )
  } else {
    Tools.showErrMsg('page.product.delete.failed')
  }
}
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
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`确定删除${row.tmName}吗?`"
              width="200px"
              icon="Delete"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
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
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id === undefined ? '添加品牌' : '修改品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
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
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽: footer -->
      <template #footer>
        <el-button size="small" @click="cancel">取消</el-button>
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
