<template>
  <div class="z-home g-absolute">
    <component :is="ZSignature" width="220" />
    <div slide-enter class="g-user-select-none">
      <h2>哈！</h2>
      <p>欢迎来到我的主页！</p>
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
