<template>
  <el-timeline>
    <el-timeline-item v-for="[, catalog] in articleMap"
                      :key="catalog.id"
                      center
                      :timestamp="catalog.date"
                      class="g-pointer"
                      placement="top">
      <el-card class="_item">
        <h2 v-text="catalog.title"></h2>
        <z-markdown-preview :content="catalog.description" />
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script lang='ts' setup>
const articleMap = app.blog.articleMap

</script>

<style lang='scss' scoped>
._item:hover {
  font-size: large;
}
</style>
