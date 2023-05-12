<template>
  <z-markdown-preview :text="text"></z-markdown-preview>
  <el-affix position="bottom" :offset="120">
    <el-button class="g-pointer" @click="isShowContent = true">目录</el-button>
    <el-backtop target="#z-blog-tamplate-scroll .el-scrollbar__wrap"></el-backtop>
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
import { text } from './blog.config'

type PreviewVueInstance = VueInstance & { scrollToTarget: (p: any) => void }

const preview = ref<PreviewVueInstance | undefined>()
const contents = ref<Array<{ title: string, lineIndex: string | null, indent: number }>>([])
const isShowContent = ref(false)

function handleAnchor (content: typeof contents.value[number]) {
  const head = preview.value?.$el.querySelector(`[data-v-md-line="${content.lineIndex}"]`)
  isShowContent.value = false
  if (head) {
    // article reference coming true by el-scrollBar exposed function
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
