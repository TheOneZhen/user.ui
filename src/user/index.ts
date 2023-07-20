import { USERAPI } from './user.api'

export class User {

  loginByGithub () {
    const subwin = window.open('https://github.com/login/oauth/authorize?client_id=6bc90ff0223722776ace&redirect_uri=' + window.location.href)
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
      .post<UserData>(USERAPI.ACCESS_GITHUB_USER_DATA, { code })
      .then(result => {
        console.log('execute success!', result)
      })
      .catch(reason => {
        user.clearUserInfo()
        console.warn(reason)
      })
  }

  login () {

  }
}