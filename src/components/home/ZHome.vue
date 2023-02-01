<template>
  <page-one></page-one>
  <page-two></page-two>
  <page-three></page-three>
</template>

<script lang='ts' setup>
import PageOne from './PageOne.vue'
import PageTwo from './PageTwo.vue'
import PageThree from './PageThree.vue'

</script>

<style lang='scss' scoped>
  .page {
    width: 100%;
    height: 100%;
    // #9D2121, #00879A, #E05320
    // #671812, #CAC0C1, #513C21
    // #E4D0C9, #B7B2CF, #2B515F
    // #E2E0EE, #092106, #000000
    // #235D6B, #B52807, #7B723C
    // #B63F31, #D6CADD, #2C47A6
    // #D4AC51, #D8D1DD, #1B3E36
    background: linear-gradient(to right, #235D6B, #B52807, #7B723C);
  }
</style>
