import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

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
    // [/^g-m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    // [/^g-m[-\.\d]+$/, matched => {
    //   const result: { margin?: string } = {}
    //   if (matched) {
    //     const numbersMatch = matched[0].match(/(?!-)-{0,1}\d*.{0,1}\d+/g)
    //     console.log("run hrere", numbersMatch)
    //     if (!numbersMatch) return result;
    //     const value = Array
    //       .from(numbersMatch)
    //       .map(match => (parseInt(match) || 0) + 'px')
    //       .join(' ');
    //     result.margin = value;
    //   }
    //   console.log("run hrere", result.margin);
    //   return result
    // }],
    // [/^g-w-([\.\d]+)$/, ([_, num]) => ({ width: `${num}px` })],
    // [/^g-h-([\.\d]+)$/, ([_, num]) => ({ height: `${num}px` })],
    // [/^g-pd-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ]
})