<template>
  <el-row :gutter="20">
    <el-col :span="12">一直游到海水变蓝</el-col>
    <el-col :span="12">
      <el-row v-for="row in 3" :key="row">
        <el-col :span="8" v-for="col in 3" :key="col">
          <div class="g-pd-10">
            <css-doodle click-to-update :use="getDoodle(row, col)" />
          </div>
        </el-col>
      </el-row>
    </el-col></el-row>
</template>

<script lang='ts' setup>
import { random } from 'lodash'

const cssDoodleRule = ['--RandRect', '--AbstractShape', '--AbstractCircle', '--TransformRect', '--RandTriangle', '--AbstractRiver']

function getDoodle (row: number, col: number) {
  if (row === 2 && col === 2) return 'var(--Z)'
  return `var(${cssDoodleRule[random(0, cssDoodleRule.length - 1)]})`
}
</script>

<style lang='scss' scoped>
@import "./css/nineGrid.scss"
</style>
