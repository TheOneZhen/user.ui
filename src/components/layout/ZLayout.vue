<template>
  <el-scrollbar id="z-main-scroll">
    <el-container>
      <el-header><z-header /></el-header>
      <el-main>
        <router-view />
        <z-bullet-screen></z-bullet-screen>
      </el-main>
      <el-footer><z-footer></z-footer></el-footer>
    </el-container>
  </el-scrollbar>
</template>

<script lang="ts" setup>
/**
 * 因为网站主体是SPA，所以我在#app上对页面的宽和高进行了约束，之后各个页面的布局建立于此
 * 1. 原子组件不允许约束任何尺寸，尺寸应由其父组件约束
 * 2. 布局层面，滚动条应该只有一个，位于本组件下
 * 3. 对于自适应布局，应尽可能使用自适应单位，比如字体全部使用rem
 */
</script>
