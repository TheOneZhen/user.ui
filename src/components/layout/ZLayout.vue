<template>
  <el-container class="z-container">
    <el-scrollbar>
      <el-header><z-header /></el-header>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-main><router-view /></el-main>
      </el-container>
      <el-footer><z-footer /></el-footer>
    </el-scrollbar>
  </el-container>
</template>

<script lang="ts" setup>
import ZHeader from '@/components/header/ZHeader.vue'
import ZFooter from '@/components/footer/ZFooter.vue'
// 全局状态变量：布局方式
</script>

<style lang="scss" scoped>
.z-container {
  width: 100vw;
  height: 100vh;
}
</style>
