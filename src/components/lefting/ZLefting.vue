<template>
  <div class="z-lefting">
    <div class="z-left">
      <el-avatar src="https://empty" @error="errorHandler">
        <img alt="can't found image" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
function errorHandler () {
  console.error("User image loads failed!");
}
</script>