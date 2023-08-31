<template>
  <el-skeleton :throttle="100">
    <template #default>
      <el-skeleton :rows="5" animated />
    </template>
    <template #template>
      <div slide-enter class="markdown-body g-background-transparent" v-html="html"></div>
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>
const { content } = defineProps<{
  content: string
}>()

const html = ref('')

app.blog
  .converterMdToHTML(content)
  .then(res => html.value = res, () => html.value = '文章内容加载失败，请重新尝试！')

</script>