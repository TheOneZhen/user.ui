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
    2. npm install <module_name> <--save || ''>
      将指定依赖保存到dependencies，以便生产环境部署
    3. 3.2 + <--save-dev || -D>
      将指定依赖保存到devDependencies，代表仅部署开发环境

# 项目结构说明
  1. @/DS是主项目的全部数据结构配置目录，所有的结构都要继承或引用至这里
  2. 