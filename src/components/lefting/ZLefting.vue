<template>
  <div class="z-lefting">
    <el-row>
      <el-col :span="avatarPre">
        <el-avatar src="https://empty" @error="errorHandler">
          <img alt="can't found image" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </el-col>
      <el-col :span="24 - avatarPre" class="g-relative">
        <el-input ref="comment"
                  v-model="content"
                  :autosize="{ minRows: 2, maxRows: 20 }"
                  type="textarea"
                  placeholder="这是一首简单的小情歌"></el-input>
        <el-row>
          <el-button @click="handleDisplayMarkdown()">Preview</el-button>
          <el-button>Commit</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row><el-divider></el-divider></el-row>
  </div>
</template>

<script lang="ts" setup>
import ZMarkdownPreview from '../template/ZMarkdownPreview.vue'

const avatarPre = 1
const content = ref('')
const comment = ref<any>(null)
const useDrawerStore = app.store.get('UseDrawerStore')

function errorHandler () {
  console.error("User image loads failed!")
}

function handleDisplayMarkdown () {
  useDrawerStore.on(
    '预览',
    'ltr',
    h(ZMarkdownPreview, { text: content.value })
  )
}
</script>

<style lang="scss" scoped>
.z-lefting {
}
</style>