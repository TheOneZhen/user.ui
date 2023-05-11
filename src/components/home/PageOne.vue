<template>
  <el-row :gutter="20">
    <el-col :span="12">一直游到海水变蓝</el-col>
    <el-col :span="12">
      <div v-for="row in 3" :key="row" class="g-flex">
        <!-- <css-doodle v-for="col in 3" class="g-margin-10" :key="col" click-to-update :use="getDoodle(row, col)" /> -->
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-carousel :interval="10000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          {{ item }}
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col :span="12">
      <el-collapse @change="" accordion>
        <el-collapse-item v-for="item in 6" :key="item" title="item" :name="item">
          {{ item }}
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
import { random } from 'lodash'

const cssDoodleRule = ['--RandRect', '--AbstractShape', '--AbstractCircle', '--TransformRect', '--RandTriangle']

function getDoodle (row: number, col: number) {
  if (row === 2 && col === 2) return 'var(--Z)'
  return `var(${cssDoodleRule[random(0, cssDoodleRule.length - 1)]})`
}
</script>

<style lang='scss' scoped>
@import "./css/nineGrid.scss"
</style>
