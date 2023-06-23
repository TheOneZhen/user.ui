# 新内容摄入
  1. join pnpm
  2. for SEO
     1. article not compile to html-doc in back-end
     2. title of article will be keywords in dialog page into SEO
  3. lottie
  4. 优化项目中代码格式
     1. vue模板中采用一种很清爽的写法，你懂的那种写法
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

# 开发内容提醒
1. 继续开发留言界面
   1. 数据库结构设计(T)
   2. 弹幕：所有界面共用一个弹幕
   3. 留言：只在留言栏显示
   4. 标注：只在文章界面显示（key articleId）

# 问题分析

# 评论组件设计


## 使用docker部署后端
1. 代码依旧在github上，本地开发后将env上传至dockers hub，

# 主题设计（第一尺度，时间）
  1. 类型
     1. 日主题
        1. 节日主题
        2. 新闻主题
        3. 天气主题
        4. 时间段主题
           1. 早晨
           2. 下午
           3. 晚上
           4. 凌晨
     2. 周主题
     3. 月主题
     4. 季节主题
     5. 年主题
  2. 影响内容
     1. 背景色
     2. 字体颜色
     3. 动画
        1. 渐入效果
        2. 渐入时长
     4. 交互