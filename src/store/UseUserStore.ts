import { defineStore } from 'pinia'

export const UseUserStore = defineStore('UseUserStore', () => {
  const token = ref(app.storage.getLocal('token', ''))
  const name = ref('')
  const icon = ref('')
  const platform = ref('GitHub')
  const home = ref('')

  function setUserData (userData: UserData) {
    name.value = userData.name
    icon.value = userData.icon
    platform.value = userData.platform
    home.value = userData.home
    token.value = userData.token
    app.storage.setLocal('token', userData.token)
  }

  function clearUserInfo () {
    token.value = ''
    name.value = ''
    icon.value = ''
  }

  return { token, name, icon, platform, home, setUserData, clearUserInfo }
})