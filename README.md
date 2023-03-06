# 基本命令
  1. vite项目构建命令：```yarn create vite user.ui --template vue-ts```
  2. 运行项目：```yarn vite```
  3. 安装依赖
     1. 根据\<root\>路径下package.json安装依赖：```yarn```
     2. 安装指定依赖的指定版本：```yarn add module_name@version```
     3. 将指定依赖保存到devDependencies（代表仅部署开发环境）：```yarn add module_name -D```
     4. ignoring the same module with different version: ```yarn add [moduleName] --legacy-peer-deps```

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

# 布局开发注意
  1. 组件宽高设定
     1. 每个通用组件的宽度不可以写死，高度依据具体业务再确定是否写死；宽度必须交由引用此组件的外部组件进行确定
     2. 组件的尺寸尽量使用自适应单位（em, rem, vh, vw...），以减少对屏幕自适应的适配
  2. 引用外部组件宽高设定（e.g. element+）

# about the record of technology doc
  1. it is enhance your knowledge arch mainly
  2. sharing secondly but it must be filted
  3. why en: haha
  4. to speed up the efficiency of doc, you can key in link site or other resource

# 知识点留白
  1. 性能优化相关
     1. props更新时会导致组件的刷新，对于容器来说，单个容器元素的更新会导致容器内全部组件重新渲染
        1. 可以加入状态转换props，使组件在必要的时候更新或者卸载
        2. 或者使用v-once或v-memo指令
     2. 虚拟列表
     3. shallowRef与shallowReactive斩断深层响应式
     4. 避免组件树超功能多次调用（VNode是性能优化关键）
  3. ts类型检查理解
     1. 开发过程中的类型检查
        1. vscode内置ts语言服务实例
        2. volar（外部插件）ts语言服务实例
     2. 编译过程中的类型检查
        1. webpack：只是单文件的检查，不能介入全局
        2. vite
  4. vue类型检查
     1. vue编译器不会抓取导入的文件进行分析源类型，所以导入的module不能做为props泛型（defineProps<{}>()）
     2. props使用基于类型的声明时，不能赋默认值，需要调用额外的方法widthDefault
     3. provide/inject类型标注需要借助InjectionKey（继承自Symbol的泛型类型）
     4. 如何获取组件返回值类型（defineExpose1）：<InstanceType<typeof Component>>
     5. 扩展全局属性

# 学习疑问点
  1. postCss
  2. 对打包工具的认知
     1. 前端经过多年迭代产生了版本断层与技术变更，于是有了各类兼容插件来处理这些问题，随着插件越来越多越不适合手动调用，便有了工程化工具来自动处理这些问题
     2. webpack、rollup、parcel的发展极大改善了前端开发
     3. 
  3. CSS Modules：导入这样的文件会返回一个模块对象
      ```js
        /** example.module.css */
        .red {
          color: red;
        }
        /** .js */
        import styleObj from './example.module.css'
        dom.className = styleObj.red
      ```
  4. Web Worker
  5. ESM具名导入优点
     1. 有效支持TreeShaking
  6. ESM文件动态导入（懒加载）
     1. import写在顶部与动态导入的区别
  7. WebAssembly
  8. 打包过程中chunk的作用
  9. AMD、CommonJS、UMD、ESM
  10. 对vite构建的理解
     1. vite使用EsBuild预构建源码
        1. 索引Module依赖
        2. 将CommonJS 或 UMD 转换为ESM
  11. url变基
  12. ESM
  13. URL构造器
  14. different page using same components what the packing doing in mpa
      1. inject 1: both building
      2. inject 2: building in main?
  15. https://developer.chrome.com/blog/inside-browser-part1/
      1. a series knowledge of browser internal architecture that is separed four partition and this is first part
      2. it include many cartoon images funny and detail