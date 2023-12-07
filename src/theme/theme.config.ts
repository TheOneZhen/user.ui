export enum ThemeProperty {
  ThemeBackground = '--theme-background',
  ThemeColorActive = '--theme-color-active',
  ThemeBar = '--theme-bar',
  ThemeCompete = '--theme-compete',
  ThemeColor = '--theme-color',
  SignatureStroke = '--signature-stroke',
  SignatureFill = '--signature-fill'
}

export const ThemeConfig = {
  colorSchemes: [
    {
      [ThemeProperty.ThemeBackground]: '#57b2cf',
      [ThemeProperty.ThemeColorActive]: '#f0e87f',
      [ThemeProperty.ThemeBar]: '#c79498',
      [ThemeProperty.ThemeCompete]: '#9596be',
      [ThemeProperty.ThemeColor]: ''
    },
    {
      [ThemeProperty.ThemeBackground]: '#f0e87f',
      [ThemeProperty.ThemeColorActive]: '#de6b70',
      [ThemeProperty.ThemeBar]: '#6a73c2',
      [ThemeProperty.ThemeCompete]: '#9596be',
      [ThemeProperty.ThemeColor]: ''
    },
    {
      [ThemeProperty.ThemeBackground]: '#eacdb1',
      [ThemeProperty.ThemeColorActive]: '#f0f0f0',
      [ThemeProperty.ThemeBar]: '#f5aeb2',
      [ThemeProperty.ThemeCompete]: '#b04b35',
      [ThemeProperty.ThemeColor]: ''
    },
    {
      [ThemeProperty.ThemeBackground]: '#D4AC51',
      [ThemeProperty.ThemeColorActive]: '#D8D1DD',
      [ThemeProperty.ThemeBar]: '#452340',
      [ThemeProperty.ThemeCompete]: '#1B3E36',
      [ThemeProperty.ThemeColor]: ''
    },
    {
      [ThemeProperty.ThemeBackground]: '#3d2333',
      [ThemeProperty.ThemeColorActive]: '#f0943a',
      [ThemeProperty.ThemeBar]: '#452340',
      [ThemeProperty.ThemeCompete]: '#e284af',
      [ThemeProperty.ThemeColor]: '#E1E1E1'
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