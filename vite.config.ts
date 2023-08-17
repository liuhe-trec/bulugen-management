import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// vant UI 库配置
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import autoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    autoImport({
      imports: ['vue'],
      dts: 'src/types/auto-import.d.ts'
    }),
    Components({
      resolvers: [VantResolver()],
      dts: 'src/types/auto-import-components.d.ts'
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname,'src') // 配置src根目录的别名
    },
    extensions: [  // 导入时要省略的扩展名列表
      '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'
    ]
  },
  css: { 
    preprocessorOptions: { // 指定传递给 CSS 预处理器的选项
      scss: {
        additionalData: `@use "@/assets/styles/global-scss-var.scss" as *;`,
      },
    },
    postcss: {
      plugins: [autoprefixer({
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8',
          '> 1%',
        ],
        grid: true,
      }), {
        // 去处打包时候的警告 [WARNING] "@charest" 
        // must be the first rule in the file
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
          charset: (atRule) => {
            if (atRule.name === 'charset') {
              atRule.remove();
            }
          }
        }
      }, postCssPxToRem({
        rootValue: 100,   // 设计稿/10 1rem的大小
        propList: ['*'],  // 需要转换的属性,*选择全部转换
        selectorBlackList: ['.norem'],  // 过滤.norem开头的class,不进行rem转换,样式前面加表示
        exclude: /node_modules/i,   // 排除不转换的文件夹
      })],
    }
  },
  server: {
    port: 5173
  }
})
