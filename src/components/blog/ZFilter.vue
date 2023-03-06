<template>
  <div class="z-filter">
    <el-input>
      <template #append>
        <el-button @click="changeTagsMode">
          <template #icon>
            <el-icon><span icon-carbon:chevron-sort></span></el-icon>
          </template>
        </el-button>
      </template>
    </el-input>
    <z-tags :mode="mode" :data="data"></z-tags>
  </div>
</template>

<script lang="ts" setup>
const data = app.blogModel.tagMap
const mode = ref<'list' | 'hover'>('hover')

function changeTagsMode () {
  mode.value = mode.value === 'hover' ? 'list' : 'hover'
}
</script>

<style lang="scss" scoped>

</style>
