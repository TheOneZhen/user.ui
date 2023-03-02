<template>
  <div class="timeline">
    <el-scrollbar>
      <p v-for="(item, index) in data" :key="index" :class="{'fixed-year': item.month == ''}" class="timeline-item">
        <el-link :href="hrefPrefix + item.year + item.month" :underline="false">
          <span>{{ item.year }}年</span>
          <span v-if="item.month">{{ item.month }}月</span>
          <span>{{ item.count }}</span>
        </el-link>
      </p>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
/**
 * 时间线组件描述
 *  1. 锁定区域
 *  2. 滚动时，年份title置顶在头部
 *  3. 鼠标悬浮到title上时，方法（挤压周围title）
 *  4. 当前文章所在月份用一个框框住，并且默认支持悬浮样式
 *  5. 要求日期目前显示的是中文，之后要求支持国际化
 */
const hrefPrefix = '#Z-'
const data: Array<{ year: string, month: string, count: number }> = [
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
.timeline {
  height: 30vh;
  overflow: auto;
  .fixed-year {
    position: sticky;
    top: -1px;
    --el-font-size-base: larger;
    --el-font-weight-primary: bolder;
  }
  .timeline-item:hover {
    --el-font-size-base: larger;
    transition: --el-font-size-base .5s;
  }
}
</style>
