# description
  1. like a PRD to making the function explicit
  2. build a architecture around all function, formate a ecology
  3. 一些静态资源的选择可以在非开发阶段进行，方便最后统一[theme](#theme)
     1. 开发阶段可以临时使用文字代替
  4. static resource seletion

# nav
  1. 入口：通过任意方式进入网站时，都可以看到导航栏
  2. 内容及对应界面简介（具体看各个界面（功能）设计）
     1. [home](#home)
     2. [blog](#home)
     3. [lefting](#leftinginclude-balloon)
     4. [find me](#find-me)
        1. 一个静态网页，可以跳转到我的其他社交平台
  3. 交互
     1. 通用交互
        1. 导航栏在顶部时对滚动条位置的响应(√)
           1. 滚动条上部移动到顶端时，永久显示导航栏
           2. 滚动条若在非顶端位置，5000ms后自动渐变隐藏
        2. 当屏幕长 <= 宽时，导航栏显示在左侧，反之显示在顶部(√)
        3. 尺寸
           1. 导航栏在顶部时，固定高度等比例长度
           2. 在左侧时，固定宽度等比例高度
     2. 对移动设备的支持
        1. 暂不支持

# blog
  1. negate the previous proposal what coming true many page than differentiate from article tags. Inspiration comes from the blog of [antfu](https://antfu.me/) that simple and smart.
  2. layout
      ```
      | filer  |       |
      ----------  list |
      |timeline|       |
      |        |       |
      ```
  3. enter point
     1. refer [nav](#nav)
     2. load blogModel: app starting
  5. 组件间交互
     1. 高亮timeline时（DOM focus），增加它的高度
     2. 点击timeline目录项时，执行1， 清除filter组件过滤，文章跳转到指定时间点
     3. 点击filter时，高亮filter，并增加它的高度
     4. filter输入过滤时，根据标签过滤list内容
     5. 点击filter内标签时，过滤list内容
     6. 点击filter内标题时，跳转到指定文章
  6. 组件
     1. filter
        1. filter input
           1. 输入关键字后执行[tags过滤]
           2. 关键字内容需要高亮
           3. 输入框右侧可以切换tags展示模式
        2. tags
           1. 俩种模式
              1. 以列表的形式展示：点击tag，执行[main过滤]；悬浮title，展示完整描述，点击title，执行[main跳转]
              2. 悬浮显示列表：交互同上，弹窗使用一个组件并显示在filter右侧
           2. 文章描述支持markdown
     2. timeline
        1. 点击时间点执行[main跳转]
        2. 同步main滚动
     3. main
  7. 数据结构设计
     1. 组件角度依赖：日期，文章数量，文章标题，文章标签，文章描述
     3. result
      ```ts
        [{ date: 'YYYY-MM-DD HH:mm:ss', title: string, tags: Array<string>, description: string }]
        // 文章数量通过拆分所有文章date获取
        // 年份也通过拆分获取
      ```
  
# lefting(include balloon)
  1. enter
     1. nav -> lefting
     2. bottom left corner of all page and as a button -> balloon
  2. lefting
     1. 基本样子参考B站或者微博等社交网站
     2. 配色符合[theme](#theme)
     3. 要求支持markdown
  3. 弹幕
     1. 入口
        1. 悬浮在主界面左下角，点击触发是否打开弹幕，默认打开
        2. 点击特效、样式规则符合左下角悬浮工具
        3. 悬浮入口按钮上时出现弹幕设置按钮，点击弹幕设置按钮显示弹幕设置界面
     2. 功能简介
        1. 功能打开时，弹幕按照配置显示、移动
        2. 鼠标悬浮到弹幕上时，弹幕停止移动，并显示详细信息
        3. 弹幕内容要求支持markdown，且数据结构同用户留言
     3. style
        1. its *skin* vary automatically according to the festival, moods, emergency, time and so on
        2. style satisfied theme(as the default styles)
        3. the style that can be modified include font size, font family, opacity, font color, background, font weight, line height
     4. direction
        1. from around direction
        2. bubble, ballon, around to center, scattering ...
     5. coverage ratio
        1. 100%, 75%, 50%, 25%, 0%
        2. when set 0%, switch on-off to off
     6. on-off
     7. filter
        1. protogenetic page tag
        2. keyword(split by server)

# theme
  1. includes
     1. color
     2. bk
     3. animation

# home
  1. 交互
     1. 首页共三小页，监听鼠标事件进行小页跳动
     2. 

# 文档模板
  1. 模板附加组件
     1. back top(use ele component directly)(t)(become a common tool and lay in el-aside)
     2. dialog button(t)(reference function is wrong)
        1. when mouse hover on the button, show the content of list
        2. click content item and scroll to its title
     3. tag for other article
        1. 入口：文章标题下方
        2. 交互
           1. 鼠标悬浮到标签上，显示相同标签文章列表
           2. 单击列表项，可跳转到目标文章
           3. 列表右上侧
              1. 检索按钮
                 1. 用户输入文字后过滤相关文章
              2. 排序按钮
                 1. 支持按时间排序，默认按日期降序
     4. 辅助阅读工具（参考知乎）
  2. 模板内容
     1. 界面顶部显示文章标题
     2. 文章标题下显示文章标签
     3. 文章标签下显示文本内容(t)
     4. 最下面显示推荐文章

# 资源

# MPA 
  1. why use MPA
     1. reduce the amount of data requested at a time
     2. function partition
  2. pages
     1. main: include home, lefting, all blogs(articles), find me
     2. bullet screen(although opened default)
     3. user earth: user scroll to its page while starting request(mind the cache)
     4. other: undefined function but another page necessary

# layout page layout
  1. el-scroll lay in app child node
  2. 

# find me
  1. a static page
  2. interation
     1. after user into this page, 
  3. other social platform
     1. tech sharing: leetcode, juejin, CSDN, github
     2. lefting: qq-eamil

# all icon replace to element-icons(t)
# component auto-imports(t)
# backend speed up the CI/CD building necessary
  1. the frontend request server straightforwardly

# after the blog page finished, staring associate all pages and defining ds by front-end's perspective

# 新内容摄入
  1. join pnpm
  2. for SEO
     1. article not compile to html-doc in back-end
     2. title of article will be keywords in dialog page into SEO
  3. lottie
  4. 优化项目中代码格式
     1. vue模板中采用一种很清爽的写法，你懂的那种写法
  5. 把之前对于架构的思考写入md中
  6. 找到一个很有意思的svg作品库：https://www1.plurib.us/svg_gallery/
  7. 这是之前看b站视频弄到的配色，把它应用到自己的theme中
    ```js
      #9D2121, #00879A, #E05320
      #671812, #CAC0C1, #513C21
      #E4D0C9, #B7B2CF, #2B515F
      #E2E0EE, #092106, #000000
      #235D6B, #B52807, #7B723C
      #B63F31, #D6CADD, #2C47A6
      #D4AC51, #D8D1DD, #1B3E36
      background: linear-gradient(to right, #235D6B, #B52807, #7B723C);
    ```

  8. 自适应单位以及自适应布局
  9. 把userearth部署一下
  10. http2
     1. 把服务器文件及目录结构清理一下，实在不行就重装系统
     2. 网站应该放在显眼的位置，不然以后不好找
  11. 路由配置一下，刷新的时候报404
  12. 状态管理索引文件没有弄好
      1. 根据StoreKey获取状态及其注解

# 开发内容提醒
1. 全局drawer，可以插入任何内容的那种