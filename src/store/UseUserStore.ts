import { defineStore } from 'pinia'

export const UseUserStore = defineStore('UseUserStore', () => {
  const token = ref(app.storage.getLocal('token', ''))
  const username = ref('')
  const icon = ref('')
  const platform = ref('GitHub')

  function clearUserInfo () {
    token.value = ''
    username.value = ''
    icon.value = ''
  }

  return { token, username, icon, platform, clearUserInfo }
})