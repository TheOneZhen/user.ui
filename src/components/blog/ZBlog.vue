<template>
  <div class="z-blog">
    <z-filter></z-filter>
    <z-timeline :data="data"></z-timeline>
  </div>
</template>

<script lang="ts" setup>
const data = app.blogModel.dateCatalogs
</script>

<style lang="scss" scoped>
</style>
