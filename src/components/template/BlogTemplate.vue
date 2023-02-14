<template>
  <v-md-preview :text="text" ref="preview" />
  <el-backtop :right="100" :bottom="100" />
  <el-affix position="bottom" :offset="120">
    <el-button class="g-pointer" @click="isShowContent = true">目录</el-button>
  </el-affix>
  <el-drawer v-model="isShowContent"
             :append-to-body="true"
             :before-close="done => (isShowContent = false) && done()"
             direction="ltr"
             title="目录">
    <div v-for="content in contents"
         :key="content.title"
         :style="{ padding: `10px 0px 10px ${content.indent * 20}px`}"
         @click="handleAnchor(content)">
      <a class="g-pointer">{{  content.title }}</a>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { VueInstance } from '@vueuse/core'
import { onMounted, ref } from 'vue'
type PreviewVueInstance = VueInstance & { scrollToTarget: (p: any) => void }
const text = `
# 学习疑问点
  1. postCss
  2. 对打包工具的认知
     1. 前端经过多年迭代产生了版本断层与技术变更，于是有了各类兼容插件来处理这些问题，随着插件越来越多越不适合手动调用，便有了工程化工具来自动处理这些问题
     2. webpack、rollup、parcel的发展极大改善了前端开发
     3. 
  3. CSS Modules：导入这样的文件会返回一个模块对象
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
# 学习疑问点
  1. postCss
  2. 对打包工具的认知
     1. 前端经过多年迭代产生了版本断层与技术变更，于是有了各类兼容插件来处理这些问题，随着插件越来越多越不适合手动调用，便有了工程化工具来自动处理这些问题
     2. webpack、rollup、parcel的发展极大改善了前端开发
     3. 
  3. CSS Modules：导入这样的文件会返回一个模块对象
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
# 学习疑问点
  1. postCss
  2. 对打包工具的认知
     1. 前端经过多年迭代产生了版本断层与技术变更，于是有了各类兼容插件来处理这些问题，随着插件越来越多越不适合手动调用，便有了工程化工具来自动处理这些问题
     2. webpack、rollup、parcel的发展极大改善了前端开发
     3. 
  3. CSS Modules：导入这样的文件会返回一个模块对象
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
# 学习疑问点
  1. postCss
  2. 对打包工具的认知
     1. 前端经过多年迭代产生了版本断层与技术变更，于是有了各类兼容插件来处理这些问题，随着插件越来越多越不适合手动调用，便有了工程化工具来自动处理这些问题
     2. webpack、rollup、parcel的发展极大改善了前端开发
     3. 
  3. CSS Modules：导入这样的文件会返回一个模块对象
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
# 学习疑问点
  1. postCss
  2. 对打包工具的认知
     1. 前端经过多年迭代产生了版本断层与技术变更，于是有了各类兼容插件来处理这些问题，随着插件越来越多越不适合手动调用，便有了工程化工具来自动处理这些问题
     2. webpack、rollup、parcel的发展极大改善了前端开发
     3. 
  3. CSS Modules：导入这样的文件会返回一个模块对象
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
# 学习疑问点
  1. postCss
  2. 对打包工具的认知
     1. 前端经过多年迭代产生了版本断层与技术变更，于是有了各类兼容插件来处理这些问题，随着插件越来越多越不适合手动调用，便有了工程化工具来自动处理这些问题
     2. webpack、rollup、parcel的发展极大改善了前端开发
     3. 
  3. CSS Modules：导入这样的文件会返回一个模块对象
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
`
const preview = ref<PreviewVueInstance | undefined>()
const contents = ref<Array<{ title: string, lineIndex: string | null, indent: number }>>([])
const isShowContent = ref(false)

function handleAnchor (content: typeof contents.value[number]) {
  const head = preview.value?.$el.querySelector(`[data-v-md-line="${content.lineIndex}"]`)
  isShowContent.value = false
  if (head) {
    preview.value?.scrollToTarget({
      target: head,
      scrollContainer: window,
      top: 60
    })
  }
}

onMounted(() => {
  // after the real dom rendered, get all h title that creating the contents
  // implementation reference: https://code-farmer-i.github.io/vue-markdown-editor/senior/anchor.html
  if (preview.value) {
    const anchors = (preview.value.$el as HTMLDivElement).querySelectorAll<HTMLDivElement>('h1,h2,h3,h4,h5,h6')
    if (anchors) {
      const titles = Array.from(anchors).filter(title => !!title.innerText.trim())
      const tags = Array.from(new Set(titles.map(title => title.tagName))).sort()
      contents.value.push(...titles.map(title => ({
        title: title.innerText,
        lineIndex: title.getAttribute('data-v-md-line'),
        indent: tags.indexOf(title.tagName)
      })))
    }
  }
})
</script>
