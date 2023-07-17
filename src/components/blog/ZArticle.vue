<template>
  <el-skeleton class="z-article" :throttle="500" v-if="article">
    <template #template>
      <h2 v-html="article.title"></h2>
      <!-- 显示标签 -->
      <z-markdown-preview :content="article.content"></z-markdown-preview>
    </template>
    <template #default>
      <el-skeleton :rows="8" animated />
    </template>
  </el-skeleton>
</template>

<script lang="ts" setup>

const props = defineProps<{
  index: string
}>()

const article = ref<null | ArticleType>(null)

watch (() => props.index, (id) => getArticle(+id))

function getArticle (index: ArticleType['id']) {
  app.blog.getArticle(index).then(data => article.value = data)
}

onMounted(() => getArticle(+props.index))
</script>
