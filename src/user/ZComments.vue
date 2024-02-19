<template>
  <div>
    <template v-for="comment in comments" :key="comment.id">
      <z-comment :comment="comment"></z-comment>
      <el-divider style="margin: 1% 0;" />
    </template>

  </div>
</template>

<script lang="ts" setup>

const { article, quote } = defineProps<{
  article: CommentType['article']
  quote: CommentType['quote']
}>()

const comments = ref<CommentType[]>([])
const useReply = app.store.get('UseReplyStore')

function fresh () {
  app.user
  .getComments(article, quote)
  .then(result => comments.value = result)
}

try {
  const quoteMap = app.user.commentMap.get(quote)
  comments.value = quoteMap!.get(quote)!
} catch {
  fresh()
}

onMounted(() => {
  // 用于评论之后刷新当前列表
  useReply.fresh.push(fresh)
})

onUnmounted(() => {
  const freshLen = useReply.fresh.length
  if (freshLen > 0 && useReply.fresh[freshLen - 1] === fresh) useReply.fresh.pop()
})

</script>