import { theme } from './theme.config'
/**
 * # 主题
 */
export class Theme {
  private theme = theme

  getSignatureTheme () {
    return this.theme.signature
  }
}
