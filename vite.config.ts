import { resolve } from 'node:path'
import dns from 'node:dns'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import ElementComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

/** Node.js v17版本以下默认对DNS解析地址排序，会导致localhost使用解析后IP地址 */
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
/**
 * command是vite提供用于区分开发环境和生产环境的字段，mode也可以用来区分，但相对来说更灵活，支持构建环境参数传入：
 *  - 指令构建可获取--mode后参数
 * 开发阶段可使用import.meta.env区分开发环境和生产环境
 *  - import.meta是规范内容，由模块暴露特定上下文用于模块环境使用
 *  - 生产环境时，import.meta.env会被**静态替换**
 */
export default defineConfig(() => {
  const common: UserConfig = {
    plugins: [
      Vue(
        {
          template: {
            compilerOptions: {
              isCustomElement: tag => tag.startsWith('micro-app') || tag.startsWith('css-doodle')
            }
          }
        }
      ),
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver()
        ],
        dts: resolve(__dirname, 'types', 'auto-imports.d.ts')
      }),
      ElementComponents({
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          })
        ],
        dts: resolve(__dirname, 'types', 'component.d.ts')
      }),
      UnoCSS({
        configFile: '../uno.config.ts'
      })
    ],
    optimizeDeps: {},
    server: {
      proxy: {
        '/dynamic': {
          target: 'http://127.0.0.1:8000/',
          rewrite (path) {
            return path.replace('/dynamic', '')
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        'icon': resolve(__dirname, './public/icon')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/global/scss/elementReset.scss" as *;'
        }
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          pageone: resolve(__dirname, 'pageone/index.html')
        },
        /**
         * ## 分策略打包
         * - 对象形式对于部分引用也会全部打包，并加入到module graph中，下面使用的是函数形式
         * - 这里我是用的策略是对于一些特殊的包（lodash，css-doodle，等）执行特殊打包
         */
        output: {
          manualChunks (id, meta) {
            // return id.toString().split('node_modules/')[1].split("/")[0].toString()
          }
        }
      }
    }
  }
  return common
})
