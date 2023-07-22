import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
// https://unocss.dev/
// https://icones.js.org/
// unocss的核心是静态替换

const range = [
  'width',
  'height',
  'line-height',
  'padding',
  'margin',
  'left',
  'top',
  'bottom',
  'right',
  'font',
  'row-gap',
  'column-gap',
  'max-width',
  'user-select',
  'flex-grow'
]

const rangeReg = new RegExp('g-((?:' + range.join('|') + ')(?:-(?:top|bottom|right|left))?)')

function generateStyleNew (matched: RegExpMatchArray | null) {
  const result: Record<string, string> = {}
  if (matched !== null && !!matched.input && matched.length === 2) {
    result[matched[1]] = matched
      .input
      .split(new RegExp(matched[0] + '|-', 'g'))
      .filter(Boolean)
      .join(' ')
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
    [rangeReg, matched => generateStyleNew(matched)]
  ],
  safelist: [
    '[icon-carbon:home=""]',
    '[icon-carbon:blog=""]',
    '[icon-carbon:term=""]',
    '[icon-carbon:send-alt=""]'
  ]
})
