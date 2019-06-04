function integrateGitment(router) {
  const linkGitment = document.createElement('link')
  linkGitment.href = 'https://imsun.github.io/gitment/style/default.css'
  linkGitment.rel = 'stylesheet'
  const scriptGitment = document.createElement('script')
  document.body.appendChild(linkGitment)
  scriptGitment.src = 'https://imsun.github.io/gitment/dist/gitment.browser.js'
  document.body.appendChild(scriptGitment)

  router.afterEach((to, from) => {
    // 页面滚动，hash值变化，也会触发afterEach钩子，避免重新渲染
    if (to.path === from.path) return
    // 已被初始化则根据页面重新渲染 评论区
    const $home = document.querySelector('.home')
    const $page = document.querySelector('.page')
    const commentsContainer = document.createElement('div')
    commentsContainer.id = 'comments-container'
    commentsContainer.classList.add('content')
    if (scriptGitment.onload) {
      if ($page) {
        $page.appendChild(commentsContainer)
      }else{
        $home.appendChild(commentsContainer)
      }
      renderGitment()
    } else {
      scriptGitment.onload = () => {
        if ($page) {
          $page.appendChild(commentsContainer)
        }else{
          $home.appendChild(commentsContainer)
        }
        renderGitment()
      }
    }
  })

  function renderGitment() {
    const gitment = new Gitment({
      // ！！！ID最好不要使用默认值（location.href），因为href会携带hash，可能导致一个页面对应像个评论issue！！！
      // https://github.com/imsun/gitment/issues/55
      id: location.pathname,
      owner: 'fxss5201', // 必须是你自己的github账号
      repo: 'practical-code-snippet', // 上一个准备的github仓库
      link: location.origin + location.pathname,
      oauth: {
        client_id: 'd8cf9772e225e15ec43d', // 第一步注册 OAuth application 后获取到的 Client ID
        client_secret: 'b2ad13ecd3d44135279ae91b1d2c11ef3dfe0feb', // 第一步注册 OAuth application 后获取到的 Clien Secret
      },
    })
    gitment.render('comments-container')
  }
}

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  try {
    // 生成静态页时在node中执行，没有document对象
    document && integrateGitment(router)
  } catch (e) {
    console.error(e.message)
  }
}