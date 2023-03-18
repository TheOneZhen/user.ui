<template>
  <el-scrollbar id="main-scroll">
    <el-container class="z-container">
      <el-header v-if="store.isHorizontal"><z-header /></el-header>
      <el-container>
        <el-aside width="200px">
          <z-header v-if="!store.isHorizontal" />
        </el-aside>
        <el-main>
          <router-view />
          <z-bullet-screen></z-bullet-screen>
        </el-main>
      </el-container>
      <el-footer><z-footer /></el-footer>
    </el-container>
  </el-scrollbar>
  <el-backtop target="#main-scroll .el-scrollbar__wrap" :bottom="100" />
</template>

<script lang="ts" setup>
import { UseLayoutStore } from '@/store/UseLayoutStore'
const store = UseLayoutStore()

</script>

<style lang="scss" scoped>
.z-container {
}
</style>
