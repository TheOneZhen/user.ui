<template>
  <div class="z-blog">
    <router-view v-slot = '{ Component, route }'>
        <keep-alive>
          <component v-if="Component" :is="Component"></component>
          <template v-else>
            <el-button class="g-absolute" @click="changeDisplayMode">切换展示方式</el-button>
            <div class="z-blog-main">
              <z-blog-list-display v-if="blogListDisplay" />
              <z-blog-tag-display v-else />
            </div>
          </template>
        </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
const blogListDisplay = ref(app.storage.getLocal('blogListDisplay', 'false'))

function changeDisplayMode () {
  blogListDisplay.value = !blogListDisplay.value
}

onUnmounted(() => {
  app.storage.setLocal('blogListDisplay', blogListDisplay.value)
})
</script>

<style lang="scss" scoped>
.z-blog {
  margin: 5vh 10vw;
  width: 80vw;
  background-color: rgba($color: #FFFFFF, $alpha: .4);
  .z-blog-main {
    padding: 8vh 5vh 5vh 0vh;
  }
}
</style>
