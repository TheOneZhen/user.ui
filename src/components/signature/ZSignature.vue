<template>
  <svg viewBox="0 0 160 40" @click="handleClick" class="g-pointer">
    <title>zhen</title>
    <g stroke="var(--signature-stroke)" fill="var(--signature-fill)">
      <path d="m0,0 h20 l-20,20 l20,20"></path>
      <path d="m40,0 v40 v-20 h20 v20"></path>
      <path d="m80,30 h20 v-10 h-20 v20 h20"></path>
      <path d="m120,20 v20 v-20 h20 v20"></path>
    </g>
  </svg>
</template>

<script lang="ts" setup>
function handleClick () {
  app.theme.handleClickSignature()
}
</script>