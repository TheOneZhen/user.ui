import { defineStore } from 'pinia'

export const UseUserStore = defineStore('UseUserStore', () => {
  const token = ref(app.storage.getLocal('token', ''))
  const name = ref('')
  const icon = ref('')
  const platform = ref('GitHub')
  const home = ref('')
  const views = reactive({
    likeComments: new Set<CommentType['id']>(),
    dislikeComments: new Set<CommentType['id']>(),
    likeArticles: new Set<ArticleType['id']>(),
    dislikeArticles: new Set<ArticleType['id']>()
  })
  function setUserData (allUserData: AllUserData) {
    clearUserInfo()
    const userData = allUserData.userData
    name.value = userData.name
    icon.value = userData.icon
    platform.value = userData.platform
    home.value = userData.home
    token.value = userData.token
    app.storage.setLocal('token', userData.token)

    views.likeComments = new Set(allUserData.likeComments)
    views.dislikeComments = new Set(allUserData.dislikeComments)
    views.likeArticles = new Set(allUserData.likeArticles)
    views.dislikeArticles = new Set(allUserData.dislikeArticles)
  }

  function clearUserInfo () {
    token.value = ''
    name.value = ''
    icon.value = ''
    Object.values(views).forEach(set => set.clear())
  }

  return { token, name, icon, platform, home, views, setUserData, clearUserInfo }
})