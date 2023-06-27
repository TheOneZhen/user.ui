import dayjs from 'dayjs'
import { random } from 'lodash'
import { colorGroup, ThemeConfig, ThemeProperty } from './theme.config'

/**
 * # 主题
 */
export class Theme {
  private root = document.querySelector('html')!
  private config = ThemeConfig

  init () {
  }
  /**
   * 如果缓存中有设置，优先使用缓存；缓存没有设置，自动计算。
   */
  setColorScheme (index = this.getColorSchemeIndex()) {
    const values = Object.values(this.config.times)
    this.setRootCssProperties(values[index % values.length])
  }

  getColorSchemeIndex () {
    return app.storage.getLocal('colorScheme', Math.floor(dayjs().hour() / 6) + '')
  }

  handleClickSignature () {
    const num = random(100) % colorGroup.length
    const result = {
      [ThemeProperty.SignatureStroke]: colorGroup[num][0],
      [ThemeProperty.SignatureFill]: colorGroup[num][1]
    }
    this.setRootCssProperties(result)
  }

  private setRootCssProperties (obj: Record<string, string>) {
    for (const [key, value] of Object.entries(obj))
      this.root.style.setProperty(key, value)
  }
}
