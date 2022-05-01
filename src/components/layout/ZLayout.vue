<template>
  <div class="g-layout">
    <el-containter>
      <Header class="g-layout-header g-h-index" />
      <el-main class="g-layout-main g-fixtive">
        <Home />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-containter>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/header/ZHeader.vue'
import Footer from '@/components/footer/ZFooter.vue'
import Home from '@/components/home/ZHome.vue'
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
