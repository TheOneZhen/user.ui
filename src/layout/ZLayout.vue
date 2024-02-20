<template>
  <el-scrollbar wrap-class="z-main-scroll">
    <css-doodle ref="doodle" id="z-background-sun" class="g-position-absolute" click-to-update use="var(--rule)" />
    <div class="g-relative g-min-height-100dvh" @click.self="() => doodle.update()">
      <z-header />
      <div class="g-flex">
        <div id="z-layout-sider-left" style="display: var(--theme-layout-left-display); flex-basis: var(--theme-layout-left);"></div>
        <router-view class="g-relative g-flex-auto" style="width: calc(100% - var(--theme-layout-left) - var(--theme-layout-right));" />
        <div id="z-layout-sider-right" style="display: var(--theme-layout-right-display); flex-basis: var(--theme-layout-right);"></div>
      </div>
      <!-- <z-bullet-screen></z-bullet-screen> -->
    </div>

    <async-teleport to="#z-layout-sider-left">
      <z-signature v-if="tasks.length > 0" loading width="100" class="g-position-absolute g-left-1% g-bottom-10px" />
    </async-teleport>

    <async-teleport to="#z-layout-sider-right">
      <el-backtop target=".z-main-scroll" class="fixed-button"></el-backtop>
    </async-teleport>
    <z-footer />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { tasks } from '@/utils/record'
import { AsyncTeleport } from '@/utils/DOMUtil'
import './sun.scss'

app.router = useRouter()

const doodle = ref<any>(null)
</script>
