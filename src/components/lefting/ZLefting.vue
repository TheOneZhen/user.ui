<template>
  <div class="z-lefting" v-click-out-side="handleChangeDisplay(false)">
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
        <z-markdown-preview v-if="isDisplayContentByMarkdown"
                            :text="content"
                            :style="getCommentStyle()"
                            class="_comment-markdown"></z-markdown-preview>
        <el-row>
          <el-button @click="handleChangeDisplay(true)">Preview</el-button>
          <el-button>Commit</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row><el-divider></el-divider></el-row>
  </div>
</template>

<script lang="ts" setup>
import { render } from 'vue'
import { UseDrawerStore } from '../../store/UseDrawerStore'

const avatarPre = 1

const content = ref('')
const comment = ref<any>(null)
const isDisplayContentByMarkdown = ref(false)
const useDrawerStoew = UseDrawerStore()

function errorHandler () {
  console.error("User image loads failed!")
}

function handleChangeDisplay (value: boolean) {
  isDisplayContentByMarkdown.value = value
  useDrawerStoew.on()
}

function getCommentStyle () {
  const result = { width: '0px', height: '0px' }
  if (comment.value?.ref) {
    const commentDom = comment.value.ref;
    result.width = commentDom.width;
    result.height = commentDom.height;
  }
  return result;
}

</script>

<style lang="scss" scoped>
.z-lefting {
}
</style>