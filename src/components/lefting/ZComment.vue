<template>
  <div v-for="(comment, index) in comments" :index="index" class="g-display-flex g-padding-5vh-0">
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
          <el-button text><el-icon icon-material-symbols:favorite />{{ comment.likes }}</el-button>
          <el-button text><el-icon icon-material-symbols:heart-broken />{{ comment.dislikes }}</el-button>
          <el-button text><el-icon icon-material-symbols:android-messages />查看对话</el-button>
          <el-button @click="() => useReply.on(comment)" round>回复</el-button>
        </div>
      </el-config-provider>
      <el-divider style="margin: 1vh 0;" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const { article, quote } = defineProps<{
  article: CommentType['article']
  quote: CommentType['quote']
}>()

defineExpose<{
  fresh: typeof fresh
}>({ fresh })

const comments = ref<CommentType[]>([])
const useReply = app.store.get('UseReplyStore')

fresh()

function fresh () {
  app.user
  .getComments(article, quote)
  .then(result => comments.value = result)
}

useReply.fresh = fresh

function handleUserLoadError (comment: CommentType) {
  console.warn(`User: ${comment.user.name} load Failed! Url: ${comment.user.icon}`)
}

</script>