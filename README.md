# 基本命令
  1. vite项目构建命令：```yarn create vite user.ui --template vue-ts```
  2. 运行项目：```yarn vite```
  3. 安装依赖
     1. 根据\<root\>路径下package.json安装依赖：```yarn```
     2. 安装指定依赖的指定版本：```yarn add module_name@version```
     3. 将指定依赖保存到devDependencies（代表仅部署开发环境）：```yarn add module_name -D```
     4. ignoring the same module with different version: ```yarn add [moduleName] --legacy-peer-deps```
     5. nvm sets default version for node: ```nvm alias default [version]```

# 项目架构
  1. 模块化设计以及FS耦合的规避
     1. 类型体操不属于项目模块化内容（独立于FS）
        1. @/DS是主项目的全部数据结构配置目录，所有的结构抽象基类都要继承或引用至这里
     2. utils不属于项目模块化内容（设立为冲突地带，模块间的耦合在此解决）（×）
        1. 耦合地带尽量聚合到一个文件下，如果不行再划分耦合模块（目录）
     3. 外部模块不属于项目模块化内容
        1. 对于外部项目、组件，都必须实现按需打包
     4. 单一功能内模块，不可以直接引入其它模块
        1. 比如request模块，不可以直接引入API，API应该做为request类初始参数传入，request实例化应该在冲突地带实现
  2. 开发注意项
     1. 个人架构初期不适合考虑具体实现细节，不然会疲于后续功能设计以及开发
     2. 关于README
        1. 除\<root\>下md，其余目录下的md主要作用是面向模块以及模块todo
        2. 文档行数不应该过多，最好一页能展示出来，多了影响视觉；为了方便GitHub上的预览，所有md均命名为README.md
        3. 问题及知识点记录放在根md下，最后都要转化到思维导图中
  3. 前后端分离
     1. 后端保证有效数据完整性：减少数据拆分处理，全权交由前端，提升服务高效
     2. 初步解释，前端多页面映射后端多应用

# 布局开发注意
  1. 组件宽高设定
     1. 每个通用组件的宽度不可以写死，高度依据具体业务再确定是否写死；宽度必须交由引用此组件的外部组件进行确定
     2. 组件的尺寸尽量使用自适应单位（em, rem, vh, vw...），以减少对屏幕自适应的适配
  2. 引用外部组件宽高设定（e.g. element+）
     1. 尽可能使用自适应单位
