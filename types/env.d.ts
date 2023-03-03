/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/**
 * this block defines the types of tools that were developed by js(no types with ts)
 */
declare module '@kangc/v-md-editor/lib/theme/github.js'
declare module '@kangc/v-md-editor/lib/preview'
declare module 'mockjs' {
  function mock (rurl: RegExp, any): void
  function mock (any): void
  const Random: any
}
