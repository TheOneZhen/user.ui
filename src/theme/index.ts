import { theme } from "./config";
/** 主题模块 */
export class Theme {
  private theme = theme

  getSignatureTheme () {
    return this.theme.signature;
  }
}
