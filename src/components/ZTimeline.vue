<template>
  <div class="z-timeline">
    <el-scrollbar>
      <p v-for="(item, index) in data" :key="index" :class="{ 'fixed-year': item.month == '' }" class="z-timeline-item">
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

withDefaults(defineProps<{
  height?: string
  hrefPrefix?: string
  data: typeof app.blog.dateCatalogs
}>(), {
  height: '30vh',
  hrefPrefix: '#Z-'
})
</script>

<style lang="scss" scoped>
.z-timeline {
  height: v-bind('height');
  overflow: auto;

  .z-timeline-item {
    background-color: white;
  }

  .fixed-year {
    position: sticky;
    top: -1px;
    --el-font-size-base: larger;
    --el-font-weight-primary: bolder;
  }

  .z-timeline-item .el-link:hover {
    font-size: larger;
  }

  .z-timeline-item .el-link {
    transition: font-size .5s;
  }
}</style>
