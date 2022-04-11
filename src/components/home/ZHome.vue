<template>
  <el-row :gutter="20">
    <el-col :span="12">一直游到海水变蓝</el-col>
    <el-col :span="12">
      <el-row v-for="row in 3" :key="row">
        <el-col :span="8" v-for="col in 3" :key="col">
          <css-doodle click-to-update :use="getDoodle(row, col)" />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
import { random } from 'lodash'

const cssDoodleRule = ['--RandRect', '--AbstractShape', '--AbstractCircle', '--TransformRect']

function getDoodle (row: number, col: number) {
  if (row === 2 && col === 2) return 'var(--Z)'
  return `var(${cssDoodleRule[random(0, cssDoodleRule.length - 1)]})`
}
</script>

<style lang='scss' scoped>
css-doodle {
  --gridSize: 8em;
  --RandRect: (
    @grid: 5 / var(--gridSize);
    background: #e7dec8;
    transform: scale(@rand(0.2, 0.9));
  );
  --TransformRect: (
    --bk: hsl(@rand(360), 60%, 70%);
    --turns: 0turn;
    :hover {
      --bk: hsl(@rand(360), 60%, 70%);
      --turns: 1turn;
    }
    @grid: 3 / var(--gridSize);
    background: var(--bk);
    transform: var(--turns);
    transition: transform background 1s;
  );
  --AbstractShape: (
    @grid: 5 / var(--grid);
    background: linear-gradient(
      @rand(360deg),
      @stripe(#60569E, #E6437D, #EBBF4D)
    );
  );
  --AbstractCircle: (
    @grid: 1 / var(--gridSize);
    background: radial-gradient(
      circle at @r(100%) @r(100%),
      @m20(
        @p(#60569e, #ebbf4d) calc(@n(-1) * 100% / @N),
        @lp calc(@n * 100% / @N)
      )
    );
  );
  --Z: (
    background: @svg(
      viewBox: 0 0 1 1;
      path {
        d: M 0 0 L 1 0 L 1 1;
        fill: red;
      }
    );
  );
}
</style>
