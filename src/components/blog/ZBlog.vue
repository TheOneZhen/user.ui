<template>
  <el-container class="z-blog">
    <el-aside width="20vh">
      <z-filter></z-filter>
      <z-timeline :data="dateCatalogs"></z-timeline>
    </el-aside>
    <el-main></el-main>
  </el-container>
</template>

<script lang="ts" setup>
const dateCatalogs = app.blog.dateCatalogs

</script>

<style lang="scss" scoped></style>
