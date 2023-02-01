<template>
  <div class="g-layout">
    <el-containter>
      <z-header class="g-layout-header g-h-index" />
      <el-main class="g-layout-main g-fixtive">
        <router-view />
      </el-main>
      <el-footer>
        <z-footer />
      </el-footer>
    </el-containter>
  </div>
</template>

<script lang="ts" setup>
import ZHeader from '@/components/header/ZHeader.vue'
import ZFooter from '@/components/footer/ZFooter.vue'
import ZHome from '@/components/home/ZHome.vue'
</script>

<style lang="scss" scoped>
.g-layout {
  .g-layout-main {
    margin: auto;
    width: 80vw;
    height: 100vh;
  }
}
</style>
