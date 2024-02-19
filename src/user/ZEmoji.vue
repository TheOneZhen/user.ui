<template>
  <el-popover trigger="click" placement="left">
    <template #reference>
      <el-button size="default" round icon-carbon:face-activated></el-button>
    </template>
    <div v-loading="loading">
      <el-icon v-for="icon in icons" :key="icon" v-bind="{['icon-streamline-emojis:' + icon]: ''}" />
    </div>
  </el-popover>
</template>

<script lang='ts' setup>

const icons = ref<string[]>([])
const loading = ref(false)

onMounted(() => {
  loading.value = true
  app
    .user
    .getIcons()
    .then(data => icons.value = data)
    .finally(() => loading.value = false)
})
</script>

<style lang='scss' scoped></style>
