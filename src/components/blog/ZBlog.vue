<template>
  <el-container class="z-blog">
    <el-aside width="10vw">
      <!-- <z-filter></z-filter> -->
      <z-timeline :data="dateCatalogs"></z-timeline>
    </el-aside>
    <el-container>
      <el-main></el-main>
      <el-aside width="10vw">
        zheshi ajs;osdop
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
const dateCatalogs = app.blog.dateCatalogs
</script>

<style lang="scss" scoped></style>
