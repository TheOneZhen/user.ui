<template>
  <div class="z-home g-absolute">
    <component :is="ZSignature" width="220" />
    <div slide-enter>
      <h2>你好呀！</h2>
      <p>欢迎来到我的主页，这是一个简单的博客小站。</p>
      <p>在这里，你可以看到各式各样的技术和它的应用</p>
      <p>找到可能困扰你许久的问题的解决方案</p>
      <p>感受到技术变革为生活带来的进步</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import ZSignature from '../signature/ZSignature.vue'
</script>

<style lang='scss' scoped>
.z-home {
  top: 30%;
  left: 30%;
}
</style>
