<template>
  <el-dialog v-model="useReply.visible"
             width="40%"
             :show-close="false"
             draggable
             align-center
             style="z-index: 9999;">
    <template #header>
      <el-text>{{ useReply.reference }}</el-text>
    </template>
    <el-input v-model="useReply.comment.content"
              :minlength="0"
              show-word-limit
              placeholder="支持markdown格式"
              :rows="5"
              :autosize="{minRows: 5, maxRows: 20}"
              resize="vertical"
              autofocus
              type="textarea"></el-input>
    <template #footer>
      <z-emoji />
      <el-button size="small" round>预览</el-button>
      <el-button size="small" round @click="handleEnter">确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
// 之后需要考虑是否将dialog组件抽离为全局唯一组件，包括drawer
import { UseReplyStore } from '@/store/UseReplyStore'
const useReply = UseReplyStore()

async function handleEnter () {
  const { content, article, quote } = useReply.comment
  const result = await app.user.addComment(content, article, quote)
  if (result) {
    useReply.clear()
    useReply.off()
    // 刷新最上层列表
    useReply.fresh.length > 0 && useReply.fresh[useReply.fresh.length - 1]()
  }
}

</script>

<style lang='scss' scoped>
</style>
