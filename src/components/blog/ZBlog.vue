<script setup lang="ts">
import { CustomMarked } from '@/blog/customMarked'

const customMarked = new CustomMarked()
</script>

<template>
  <div class="z-blog g-margin-5%-20% g-width-60%">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
          <component :is="Component" />
      </template>
      <el-timeline v-else class="g-padding-5%-2%">
        <el-timeline-item v-for="item in app.blog.catalog"
                          :key="item.id"
                          center
                          :timestamp="app.blog.formatDate(item.createTime)"
                          class="g-pointer"
                          @click="app.blog.toArticle(item.id)"
                          placement="top">
          <el-card>
            <h2 v-text="item.title"></h2>
            <component :is="customMarked.parse(item.description)" />
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
