import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
// https://unocss.dev/
// https://icones.js.org/

const range = ['width', 'height', 'line-height', 'padding', 'margin', 'left', 'top', 'bottom', 'right', 'font-size']

function generateStyle (matched: RegExpMatchArray, unit: string = 'px') {
  const result: Record<string, string> = {}
  if (matched && matched[0]) {
    const numMatched = matched[0].match(/(?<=-)-?[\.\d]+/g)
    const propMatched = matched[0].match(/(?<=g-)[a-z]+(!-[a-z]+)*/)
    const canRun = propMatched
      && propMatched[0]
      && range.findIndex(propName => propMatched[0].startsWith(propName)) > -1
    if (numMatched && canRun) {
      const value = Array
        .from(numMatched)
        .map(match => (Number(match) || 0) + unit)
        .join(' ')
      result[propMatched[0]] = value;
    }
  }
  return result
}

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'icon-',
      extraProperties: {},
      warn: true,
      cdn: 'https://esm.sh/'
    })
  ],
  rules: [
    [/^g-[a-z]+[-\.\d]+$/, matched => generateStyle(matched)]
  ]
})