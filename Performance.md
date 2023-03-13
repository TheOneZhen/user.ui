# vue组件性能优化
  1. 优化方向及举例
     1. 组件结构优化
        1. 将高频渲染内容从父组件中拆分为子组件，避免整个组件渲染（vue是每个组件内进行[diff]）
        2. 相似业务组件抽象为单个组件
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
        1. 对于静态数据，如果大量调用可使用中间变量存储计算结果，避免重复计算或使用计算属性、监听属性等带来性能损耗
     3. 交互
        1. 频繁开关组件可使用v-show代替v-if以减少[reflow(外网)](https://developers.google.com/speed/docs/insights/browser-reflow?hl=zh-cn)
        2. [动态组件（\<component />）](https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components)频繁切换可使用[\<keep-alive>](https://cn.vuejs.org/api/built-in-components.html#keepalive)进行组件缓存，<keep-alive>组件属性include | exclude可筛选缓存组件，max属性可以限制最大缓存实例数量
        3. [路由组件（\<router-view />）]可以配合\<keep-alive>结合[meta](https://router.vuejs.org/zh/guide/advanced/meta.html)属性指定缓存组件（建议指定高频组件）
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
           2. 使用[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)，
  2. 如何测试组件性能并得出优化方案
  3. 内容引用
     1. [vue性能优化篇](https://zhuanlan.zhihu.com/p/222017168)

# diff

# CSS
  1. reflow
     1. reflow happens when a browser must process and draw par or all of a webpage again
  2. repaint
     1. 
  3. animation

# 