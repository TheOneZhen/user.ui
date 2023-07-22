<template>
  <el-timeline class="z-blog-list">
    <el-timeline-item v-for="item in app.blog.catalog"
                      :key="item.id"
                      center
                      :timestamp="item.update_time"
                      class="g-pointer"
                      @click="app.blog.toArticle(item.id)"
                      placement="top">
      <el-card>
        <h2 v-text="item.title"></h2>
        <z-markdown-preview :content="item.description" />
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<style lang='scss' scoped>
.z-blog-list {
  padding-top: 5vh;
  padding-right: 2vw;
}
</style>
