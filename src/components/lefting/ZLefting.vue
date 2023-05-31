<template>
  <el-container class="z-lefting">
    <el-aside width="20vw"></el-aside>
    <el-main>
      <el-row>
        <el-avatar src="https://empty" @error="errorHandler">
          <img alt="can't found image" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
        <el-input v-model="content"
                  :autosize="{ minRows: 2, maxRows: 20 }"
                  type="textarea"
                  placeholder="Enter换行"></el-input>
        <el-row>
          <el-button @click="handleDisplayMarkdown()">Preview</el-button>
          <el-button>Commit</el-button>
        </el-row>
      </el-row>
      <el-row><el-divider></el-divider></el-row>
      <z-comment :quote-id="''" :blog-id="''"></z-comment>
    </el-main>
    <el-aside width="20vw"></el-aside>
  </el-container>
</template>

<script lang="ts" setup>
import ZMarkdownPreview from '../template/ZMarkdownPreview.vue'

const content = ref('')
const useDrawerStore = app.store.get('UseDrawerStore')

function errorHandler () {
  console.error('User image loads failed!')
}

function handleDisplayMarkdown () {
  useDrawerStore.on(
    '预览',
    'ltr',
    h(ZMarkdownPreview, { content: content.value })
  )
}
</script>

<style lang="scss" scoped>
.z-lefting {
}
</style>