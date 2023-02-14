<template>
  <el-container class="z-container">
    <el-scrollbar>
      <el-header v-if="isHorizontal"><z-header /></el-header>
      <el-container>
        <el-aside width="200px"><z-header v-if="!isHorizontal" /></el-aside>
        <el-main><router-view /></el-main>
      </el-container>
      <el-footer><z-footer /></el-footer>
    </el-scrollbar>
  </el-container>
</template>

<script lang="ts" setup>
import ZHeader from '@/components/header/ZHeader.vue'
import ZFooter from '@/components/footer/ZFooter.vue'
// abstract into a state via named isHorizontalLayout
const isHorizontal = window.innerHeight < window.innerWidth

</script>

<style lang="scss" scoped>
.z-container {
  width: 100vw;
  height: 100vh;
}
</style>
