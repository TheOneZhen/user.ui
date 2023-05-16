<template>
  <div class="z-lefting" v-click-out-side="handleChangeDisplay(false)">
    <el-row>
      <el-col :span="avatarPre">
        <el-avatar src="https://empty" @error="errorHandler">
          <img alt="can't found image" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </el-col>
      <el-col :span="24 - avatarPre">
        <el-input ref="comment"
                  v-model="content"
                  :autosize="{ minRows: 2, maxRows: 20 }"
                  type="textarea"
                  placeholder="这是一首简单的小情歌"></el-input>
        <z-markdown-preview v-if="isDisplayContentByMarkdown" :text="content" :style="getCommentStyle()"></z-markdown-preview>
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
import { InputInstance } from 'element-plus'
const avatarPre = 1

const content = ref('')
const comment = ref<InputInstance | null>(null)
const isDisplayContentByMarkdown = ref(false)

function errorHandler () {
  console.error("User image loads failed!")
}

function handleChangeDisplay (value: boolean) {
  isDisplayContentByMarkdown.value = value
}

function getCommentStyle () {
  const result = { width: '0px', height: '0px' }
  if (comment.value?._ref) {
  }
  return result;
}

</script>

<style lang="scss" scoped>
.z-lefting {
  ._comment-markdown {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>