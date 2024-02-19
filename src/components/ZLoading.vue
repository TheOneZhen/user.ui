<script lang='ts' setup>
import { tasks } from '@/utils/record'
import { CustomMarked } from '@/blog/customMarked'

const lastTask = computed(() => tasks.value.length > 0 ? tasks.value[tasks.value.length - 1] : null)
const customMarked = new CustomMarked()
const visible = ref(!!lastTask.value)
/**
 * 1. 修改内容背景色为透明
 * 2. 内容加载完毕后没有自动关闭弹窗
 * 3. 内容剧中后，感觉对其他异步操作不友好，建议回退
 */
</script>

<template>
  <el-dialog v-model="visible" center :show-close="false" align-center>
    <z-signature loading width="200" />
    <el-divider />
    <component v-if="lastTask" :is="customMarked.parse(lastTask.content)" />
    <!-- <el-icon icon-carbon:close-large @click="lastTask?.close()" /> -->
  </el-dialog>
</template>

<style lang='scss'>
.z-loading {
  position: fixed;
  width: 100vw;
  height: 100dvh;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
