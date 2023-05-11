# 命令
  1. vite项目构建命令：```yarn create vite user.ui --template vue-ts```
  2. 运行项目：```yarn vite```
  3. 安装依赖
     1. 根据\<root\>路径下package.json安装依赖：```yarn```
     2. 安装指定依赖的指定版本：```yarn add module_name@version```
     3. 将指定依赖保存到devDependencies（代表仅部署开发环境）：```yarn add module_name -D```
     4. ignoring the same module with different version: ```yarn add [moduleName] --legacy-peer-deps```
     5. nvm sets default version for node: ```nvm alias default [version]```

# 项目架构
1. 文件设计
  1. 开发过程遇到的知识点可以直接写入对应功能文件，不需要再建立README
  2. 类型定义由src中独立为type目录以支持`TSLint`
  3. 所有的配置文件命名必须是modulePrefix.config.fileSuffix
     1. 提醒自己之后需要把这里的内容权限交给后台
     2. 更醒目一些
2. 模块交互
  1. 模块之间禁止直接调用，应该通过app调度
  2. 每个模块下都有一个index文件，对模块的引用只能访问index