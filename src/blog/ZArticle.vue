<template>
  <div v-if="article" class="z-article g-padding-5%-4% g-background-#FFFFFF">
    <h1 class="z-article-title g-text-align-center g-margin-0-0-5%-0" v-html="article.title"></h1>
    <p class="g-opacity-.4 g-text-align-right">
      {{ app.blog.formatDate(article.createTime) }}
    </p>
    <div class="z-article-tag g-margin-0-0-5%-0">
      <el-tag v-for="tag in tags" :index="tag.id" v-text="tag.title" />
    </div>
    <component :is="customMarked.parse(article.content, false)" />
    <p class="g-opacity-.4 g-text-align-right">
      {{ '最近修改：' + app.blog.formatDate(article.updateTime) }}
    </p>
    <el-button circle class="g-position-fixed g-left-92% g-bottom-280px">
      <el-icon icon-ic:round-remove-red-eye />
      {{ article.views }}
    </el-button>
    <el-button circle v-active="viewRecord['Like Article'].has(article.id)"
      class="g-position-fixed g-left-92% g-bottom-220px g-margin-left-0" @click="app.user.lnArticle(article.id, 1)">
      <el-icon icon-material-symbols:favorite />
    </el-button>
    <el-button circle v-active="viewRecord['Dislike Article'].has(article.id)"
      class="g-position-fixed g-left-92% g-bottom-160px" @click="app.user.lnArticle(article.id, 0)">
      <el-icon icon-material-symbols:heart-broken />
    </el-button>
    <el-button circle class="g-position-fixed g-left-92% g-bottom-100px" @click="hanldeComment">
      <el-icon icon-pajamas:comment-dots />
    </el-button>
    <!-- 上一篇 -->
    <!-- 下一篇 -->
  </div>
  <z-comments :article="+index || null" :quote="null" />
</template>

<script lang="ts" setup>
import { CustomMarked } from '@/blog/customMarked'

const customMarked = new CustomMarked()
const { index } = defineProps<{
  index: string
}>()
const useReply = app.store.get('UseReplyStore')
const article = ref<null | ArticleType>(null)
const { viewRecord } = app.store.get('UseUserStore')
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

watch(() => index, (id) => getArticle(+id))

function getArticle (index: ArticleType['id']) {
  article.value = null
  app.blog.getArticle(index).then(data => article.value = data)
}

function hanldeComment () {
  // 跳到评论的部分
  useReply.on(null, article.value)
}

getArticle(+index)
</script>

<style lang="scss">
.z-article {
  .el-button+.el-button {
    margin-left: 0;
  }
}
</style>