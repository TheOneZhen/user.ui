<template>
  <div>
    <template v-for="(comment, index) in comments" :index="index">
      <z-comment :comment="comment"></z-comment>
      <el-divider style="margin: 1vh 0;" />
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

fresh()

function fresh () {
  app.user
  .getComments(article, quote)
  .then(result => comments.value = result)
}
// 问题：如何保证通用组件中的函数渲染之后是不同的引用？
onMounted(() => {
  // 用于评论之后刷新当前列表
  useReply.fresh.push(fresh)
})

onUnmounted(() => {
  const freshLen = useReply.fresh.length
  if (freshLen > 0 && useReply.fresh[freshLen - 1] === fresh) useReply.fresh.pop()
})

</script>