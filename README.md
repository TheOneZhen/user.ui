# 基本命令
  1. 项目构建命令
    ```
    yarn create vite user.ui --template vue-ts
    ```
  2. 运行项目
    ```
    yarn run dev | yarn vite
    ```
  3. 安装依赖
    1. npm install || yarn
      根据package.json安装依赖
    2. npm install \<module_name> \<--save || ''>
      将指定依赖保存到dependencies，以便生产环境部署
    3. 3.2 + \<--save-dev || -D>
      将指定依赖保存到devDependencies，代表仅部署开发环境

# 项目结构说明
  1. @/DS是主项目的全部数据结构配置目录，所有的结构都要继承或引用至这里

# 关于项目README
  1. 属于相应项目的功能的todo都记录在根md下
  2. 除根md，其余目录下的md主要作用是记录功能的实现或者说明
  3. 问题及知识点记录放在根md下
  4. 为了方便GitHub上的预览，所有md均命名为README.md

# 构建规则
   1. 能不原生就不原生，尽可能找造好的组件
   2. 整个系统的结构一定要清晰

# 时间安排
   1. 工作日早上抽出1小时
   2. 双休日动态安排

# 预览
  1. 布局
     1. header导航栏
        1. 屏幕尺寸大于975 * 600时（电脑端）
           1. 移动到顶部使用横向菜单栏展示
           2. 非顶部采用纵向菜单栏展示
        2. 剩余尺寸（电脑端）
           1. 全部使用纵向
        3. 移动端（pad、phone）采用缩略栏
           1. 默认为组件库样式即可
              1. 目前不清楚组件库是否支持移动端/电脑端的切换，我记得浏览器好像自带这个功能
           2. 其他内容的展示使用grid
     2. content
        1. 详细内容参看下述
     3. footer
        1. 展示网站备案信息
        2. 对于移动端，提供给用户一个入口以切换是否以电脑端展示网站内容
     4. 全局的渐入渐出
        1. 尝试能不能抽象为一个通用组件
           1. 组件渐入渐出
           2. 组件实例之间可以交互（需要对组件进行状态管理）
        2. 指令考虑
  2. 首页
     1. 首页分为三页
     2. 分页布局使用grid，已适配移动端
     3. 三页之间的切换要求一种渐入渐出以及图形交互的渲染效果
        1. 借鉴apple
     4. 第一页主要展示个性签名以及博客内容导航
        1. 签名使用doodle实现个性化，博客内容导航使用垂直向走马灯
        2. 个性签名如果doodle不易实现，去github上找渐变的组件
        3. 垂直向走马灯是可以跳转到网站内的任意内容的
           1. 对网站的路由要求极高
     5. 第二页为用户星球
        1. 展示网站游客登录及浏览情况（存入DB）
           1. 根据ip记录游客用户
           2. 根据邮箱记录注册用户
           3. 获取浏览器位置信息，当前用户颜色特殊处理
        2. 点击展示的内容时，弹出用户浏览记录
           1. 这里需要分配查询，还要加上loading
     6. 第三页为资源链接
        1. 连接外部资源，外部资源为一系列知识点，树结构
        2. 这里设置一个定时器，每隔一段时间切换知识树
        3. 树的方向如果可以切换那就更好了
  3. 留言区
     1. 展示所有区域的留言（文档资源内容等区域的评论、留言区留言），并提供跳转
     2. 留言是可以展示为弹幕的
     3. 切换留言展示样式
        1. 比如微博型号的留言切换为便签留言
  4. 文档模板引擎
     1. 把siyuan的引擎迁移过来
        1. siyuan采用的是模板内渲染的方式，迁移与后续使用感觉都是问题
     2. 文档支持md的导入导出，或者直接仅支持md