<template>
  <div class="g-display-flex g-padding-2%-0">
    <div class="g-min-width-40px g-width-10% g-text-align-right">
      <el-avatar :src="comment.user.icon" @error="handleUserLoadError(comment)">
        <img alt="load avatar failed!" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
    </div>
    <div class="g-flex-auto g-padding-0-1%">
      <div class="g-height-3% g-min-height-30px">
        <el-link :href="comment.user.home" target="_blank">{{ comment.user.name }}</el-link>
        <el-tag class="g-margin-0-1%">
          <el-link href="https://github.com/" target="_blank" icon-carbon:logo-github />
        </el-tag>
      </div>
      <component :is="customMarked.parse(comment.content)" class="g-padding-2%-1%" style="width: 90%" />
      <div class="g-height-3% g-min-height-30px g-flex g-align-items-center">
        <el-text class="g-flex-auto g-text-align-center">{{ comment.createTime }}</el-text>
        <el-button v-active="viewRecord['Like Comment'].has(comment.id)" text
          @click="app.user.lnComment(comment.id, 1)"><el-icon icon-material-symbols:favorite /></el-button>
        <el-button v-active="viewRecord['Dislike Comment'].has(comment.id)" text
          @click="app.user.lnComment(comment.id, 0)"><el-icon icon-material-symbols:heart-broken /></el-button>
        <el-button text @click="handleShow"><el-icon icon-material-symbols:android-messages />查看对话</el-button>
        <el-button @click="handleReply" round>回复</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CustomMarked } from '@/blog/customMarked'

const customMarked = new CustomMarked()
const { comment, onlyReply } = defineProps({
  comment: {
    type: Object as PropType<CommentType>,
    required: true
  },
  onlyReply: {
    type: Boolean,
    default: false
  }
})

const useReply = app.store.get('UseReplyStore')
const useDrawer = app.store.get('UseDrawerStore')
const { viewRecord } = app.store.get('UseUserStore')

function handleUserLoadError (comment: CommentType) {
  console.warn(`User: ${comment.user.name} load Failed! Url: ${comment.user.icon}`)
}

function handleShow () {
  useDrawer.renderDrawer(comment)
}

function handleReply () {
  if (!onlyReply) {
    handleShow()
  }
  nextTick(() => useReply.on(comment))
}
</script>