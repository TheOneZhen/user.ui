import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import ElementComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const common = {
    // 这里的代理网站记得提取出去
    base: `${process.env.NODE_DEV === 'production' ? '' : ''}/`,
    // 插件数组（最后会被flat）
    plugins: [
      vue(
        {
          template: {
            compilerOptions: {
              // 屏蔽自定义组件并入vue编译
              isCustomElement: tag => tag.startsWith('fc-') || /^micro-app/.test(tag) || tag.startsWith('css-doodle')
            }
          }
        }
      ),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      ElementComponents({
        resolvers: [ElementPlusResolver()]
      })
    ],
    // 依赖优化选项
    optimizeDeps: {
      /**
       * vue-demi：用一套通用的代码运行在不同版本的vue，即为分支管理
       */
      // 在预构建中强制排除的依赖项
      exclude: ['vue-demi']
    },
    // 开发服务器选项
    server: {
      host: 'localhost',
      port: 3000,
      strictPort: true
    },
    resolve: {
      // 文件系统路径别名（声明此项后尽量使用绝对路径）
      alias: {
        '@': resolve(__dirname, './src'),
        icon: resolve(__dirname, './public/icon')
      }
    }
  }
  let elseConfig = {}

  if (command === 'serve') {
    elseConfig = {
      base: ''
    }
  } else {
    elseConfig = {
      base: 'http://zhenisbusy.space'
    }
  }
  return Object.assign(common, elseConfig)
})
