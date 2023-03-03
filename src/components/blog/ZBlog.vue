<template>
  <div class="filter">
  </div>
  <z-timeline :data="data"></z-timeline>
</template>

<script lang="ts" setup>
const data = app.blogModel.dateCatalogs
</script>

<style lang="scss" scoped>
</style>
