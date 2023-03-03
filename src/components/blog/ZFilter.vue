<template>
  <el-input></el-input>
  <z-tags mode="hover" :data="data"></z-tags>
</template>

<script lang="ts" setup>
const data = app.blogModel.tagMap
</script>

<style lang="scss" scoped>

</style>
