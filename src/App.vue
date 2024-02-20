<template>
  <el-config-provider :size="size">
    <router-view />
    <teleport to="body">
      <z-reply />
    </teleport>
  </el-config-provider>
</template>

<script lang='ts' setup>
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize()
// 这样感觉好蠢，之后看能不能切换为纯CSS
const size = computed(() => width.value > 1024 ? 'large' : (width.value > 768 ? 'default' : 'small'))

</script>
