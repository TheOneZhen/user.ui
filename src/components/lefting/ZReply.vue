<template>
  <el-dialog v-model="useReply.visible"
             width="40%"
             :show-close="false"
             draggable
             align-center>
    <template #header v-if="useReply.quotedComment">
      <el-text>@{{ useReply.quotedComment.name }}</el-text>
    </template>
    <el-input v-model="content"
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
      <el-button size="small" round>确定</el-button>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
// 之后需要考虑是否将dialog组件抽离为全局唯一组件，包括drawer
import { UseReplyStore } from '@/store/UseReplyStore'
const useReply = UseReplyStore()

const content = ref('')

</script>

<style lang='scss' scoped>
</style>
