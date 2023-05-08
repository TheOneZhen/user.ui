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
    <z-tags :mode="mode" :data="filterTagMap"></z-tags>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'

const mode = ref<'list' | 'hover'>('hover')
const filterKey = ref('')
const loading = ref(false)
const filterTagMap = ref(app.blog.filterTagMap)

const filter = debounce((key: string) => {
  loading.value = true
  // 根据关键字修改filterData
  const keyArr = key.split('')
  // 设置一个中间数组，提升性能
  const catalogs = app.blog.catalogs
  Promise
    .all(catalogs.map(catalog => app.blog.filter(catalog, keyArr)))
    .then(res => {
      filterTagMap.value.clear()
      res.forEach((item, index) => {
        if (!item.matched) return false
        catalogs[index].tags.forEach(tag => {
          const mid = filterTagMap.value.get(tag) || []
          mid.push(item.data)
          filterTagMap.value.set(tag, mid)
        })
      })
    })
    .finally(() => (loading.value = false))
}, 100)

function changeTagsMode () {
  mode.value = mode.value === 'hover' ? 'list' : 'hover'
}
</script>

<style lang="scss" scoped></style>
