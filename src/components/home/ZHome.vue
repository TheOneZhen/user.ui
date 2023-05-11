<template>
  <page-one class="z-page-one"></page-one>
  <page-two class="z-page"></page-two>
  <page-three class="z-page"></page-three>
</template>

<script lang='ts' setup>

</script>

<style lang='scss' scoped>
.z-page {
  width: 100%;
  height: 100vh;
}
.z-page-one {
  width: 100%;
  height: calc(100vh - 60px);
}
</style>
