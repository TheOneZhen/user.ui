<template>
  <div class="g-display-flex g-padding-5vh-0">
    <div class="g-min-width-40px g-width-10vw g-text-align-right">
      <el-avatar :src="comment.user.icon" @error="handleUserLoadError(comment)">
        <img alt="load avatar failed!" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
    </div>
    <div class="g-flex-auto g-padding-0-1vw">
      <el-config-provider size="small">
        <div class="g-height-3vh g-min-height-30px">
          <el-link :href="comment.user.home" target="_blank">{{ comment.user.name }}</el-link>
          <el-tag size="small" class="g-margin-0-1vw">
            <el-link href="https://github.com/" target="_blank" icon-carbon:logo-github />
          </el-tag>
        </div>
        <z-markdown-preview :content="comment.content" class="g-padding-1vh-1vw" />
        <div class="g-height-3vh g-min-height-30px g-flex g-align-items-center">
          <el-text class="g-flex-auto g-text-align-center">{{ comment.createTime }}</el-text>
          <el-button text @click="handleLikeComment"><el-icon icon-material-symbols:favorite />{{ comment.likes }}</el-button>
          <el-button text @click="handleDislikeComment"><el-icon icon-material-symbols:heart-broken />{{ comment.dislikes }}</el-button>
          <el-button text @click="handleShow"><el-icon icon-material-symbols:android-messages />查看对话</el-button>
          <el-button @click="handleReply" round>回复</el-button>
        </div>
      </el-config-provider>
    </div>
    <el-drawer append-to-body
               v-model="isShow"
               size="40%">
      <el-scrollbar>
        <z-comment :comment="comment" only-reply />
        <el-divider />
        <z-comments :article="comment.article" :quote="comment.id" />
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>

const { comment, onlyReply } = withDefaults(defineProps<{
  comment: CommentType
  onlyReply?: boolean
}>(),
{
  onlyReply: false
})

const useReply = app.store.get('UseReplyStore')
const useDrawer = app.store.get('UseDrawerStore')
const isShow = ref(false)

function handleUserLoadError (comment: CommentType) {
  console.warn(`User: ${comment.user.name} load Failed! Url: ${comment.user.icon}`)
}

function handleLikeComment () {}

function handleDislikeComment () {}

function handleShow () {
  isShow.value = true
}

function handleReply () {
  if (!onlyReply) {
    handleShow()
  }
  useReply.on(comment)
}


</script>