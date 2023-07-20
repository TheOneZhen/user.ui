import { PluginOption } from 'vite'

export const serverPlugin: () => PluginOption = () => ({
  name: 'server plugin',
  configureServer (server) {
    server.middlewares.use((req, res, next) => {
      console.log(req, res, next)
    })
  }
})