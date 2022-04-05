import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
        template: {
          compilerOptions: {
            // 配置fancy-component
            isCustomElement: tag => tag.startsWith('fc-')
          }
        }
      }
    )
  ],
  optimizeDeps: {
    /**
     * vue-demi：用一套通用的代码运行在不同版本的vue，即为分支管理
     */
    exclude: ['vue-demi']
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      icon: path.join(__dirname, './public/icon')
    }
  }
})
