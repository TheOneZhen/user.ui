<script lang='ts' setup>
import { debounce } from 'lodash-es'
import { ZCard } from '.'

const columns = computed(() => app.theme.size.value === 'small' ? 1 : (app.theme.size.value === 'default' ? 2 : 3))

let data: ArticleType[] = []
const group = ref<Array<typeof data>>([])

app
  .blog
  .getStationsArticles()
  .then(res => {
    data = res
    groupBy()
  })

watch(columns, debounce(groupBy))

function groupBy () {
  group.value = Array(columns.value).fill(null).map(() => [])
  data.forEach((item, index) => group.value[index % columns.value].push(item))
}

</script>

<template>
  <!-- 这里可以尝试以下css columns -->
  <div class="z-stations" :style="{ grid: `1fr / repeat(${columns}, 1fr)` }">
    <div v-for="(cols, index) in group" :key="index" class="z-stations-item g-flex" style="gap: var(--theme-gap);">
      <component v-for="(item, index2) in cols" :key="index2" :is="ZCard(item)" />
    </div>
  </div>
</template>

<style lang="scss">
.z-stations {
  display: grid;
  gap: var(--theme-gap);
  background-color: var(--them-content-background-color);

  .z-stations-item {
    flex-direction: column;
  }
}
</style>