import { defineStore } from 'pinia'

export const UseUserStore = defineStore('UseUserStore', () => {
  const token = ref(app.storage.getLocal('token', ''))
  const name = ref('')
  const icon = ref('')
  const platform = ref('GitHub')
  const home = ref('')
  const viewRecord = reactive<Record<keyof UserViewRecord, Set<number>>>({
    LA: new Set(),
    DLA: new Set(),
    LC: new Set(),
    DLC: new Set()
  })

  function setUserData (userData: UserData) {
    clearUserInfo()
    name.value = userData.name
    icon.value = userData.icon
    platform.value = userData.platform
    home.value = userData.home
    token.value = userData.token
    app.storage.setLocal('token', userData.token)
  }

  function setViewRecord (record: UserViewRecord) {
    Object.entries(record).forEach(([key, value]) => {
      const set = viewRecord[key as keyof UserViewRecord]
      set.clear()
      value.forEach(i => set.add(i))
    })
  }

  function clearUserInfo () {
    token.value = ''
    name.value = ''
    icon.value = ''
    home.value = ''
  }

  return { token, name, icon, platform, home, viewRecord, setUserData, clearUserInfo, setViewRecord }
})