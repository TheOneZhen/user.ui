# 基本命令
  1. 项目构建命令：yarn create vite user.ui --template vue-ts
  2. 运行项目：yarn run dev | yarn vite
  3. 安装依赖
    1. 根据package.json安装依赖：npm install || yarn
    2. 安装指定依赖的指定版本：npm install module_name@version
    3. 将指定依赖保存到devDependencies（代表仅部署开发环境）：3.2 + \<--save-dev || -D>

# 架构设计
  1. 模块化设计以及FS耦合的规避
     1. 类型体操不属于项目模块化内容（独立于FS）
        1. @/DS是主项目的全部数据结构配置目录，所有的结构都要继承或引用至这里
     2. utils不属于项目模块化内容（设立为冲突地带，模块间的耦合在此解决）（×）
        1. 耦合地带尽量聚合到一个文件下，如果不行再划分耦合模块（目录）
     3. 外部模块不属于项目模块化内容
        1. 对于外部项目、组件，都必须实现按需打包
     4. 单一功能内模块，不可以直接引入其它模块
        1. 比如request模块，不可以直接引入API，API应该做为request类初始参数传入
        2. request实例化应该在冲突地带实现
  2. 注意项
     1. 个人架构初期不适合考虑具体实现细节，不然会疲于后续功能设计以及开发

# 关于README
  1. 属于相应项目的功能的todo都记录在根md下
  2. 除根md，其余目录下的md主要作用是记录功能说明以及todo
  3. 文档行数不应该过多，最好一页能展示出来，多了影响视觉
  4. 问题及知识点记录放在根md下
  5. 为了方便GitHub上的预览，所有md均命名为README.md

# 知识点留白
  1. 性能优化相关
     1. props更新时会导致组件的刷新，对于容器来说，单个容器元素的更新会导致容器内全部组件重新渲染
        1. 可以加入状态转换props，使组件在必要的时候更新或者卸载
        2. 或者使用v-once或v-memo指令
     2. 虚拟列表
     3. shallowRef与shallowReactive斩断深层响应式
     4. 避免组件树超功能多次调用（VNode是性能优化关键）
  2. IDE插件检查
     1. Volar
     2. TypeScript Vue Plugin（Volar）：支持在ts文件中引入vue文件
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
  5. ts类型体操
     1. 调用签名

# todo
1. 各页面补充