<template>
  <el-timeline>
    <el-timeline-item v-for="item in catalog"
                      :key="item.id"
                      center
                      :timestamp="item.update_time"
                      class="g-pointer"
                      @click="toArticle(item.id)"
                      placement="top">
      <el-card class="_item">
        <h2 v-text="item.title"></h2>
        <z-markdown-preview :content="item.description" />
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script lang='ts' setup>

const { catalog, toArticle } = app.blog

</script>

<style lang='scss' scoped>
._item:hover {
  font-size: large;
}
</style>
