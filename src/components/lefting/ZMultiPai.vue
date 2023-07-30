<template>
  <el-drawer append-to-body
             v-model="isShow"
             :size="size">
    <z-comment :comment="comment" only-reply></z-comment>
    <el-divider />
    <z-comments :article="comment.article" :quote="comment.quote"></z-comments>
  </el-drawer>
</template>

<script lang='ts' setup>
const { comment } = defineProps<{
  isShow: boolean
  comment: CommentType
}>()

defineEmits<{ (event: 'update:isShow'): void }>()
// 点击查看对话，弹出
// 留言、文章第一层评论，点击回复，会先查看对话，再弹出回复框
const size = ref('30%')

</script>

<style lang='scss' scoped>
</style>
