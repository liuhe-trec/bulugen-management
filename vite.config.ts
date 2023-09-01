import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// vant UI 库配置
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import autoprefixer from 'autoprefixer'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(({command, mode}) => {
  // 获取各种环境下的对应变量,加载哪个环境下的配置文件
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        dts: 'src/types/auto-import.d.ts',
        resolvers: [
          ElementPlusResolver(),
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
        ],
        dts: 'src/types/auto-import-components.d.ts'
      }),
      viteMockServe({
        mockPath: 'src/mock',
        enable: true,
        watchFiles: true
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 配置src根目录的别名
      },
      extensions: [
        // 导入时要省略的扩展名列表
        '.mjs',
        '.js',
        '.mts',
        '.ts',
        '.jsx',
        '.tsx',
        '.json'
      ]
    },
    css: {
      preprocessorOptions: {
        // 指定传递给 CSS 预处理器的选项
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/assets/styles/global-scss-var.scss" as *;`
        }
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              '> 1%'
            ],
            grid: true
          }),
          {
            // 去处打包时候的警告 [WARNING] "@charest"
            // must be the first rule in the file
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
          // postCssPxToRem({
          //   rootValue: 100, // 设计稿/10 1rem的大小
          //   propList: ['*'], // 需要转换的属性,*选择全部转换
          //   selectorBlackList: ['.norem'], // 过滤.norem开头的class,不进行rem转换,样式前面加表示
          //   exclude: /node_modules/i // 排除不转换的文件夹
          // })
        ]
      }
    },
    server: {
      port: 5173,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/,'')
        }
      }
    }
  }
})
