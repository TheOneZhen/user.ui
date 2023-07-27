<template>
  <div class="z-article g-padding-5vh-4vw g-background-#FFFFFF">
    <el-skeleton :throttle="100" v-if="article">
      <template #template>
        <h1 class="z-article-title g-text-align-center g-margin-0-0-5vh-0" v-html="article.title"></h1>
        <p class="g-opacity-.4 g-text-align-right">
          {{ article.createTime }}
        </p>
        <div class="z-article-tag g-margin-0-0-5vh-0">
          <el-tag v-for="tag in tags"
                  :index="tag.id"
                  v-text="tag.title"/>
        </div>
        <z-markdown-preview :content="article.content"></z-markdown-preview>
        <p class="g-opacity-.4 g-text-align-right">
          {{ '最近修改：' + article.updateTime }}
        </p>
        <el-button circle class="g-position-fixed g-left-92vw g-bottom-280px">
          <el-icon icon-ic:round-remove-red-eye />
          {{ article.views }}
        </el-button>
        <el-button circle class="g-position-fixed g-left-92vw g-bottom-220px">
          <el-icon icon-material-symbols:favorite />
          {{ article.likes }}
        </el-button>
        <el-button circle class="g-position-fixed g-left-92vw g-bottom-160px">
          <el-icon icon-material-symbols:heart-broken />
          {{ article.dislikes }}
        </el-button>
      </template>
      <template #default>
        <el-skeleton :rows="8" animated />
      </template>
    </el-skeleton>
    <el-button circle
               class="g-position-fixed g-left-92vw g-bottom-100px"
               @click="hanldeComment">
      <el-icon icon-pajamas:comment-dots />
    </el-button>
    <!-- 上一篇 -->
    <!-- 下一篇 -->
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

function hanldeComment () {}

onMounted(() => getArticle(+props.index))
</script>

<style lang="scss" scoped>
.z-article {
}
</style>