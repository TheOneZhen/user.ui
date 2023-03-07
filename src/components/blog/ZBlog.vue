<template>
  <el-container class="z-blog">
    <el-aside width="20vh">
      <z-filter :filter-data="filterData" :data="tagMap"></z-filter>
      <z-timeline :data="dateCatalogs"></z-timeline>
    </el-aside>
    <el-main></el-main>
  </el-container>
</template>

<script lang="ts" setup>
const filterData = ref<typeof app.blogModel.tagMap>(new Map())
const tagMap = app.blogModel.tagMap
const dateCatalogs = app.blogModel.dateCatalogs

</script>

<style lang="scss" scoped></style>
