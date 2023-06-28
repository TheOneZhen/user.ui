import { defineStore } from 'pinia'

export const UseColorSchemeStore = defineStore('UseColorSchemeStore', () => {
  const colorScheme = ref(app.theme.getColorSchemeIndex())
  app.theme.setColorScheme(colorScheme.value)

  function changeColorScheme () {
    colorScheme.value++
    app.theme.setColorScheme(colorScheme.value)
    app.storage.setLocal('colorScheme', colorScheme.value)
  }

  return { colorScheme, changeColorScheme }
})