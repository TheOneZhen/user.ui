import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import ElementComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'
import CustomIcons from 'unplugin-icons/vite'

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
      /**
       * 自动导入组件（element组件导入需要导入样式，这里配置后，不需要导入即可使用组件）
       */
      AutoImport({
        // vue相关自动导入
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver(),
          // set prefix for all custom icon in element(implement double hump)
          IconResolver({ prefix: 'Icon' })
        ],
        dts: path.resolve(__dirname, 'types', 'auto-imports.d.ts')
      }),
      ElementComponents({
        resolvers: [
          ElementPlusResolver(),
          // set signal in component name like prefix-signal-componentNane: { enabledCollections: ['z'] }
          IconResolver({ enabledCollections: ['ep'] })
        ],
        dts: path.resolve(__dirname, 'types', 'component.d.ts')
      }),
      CustomIcons({ autoInstall: true })
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
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          pageone: resolve(__dirname, 'src/pageone/index.html')
        }
        // output: {}
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
