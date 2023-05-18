<template>
  <router-view />
  <teleport to="body">
    <el-drawer v-model="useDrawerStore.visible"
               append-to-body
               destroy-on-close
               :before-close="done => done()"
               :direction="useDrawerStore.direction"
               :title="useDrawerStore.title">
               <component :is="useDrawerStore.content"></component>
    </el-drawer>
  </teleport>
</template>

<script lang="ts" setup>
import { UseDrawerStore } from './store/UseDrawerStore'

const useDrawerStore = UseDrawerStore()

</script>
