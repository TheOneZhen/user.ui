<template>
  <el-row v-for="item in data"
          :key="item.id"
          v-bind="$attrs">
    <el-col :span="4">
      <el-avatar src="https://empty">
        <img alt="can't found image" src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
    </el-col>
    <el-col :span="20">
      <z-markdown-preview :content="item.content"></z-markdown-preview>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const props = defineProps<{
  quoteId: ZComment['quoteId']
  blogId: ZComment['blogId']
}>()

const data = ref<ZComment[]>([])

onBeforeMount(async () => {
  const result = await app.service.mainService.getBlogComment(props.blogId, props.quoteId)
  data.value.push(...result)
})
</script>