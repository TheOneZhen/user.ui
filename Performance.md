# 前端性能优化
由于前端面向设备广泛，使得其性能优化不局限于代码层面，参考[lighthouse](https://github.com/GoogleChrome/lighthouse)工具性能指标（摘自[vue项目你一定会用到的性能优化！](https://juejin.cn/post/7089241058508275725)）：
- [首次内容绘制（First Contentful Paint）](https://web.dev/i18n/zh/fcp/)：浏览器首次将任意内容（如文字、图像、canvas 等）绘制到屏幕上的时间点
- [交互时间（Time to Interactive）](https://web.dev/i18n/zh/tti/)：指的是所有的页面内容都已经成功加载，且能够快速地对用户的操作做出反应的时间点
- [速度指标（Speed Index）](https://web.dev/speed-index/)：衡量了首屏可见内容绘制在屏幕上的速度。在首次加载页面的过程中尽量展现更多的内容，往往能给用户带来更好的体验，所以速度指标的值约小越好
- [总阻塞时间（Total Blocking Time）](https://web.dev/i18n/zh/tbt/)：指First Contentful Paint 首次内容绘制 (FCP)与Time to Interactive 可交互时间 (TTI)之间的总时间
- [最大内容绘制（Largest Contentful Paint）](https://web.dev/i18n/zh/lcp/)：度量标准报告视口内可见的最大图像或文本块的呈现时间
- [累积布局偏移（Cumulative Layout Shift）](https://web.dev/i18n/zh/cls/)：衡量的是页面整个生命周期中每次元素发生的非预期布局偏移得分的总和。每次可视元素在两次渲染帧中的起始位置不同时，就说是发生了LS（Layout Shift）

从这些指标可以看出（其实自己想也能想出），前端的性能主要是为了提升交互体验

> **前端项目性能优化没有绝对标准，上述指标以及本文归纳仅为参考**

## 资源优化
首先我们回顾**浏览器与服务器建立连接（服务器响应HTML文件）**到**内容展示**做了哪些事情：
> - 服务器发送一个响应头给浏览器，响应头内包含HTML内容
> - 浏览器收到响应后将HTML文件交由渲染进程从上到下解析并生成DOM树，当遇到：
>   - 非阻塞资源（图片、视频等）：请求这些资源并继续解析文档
>   - 阻塞资源：
>     - css文件：请求资源并继续解析文档
>     - js文件：阻塞渲染并停止HTML解析（尽管[浏览器的预加载扫描器](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#preload_scanner)加速了这个过程）
> - DOM生成后，处理CSS构建CSSOM
> - DOM与CSSOM合并为Render Tree然后[渲染](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work#render)至可视窗口

### 然后嘛，优化点就有了：
1. 当资源质大量大时，使服务器带宽受限，则有必要：
   1. 资源压缩传输
   2. 有效使用CDN
   3. 加强组件复用、样式复用，静态文件复用
   4. 资源请求chunk，避免超大js脚本
     1. 对于单文件组件，首页请求的脚本体积很大，在打包时可以根据路由chunk成不同的包
   5. 
2. 虽然浏览器可以使用预解析在解析HTML之前加载外部资源，但当资源加载失败时，该做的复杂工作还是要做，所以要[对页面预解析进行优化](https://developer.mozilla.org/zh-CN/docs/Glossary/Speculative_parsing)
3. 改变外部资源引用顺序
   1. css禁用@import
      > 浏览器预解析HTML后会并行下载解析到的CSS文件，但是只有当解析CSS文件时，才能知道@import引用了额外资源然后等待下载（阻塞渲染）。综述@import会破坏浏览器并行下载CSS
   2. HTML中\<script\>标签尽量靠后
      > 脚本中可能存在修改CSS的操作

然后我们再回到lighthouse性能指标，发现上述问题与首次内容绘制，最大内容绘制有关

## 交互优化
<!-- 为什么把重绘放到这里介绍的原因 -->
在[资源优化](#资源优化)中我们提到了浏览器将Render Tree渲染到可视窗口，假设我们完美地进行了资源优化，使所有资源在RT构建完全前全部加载，我们再来看下浏览器渲染做了哪些事情：
> - 浏览器首先[结合样式](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work#style)，根据RT将样式结合到每一个**可见**节点上，但不标识每个节点的大小和位置
> - 再进行[布局](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work#layout)，从RT根节点开始，确定节点的大小和位置
> - 然后将节点的可见部分绘制到屏幕上
> - 如果节点在绘制过程中出现了[分层]()，绘制结束后需要进行合成

1. 减少分层
   1. 分层是以内存为代价的

但任何过程都不可能存在完美，当资源优化后仍存在资源在RT构建完全后加载，就可能导致[回流]()，回流可以理解为**另一次布局**，它会触发重新绘制和重新组合，这也是$nothing > repaint > reflow$的原因

## 专项优化
此类优化是开放的（综合来说所有的优化都是开放的），决定优化方案的背景可能是接手的项目、个人习惯、社区或设备支持，甚至是心情。以下方案提供来源于写者的项目经历
  1. 基于electron的客户端开发（工业软件）：Chromium一个渲染进程（一个tab页）内存限制在2GB左右（可通过[window.performance.memory](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/memory)查看）
  2. 因为electron使用Chromium内核，所以我们在

## 首次内容绘制
  1. 将高频内容从父组件中拆分为子组件，避免整个组件渲染（vue是每个组件内进行[diff]）
  2. 相似业务组件抽象为单个组件（加强组件复用）
  3. 如组件A调用频繁，避免A内再定义额外组件
     ```js
      // A.vue(x)
      <template>...</template>
      <script>const componentB = defineComponent(...)</script>
      // A.vue
      <template>...</template>
      // B.vue(√)
      <template>...</template>
     ```
  4. 对于静态数据，如果大量调用，可使用中间变量存储计算结果，避免重复计算或使用计算属性、监听属性等带来性能损耗
  5. 频繁开关组件使用v-show代替v-if以减少[reflow(外网)](https://developers.google.com/speed/docs/insights/browser-reflow?hl=zh-cn)
  6. [动态组件（\<component />）](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)使用[\<keep-alive>](https://cn.vuejs.org/api/built-in-components.html#keepalive)进行组件缓存，<keep-alive>组件属性include | exclude可筛选缓存组件，max属性可以限制最大缓存实例数量
  7. [路由组件（\<router-view />）]可以配合\<keep-alive>结合[meta](https://router.vuejs.org/zh/guide/advanced/meta.html)指定缓存组件
        ```js
          // router.js
          const router = [{
            path: '/cacheMe',
            component: CacheMe,
            meta: {
              keepAlive: true
            }
          }]
          // Parent.vue
          <template>
            ...
            <keep-alive>
              <router-view v-if="$router.meta.keepAlive" />
            </keep-alive>
            <!-- 这里的组件不会被缓存 -->
            <router-view v-if="!$router.meta.keepAlive" />
          </template>
        ```
  8. 延迟加载组件
     1. vue3中通过[defineAsyncComponent()](https://cn.vuejs.org/guide/components/async.html)配合[\<suspense />](https://cn.vuejs.org/guide/built-ins/suspense.html)实现
        ```html
        <template>
          <suspense>
            <async-com />
            <template #fallback>
              <loading />
            </template>
          </suspense>
        </template>

        <script lang='ts' setup>
          import { defineAsyncComponent } from 'vue'
          import Loading from 'xxx'
          const AsyncCom = defineAsyncComponent({...})
        </script>
        ```
     2. 动画相关使用[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)，它是浏览器宏任务，类似settimeout，时间间隔由浏览器确定（与屏幕刷新率强相关），可以保证回调函数在下一次绘制前被执行。
        ```ts
          <script lang='ts' setup>
            ...
            /**
             * 执行大量DOM绘制时，同步处理数据会阻塞js线程，DOM在一帧中渲染会产生卡顿。可以通过切割数据多帧渲染，使动画看起来更平滑
             */
            function draw(data: Array<any>, render: (par: typeof data) => any) {
              splitArray(data).forEach(chunk => {
                requestAnimationFrame(() => render(chunk))
              })
            }
            ...
          </script>
        ```
  9. 文件加载性能
     1. 禁用@import
     2. 增大样式复用
        ```js
          // global.scss
          .g-flex {
            display: flex;
          }
          // main.ts
          import 'global.scss'
          // componentA.vue
          <template>
            ...
              <div class='g-flex'>...</div>
            ...
          </template>
          // componentB.vue
          <template>
            ...
              <div class='g-flex'>...</div>
            ...
          </template>
        ```
     3. 减少css文件体积
  10. 代码性能
     1. 降低选择器层级
     2. 避免使用复杂选择器（兄弟选择器，属性选择器等）
     3. 不同浏览器内核有一些实验属性（或非标准属性），这些属性在客户端、移动端开发时可提供极大的性能优化，比如
        1. Chromium内核的content-visibility：值设置为auto时，浏览器只会渲染在可视窗口内出现过的元素
  11. 如何测试组件性能并得出优化方案
     1. lighthouse：https://juejin.cn/post/7089241058508275725
  12. 内容引用
     1. [vue性能优化篇](https://zhuanlan.zhihu.com/p/222017168)
     2. [requestAnimationFrame详解-js性能优化](https://blog.csdn.net/hyupeng1006/article/details/128861813)
     3. [使用 content-visibility 优化渲染性能](https://www.cnblogs.com/coco1s/archive/2022/06/14/16373817.html)
     4. [Web performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
# diff

# CSS
  1. reflow
     1. reflow happens when a browser must process and draw par or all of a webpage again
  2. repaint
     1. 
  3. animation

# 