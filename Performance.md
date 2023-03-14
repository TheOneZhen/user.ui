# vue组件性能优化
  1. 优化方向及举例
     1. 组件结构优化
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
     2. 业务（或代码）
        1. 对于静态数据，如果大量调用，可使用中间变量存储计算结果，避免重复计算或使用计算属性、监听属性等带来性能损耗
     3. 交互
        1. 频繁开关组件使用v-show代替v-if以减少[reflow(外网)](https://developers.google.com/speed/docs/insights/browser-reflow?hl=zh-cn)
        2. [动态组件（\<component />）](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)使用[\<keep-alive>](https://cn.vuejs.org/api/built-in-components.html#keepalive)进行组件缓存，<keep-alive>组件属性include | exclude可筛选缓存组件，max属性可以限制最大缓存实例数量
        3. [路由组件（\<router-view />）]可以配合\<keep-alive>结合[meta](https://router.vuejs.org/zh/guide/advanced/meta.html)指定缓存组件
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
        4. 延迟加载组件
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
     4. 样式（项目开发会使用CSS预处理语言，以下以scss举例）
        1. 文件加载性能
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
        2. 代码性能
           1. 降低选择器层级
           2. 避免使用复杂选择器（兄弟选择器，属性选择器等）
           3. 不同浏览器内核有一些实验属性（或非标准属性），这些属性在客户端、移动端开发时可提供极大的性能优化，比如
              1. Chromium内核的content-visibility：值设置为auto时，浏览器只会渲染在可视窗口内出现过的元素
  2. 如何测试组件性能并得出优化方案
  3. 内容引用
     1. [vue性能优化篇](https://zhuanlan.zhihu.com/p/222017168)
     2. [requestAnimationFrame详解-js性能优化](https://blog.csdn.net/hyupeng1006/article/details/128861813)
     3. [使用 content-visibility 优化渲染性能](https://www.cnblogs.com/coco1s/archive/2022/06/14/16373817.html)
# diff

# CSS
  1. reflow
     1. reflow happens when a browser must process and draw par or all of a webpage again
  2. repaint
     1. 
  3. animation

# 