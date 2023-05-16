<template>
  <div class="z-lefting">
    <el-row>
      <el-col :span="avatarPre">
        <el-avatar src="https://empty" @error="errorHandler">
          <img alt="can't found image" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </el-col>
      <el-col :span="24 - avatarPre">
        <el-input v-model="content" 
                  :autosize="{ minRows: 2, maxRows: 20 }"
                  type="textarea"
                  placeholder="这是一首简单的小情歌"></el-input>
      </el-col>
    </el-row>
    <el-row><el-divider></el-divider></el-row>
  </div>
</template>

<script lang="ts" setup>

const avatarPre = 4

const content = ref('')
const isDisplay = false

function errorHandler () {
  console.error("User image loads failed!")
}
</script>