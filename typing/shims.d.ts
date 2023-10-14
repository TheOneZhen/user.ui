import type { App } from '@/app'
import type { Mermaid } from 'mermaid'
import type { hljs } from 'highlight.js'
declare global {
  const app: App
  interface Window {
    app: App
    [p: string]: Function | undefined
    hljs: hljs
    mermaid: Mermaid
  }
}
