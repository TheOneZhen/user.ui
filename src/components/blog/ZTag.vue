<template>
  <div class="z-tags">
    <div class="z-tag" v-for="[tag, catalogs] of data" :key="tag">
      <el-popover placement="right" :title="tag" trigger="hover">
        <template #reference>
          <el-tag>{{ tag }}</el-tag>
        </template>
        <template #content></template>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  mode: 'list' | 'hover'
  data: Map<CatalogType['title'], Array<CatalogType>>
}>()
</script>

<style lang="scss" scoped>

</style>
