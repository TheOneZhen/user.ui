<template>
  <div class="filter">
  </div>
  <z-timeline :data="data"></z-timeline>
</template>

<script lang="ts" setup>
// 接口中获取
const data = [
  {
    year: '2023',
    month: '',
    count: 30
  },
  {
    // YYYY:MM, parse by dayjs, please consider translate
    // be a id key (prefix + date) to supporting content
    year: '2023',
    month: '03',
    count: 10
  },
  {
    year: '2023',
    month: '02',
    count: 10
  },
  {
    year: '2023',
    month: '01',
    count: 10
  },
  {
    year: '2022',
    month: '',
    count: 20
  },
  {
    year: '2022',
    month: '11',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  },
  {
    year: '2022',
    month: '03',
    count: 10
  }
]
</script>

<style lang="scss" scoped>
</style>
