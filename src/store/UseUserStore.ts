import { defineStore } from 'pinia'

export const UseUserStore = defineStore('UseUserStore', () => {
  const token = ref(app.storage.getLocal('token', ''))
  const name = ref('')
  const icon = ref('')
  const platform = ref('GitHub')
  const home = ref('')
  const viewRecord: Record<keyof UserViewRecord, Set<number>> = reactive({
    'Like Article': new Set(),
    'Dislike Article': new Set(),
    'Like Comment': new Set(),
    'Dislike Comment': new Set()
  })

  function setUserData (userData: UserData) {
    name.value = userData.name
    icon.value = userData.icon
    platform.value = userData.platform
    home.value = userData.home
    token.value = userData.token
    app.storage.setLocal('token', userData.token)
  }

  function setViewRecord (record: UserViewRecord) {
    Object.entries(record).forEach(([key, value]) => {
      viewRecord[key as keyof UserViewRecord] = new Set(value)
    })
  }

  function clearUserInfo () {
    token.value = ''
    name.value = ''
    icon.value = ''
    home.value = ''
    app.storage.setLocal('token', token.value)
  }

  return { token, name, icon, platform, home, viewRecord, setUserData, clearUserInfo, setViewRecord }
})