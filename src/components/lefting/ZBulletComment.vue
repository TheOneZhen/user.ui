<template>
  <div class="z-bullet-comment">
    <span>{{ bulletComment.content }}</span>
    <el-icon color="red">
      <i-ep-caret-top />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
// with writing default value and input the theme
const props = withDefaults(defineProps<{
  // it need replace the global annotation but now none
  commentStyle: CommentStyle
  direction: string
  skin: string
  /** the time it takes to reach the destination(s) */
  flowVelocity: number
  bulletComment: ZComment
}>(), {
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
  skin: 'default',
  flowVelocity: 5
})

</script>

<style lang="scss" scoped>
  @keyframes flowBulletComment {
    from { right: 0; } to { right: 100% }
  }
  .z-bullet-comment {
    position: fixed;
    right: 0;
    top: 40%;
    animation-duration: v-bind('flowVelocity + "s"');
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;
    animation-play-state: running;
    animation-name: flowBulletComment;
  }
</style>
