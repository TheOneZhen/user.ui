<template>
  <div class="z-lefting">
    <el-timeline v-if="isTimeline">
      <el-timeline-item
        v-for="(item, index) in content"
        :key="index"
        :icon="item.icon"
        :type="item.type"
        :color="item.color"
        :size="item.size"
        :timestamp="item.timestamp"
        :hollow="item.hollow"
        class="g-pointer"
      >
        {{ item.content }}
      </el-timeline-item>
    </el-timeline>
    <el-calendar v-else ref="calendar" v-model="currentSelected">
      <template #header="{ date }">
        <span> {{ date }}</span>
        <el-button size="small" @click="selectDate('today')">Today</el-button>
      </template>
      <template #date-cell="{ data }">
        <p>{{ data.day }}</p>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { content } from './content'
const isTimeline = ref(false)
const calendar = ref()

const currentSelected = ref()

function selectDate (val: string) {
  calendar.value.selectDate(val)
}

</script>

<style lang="scss" scoped>
  .z-lefting {

  }
</style>
