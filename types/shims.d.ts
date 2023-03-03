import type { App } from '@/app'
declare global {
  const app: App
  interface Window {
    app: App
  }
}
