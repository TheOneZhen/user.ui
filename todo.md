# 说明
  1. 明确个人开发方向，使开发更加清晰
  2. 使各个功能间形成体系，完善更好的生态
  3. 一些静态资源的选择可以在非开发阶段进行，方便最后统一[主题](#主题)
     1. 开发阶段可以临时使用文字代替

# 导航栏设计
  1. 入口：通过任意方式进入网站时，都可以看到导航栏
  2. 内容及对应界面简介（具体看各个界面（功能）设计）
     1. [首页](#首页)
     2. [资源](#资源)
        1. 插件｜脚本
        2. 素材
        3. 资源文档
        4. 源码
     3. 学习记录
        1. 问题记录
        2. 源码分析
        3. 原理及业务实现
     4. [留言](#留言)
     5. 发现另外的我
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

# 文档或资源界面模板
  1. 对于资源和阶段总结界面，使用相同的模板，通过标签来分类

# 留言
  1. 入口
     1. 导航栏 -> 留言
     2. 所有界面右下角 -> 弹幕
  2. 留言
     1. 基本样子参考B站或者微博等社交网站
     2. 配色符合[主题](#主题)
     3. 要求支持markdown

# 主题

# 首页
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
  3. 文章DS设计
     1. table article[main]
        1. id primary key auto_increment
        2. title string !null
        3. icon string default('')
        4. content string default('')
           1. add trigger to delete the null content of article
           2. another use some utils transfrom article to html document resolve to SEO
        5. created date !null default(now())
        6. likes number !null default(0)
        7. dsilikes number !null default(0)
        8. views number !null default(0)
     2. table lefting
        1. id primary key auto_increment
        2. pageId foreign key(page.id) 
           1. laking some scenarios
        3. articleId foreign key(article.id)
           1. set a dead article that the id equal to -1
        4. userId foreign key(user.id)
        5. content string !null
           1. add trigger to delete the null content of lefting
        6. quote 
           1. explain: null represent comment to the target article, else commment other lefting
        7. likes number !null default(0)
        8. dsilikes number !null default(0)
     3. table tags
        1. id primary key auto_increment
        2. title string !null
        3. articleId foreign key(article.id)
     4. table sponsor
     5. table page

# 资源

# MPA 
  1. home as the one main in prod env
  2. 其他功能界面（用户星球，小游戏等）

# layout page layout
  1. el-scroll lay in app child node
  2. 
  
