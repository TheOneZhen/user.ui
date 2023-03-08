<template>
  <div class="z-filter">
    <el-input v-model="filterKey" @input="filter" clearable>
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
import { debounce } from 'lodash'

const mode = ref<'list' | 'hover'>('hover')
const filterKey = ref('')
const loading = ref(false)
const data = app.blogModel.filterTagMap
const filter = debounce((key: string) => {
  loading.value = true
  // 根据关键字修改filterData
  const keyArr = key.split('')
  const catalogs = app.blogModel.catalogs
  Promise.all(
    catalogs.map(catalog => app.blogModel.filter(catalog, keyArr))
  ).then(res => {
    const filterTagMap = app.blogModel.filterTagMap
    filterTagMap.clear()
    res.forEach((value, index) => {
      if (value !== undefined) {
        catalogs[index].tags.forEach(tag => {
          const mid = filterTagMap.get(tag) || []
          mid.push(value)
          filterTagMap.set(tag, mid)
        })
      }
    })
  })
    .finally(() => (loading.value = false))
}, 100)

function changeTagsMode () {
  mode.value = mode.value === 'hover' ? 'list' : 'hover'
}
</script>

<style lang="scss" scoped></style>
