<template>
  <Transition>
    <svg viewBox="0 0 160 80" @click="handleClick" class="g-pointer">
      <title>zhen</title>
      <g :class="{'z-jump': loading}" stroke="var(--signature-stroke)" fill="var(--signature-fill)">
        <path d="m0,40 h20 l-20,20 l20,20"></path>
        <path d="m40,40 v40 v-20 h20 v20"></path>
        <path d="m80,70 h20 v-10 h-20 v20 h20"></path>
        <path d="m120,60 v20 v-20 h20 v20"></path>
      </g>
    </svg>
  </Transition>
</template>

<script lang="ts" setup>
const { loading } = defineProps({ loading: { type: Boolean, default: false } })

function handleClick () {
  app.theme.handleClickSignature()
}

</script>

<style lang="scss" scoped>

@for $i from 1 through 4 {
  .z-jump > *:nth-child(#{$i}) {
    animation-duration: 2s;
    animation-timing-function: ease-in;
    animation-delay: $i * 1s;
    animation-iteration-count: infinite;
    animation-name: jump;
  }
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20%);
  }
  100% {
    transform: translateY(0);
  }
}


</style>