<template>
  <div class="z-bullet-comment">
    <span></span>
  </div>
</template>

<script lang="ts" setup>
// with writing default value and input the theme
const props = withDefaults(defineProps<BulletCommentProps>(), {
  commentStyle: () => ({
    fontSize: '12px',
    fontFamily: '楷体',
    fontColor: 'black',
    fontWeight: 'bloder',
    lineHeight: '16px',
    opacity: 1,
    background: 'white',
    border: '1px soild black'
  }),
  direction: 'rightToLeft',
  skin: 'none',
  flowVelocity: 10
})
</script>

<style lang="scss" scoped>
  @keyframes flowBulletComment {
  }
  .z-bullet-comment {

  }
</style>
