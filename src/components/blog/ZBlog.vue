<template>
  <div class="z-blog g-margin-5vh-10vw g-width-80vw">
    <router-view v-slot="{ Component }">
      <component v-if="Component" :is="Component"></component>
      <el-timeline v-else class="g-padding-5vh-2vw">
        <el-timeline-item v-for="item in app.blog.catalog"
                          :key="item.id"
                          center
                          :timestamp="item.updateTime"
                          class="g-pointer"
                          @click="app.blog.toArticle(item.id)"
                          placement="top">
          <el-card>
            <h2 v-text="item.title"></h2>
            <z-markdown-preview :content="item.description" />
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.z-blog {
  background-color: rgba($color: #FFFFFF, $alpha: .4);
}
</style>
