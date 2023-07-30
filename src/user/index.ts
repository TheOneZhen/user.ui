import { USERAPI } from './user.api'

export class User {

  async loginByGithub () {
    const clientId = await app.request.get<string>(USERAPI.GET_ACCESS_ID, {})
    const subwin = window.open(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${window.location.href}`)
    if (subwin) {
      const listener = (event: MessageEvent) => {
        // 接收到code，开始登录
        if (event.data) this.accessGithubUserData(event.data)
        window.removeEventListener('message', listener)
      }
      window.addEventListener('message', listener, false)
    }
  }

  /**
   * 请求GitHub用户信息。这个时候不用关心用户是否登录上，只需要获取信息，更新信息即可
   * @param code 授权码
   */
  accessGithubUserData (code: string) {
    const user = app.store.get('UseUserStore')
    app
      .request
      .post<AllUserData>(USERAPI.ACCESS_GITHUB_USER_DATA, { code })
      .then(result => user.setUserData(result))
      .catch(reason => {
        user.clearUserInfo()
        console.warn(reason)
      })
  }

  login () {
    const user = app.store.get('UseUserStore')
    if (user.token) {
      app
        .request
        .post<AllUserData>(USERAPI.USER_LOGIN, {})
        .then(result => user.setUserData(result))
    }
  }

  async getIcons () {
    const result = await app.proxyRequest<{icons: string[]}>('https://icones.js.org/collections/streamline-emojis-meta.json')
    return result.icons
  }

  addComment (content: CommentType['content'], article: CommentType['article'], quote: CommentType['quote']) {
    return app.request.post<boolean>(USERAPI.ADD_COMMENTS, { content, article, quote })
  }

  getComments (article: CommentType['article'], quote: CommentType['quote']) {
    return app.request.post<CommentType[]>(USERAPI.GET_COMMENTS, { article, quote })
  }

  likeComment (id: CommentType['id']) {
    return app.request.post<boolean>(USERAPI.LIKE_COMMENT, { id })
  }

  dislikeComment (id: CommentType['id']) {
    return app.request.post<boolean>(USERAPI.DISLIKE_COMMENT, { id })
  }
}