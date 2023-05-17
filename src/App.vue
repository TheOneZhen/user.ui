<template>
  <router-view />
  <teleport to="body">
    <el-drawer v-model="useDrawerStore.visible"
               append-to-body
               :before-close="done => done()"
               :direction="useDrawerStore.direction"
               :title="useDrawerStore.title">zheshiyidaun ceshineirong </el-drawer>
  </teleport>
</template>

<script lang="ts" setup>
import { UseDrawerStore } from './store/UseDrawerStore'

const useDrawerStore = UseDrawerStore()
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
</style>
