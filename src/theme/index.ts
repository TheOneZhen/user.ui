import { theme } from "./theme.config";
/** 主题模块 */
export class Theme {
  private theme = theme

  getSignatureTheme () {
    return this.theme.signature;
  }
}
