import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import ElementComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const common: UserConfig = {
    base: `${process.env.NODE_DEV === 'production' ? '' : ''}/`,
    plugins: [
      vue(
        {
          template: {
            compilerOptions: {
              isCustomElement: tag => tag.startsWith('fc-') || /^micro-app/.test(tag) || tag.startsWith('css-doodle')
            }
          }
        }
      ),
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver()
        ],
        dts: path.resolve(__dirname, 'types', 'auto-imports.d.ts')
      }),
      ElementComponents({
        resolvers: [
          ElementPlusResolver()
        ],
        dts: path.resolve(__dirname, 'types', 'component.d.ts')
      }),
      UnoCSS({
        presets: [
          // presetUno(),
          presetAttributify(),
          presetIcons({
            prefix: 'icon-',
            extraProperties: {},
            warn: true,
            cdn: 'https://esm.sh/'
          })
        ]
      })
    ],
    optimizeDeps: {
      // exclude: ['vue-demi']
    },
    server: {
      host: 'localhost',
      port: 3000,
      strictPort: true
    },
    resolve: {
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
