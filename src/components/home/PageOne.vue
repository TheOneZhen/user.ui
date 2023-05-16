<template>
  <!-- <css-doodle v-for="col in 3" class="g-margin-10" :key="col" click-to-update :use="getDoodle(row, col)" /> -->
  <p slide-enter>
    asdhloasiudhoiasjduiahsndoliasjholdijaslduihasiudhjalsoidjlasoidjhasufgoluihoiadoijasoidjsiiiiiiiiiiiisaijdoiamsdijmaspdjasp;djsap;nhdp;sauinhbduiashfaosjdpo;asjdpoasjdasoida
  </p>
</template>

<script lang='ts' setup>
import { random } from 'lodash'

const cssDoodleRule = ['--RandRect', '--AbstractShape', '--AbstractCircle', '--TransformRect', '--RandTriangle']

function getDoodle(row: number, col: number) {
  if (row === 2 && col === 2) return 'var(--Z)'
  return `var(${cssDoodleRule[random(0, cssDoodleRule.length - 1)]})`
}
</script>

<style lang='scss' scoped>
@import "./css/nineGrid.scss"
</style>
