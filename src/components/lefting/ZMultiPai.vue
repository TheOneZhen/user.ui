<template>
  <el-drawer append-to-body
             destroy-on-close
             v-model="data.visible"
             :size="data.size + '%'">
    <el-scrollbar>
      <z-comment :comment="comment" only-reply></z-comment>
      <el-divider />
      <z-comments :article="comment.article" :quote="comment.id"></z-comments>
    </el-scrollbar>
  </el-drawer>
</template>

<script lang='ts' setup>
const { comment } = defineProps<{
  comment: CommentType
}>()

const useDrawer = app.store.get('UseDrawerStore')
const data = useDrawer.map.get(comment.id)!

</script>
