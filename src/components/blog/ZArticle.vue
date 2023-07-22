<template>
  <div class="z-article g-padding-5vh-4vw">
    <el-skeleton :throttle="100" v-if="article">
      <template #template>
        <h1 class="z-article-title g-text-align-center g-margin-bottom-5vh" v-html="article.title"></h1>
        <div class="z-article-tag g-margin-bottom-5vh">
          <el-tag v-for="tag in tags"
                  :index="tag.id"
                  v-text="tag.title"/>
        </div>
        <z-markdown-preview :content="article.content"></z-markdown-preview>
      </template>
      <template #default>
        <el-skeleton :rows="8" animated />
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  index: string
}>()

const article = ref<null | ArticleType>(null)
const tags = computed(() => {
  const result: TagType[] = []
  if (article.value) {
    article.value.tagIds.forEach(id => {
      const tagMap = app.blog.tagMap
      if (tagMap.has(id)) result.push(tagMap.get(id)!)
    })
  }
  return result
})
watch (() => props.index, (id) => getArticle(+id))

function getArticle (index: ArticleType['id']) {
  article.value = null
  app.blog.getArticle(index).then(data => article.value = data)
}

onMounted(() => getArticle(+props.index))
</script>

<style lang="scss" scoped>
.z-article {
  background-color: #FFFFFF;
}
</style>