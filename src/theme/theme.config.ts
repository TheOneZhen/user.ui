export enum ThemeProperty {
  ThemeBackground = '--theme-background',
  ThemeBackgroundSun = '--theme-background-sun',
  ThemeBackgroundMountain = '--theme-background-mountain',
  ThemeBackgroundTree = '--theme-background-tree',
  ThemeFontColor = '--theme-font-color',
  SignatureStroke = '--signature-stroke',
  SignatureFill = '--signature-fill'
}

export const ThemeConfig = {
  colorSchemes: [
    {
      [ThemeProperty.ThemeBackground]: '#57b2cf',
      [ThemeProperty.ThemeBackgroundSun]: '#f0e87f',
      [ThemeProperty.ThemeBackgroundMountain]: '#c79498',
      [ThemeProperty.ThemeBackgroundTree]: '#9596be',
      [ThemeProperty.ThemeFontColor]: ''
    },
    {
      [ThemeProperty.ThemeBackground]: '#f0e87f',
      [ThemeProperty.ThemeBackgroundSun]: '#de6b70',
      [ThemeProperty.ThemeBackgroundMountain]: '#6a73c2',
      [ThemeProperty.ThemeBackgroundTree]: '#9596be',
      [ThemeProperty.ThemeFontColor]: ''
    },
    {
      [ThemeProperty.ThemeBackground]: '#eacdb1',
      [ThemeProperty.ThemeBackgroundSun]: '#f0f0f0',
      [ThemeProperty.ThemeBackgroundMountain]: '#f5aeb2',
      [ThemeProperty.ThemeBackgroundTree]: '#b04b35',
      [ThemeProperty.ThemeFontColor]: ''
    },
    {
      [ThemeProperty.ThemeBackground]: '#D4AC51',
      [ThemeProperty.ThemeBackgroundSun]: '#D8D1DD',
      [ThemeProperty.ThemeBackgroundMountain]: '#452340',
      [ThemeProperty.ThemeBackgroundTree]: '#1B3E36',
      [ThemeProperty.ThemeFontColor]: ''
    },
    {
      [ThemeProperty.ThemeBackground]: '#3d2333',
      [ThemeProperty.ThemeBackgroundSun]: '#f0943a',
      [ThemeProperty.ThemeBackgroundMountain]: '#452340',
      [ThemeProperty.ThemeBackgroundTree]: '#e284af',
      [ThemeProperty.ThemeFontColor]: '#E1E1E1'
    }
  ] as Array<Record<string, string>>
}

export const colorGroup = [
  ['#c6fefe', '#6aa84f', '#6aa84f'],
  ['#9D2121', '#00879A', '#E05320'],
  ['#671812', '#CAC0C1', '#513C21'],
  ['#E4D0C9', '#B7B2CF', '#2B515F'],
  ['#E2E0EE', '#092106', '#000000'],
  ['#235D6B', '#B52807', '#7B723C'],
  ['#B63F31', '#D6CADD', '#2C47A6'],
  ['#D4AC51', '#D8D1DD', '#1B3E36']
]