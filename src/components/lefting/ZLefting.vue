<template>
  <div class="z-lefting g-margin-5vh-10vw g-width-80vw g-min-height-80vh">
    <z-comments :article="null" :quote="null" />
    <el-button circle
               class="g-position-fixed g-left-92vw g-bottom-100px"
               @click="hanldeComment">
      <el-icon icon-pajamas:comment-dots />
    </el-button>
  </div>
</template>

<script lang="ts" setup>
const useReply = app.store.get('UseReplyStore')

function hanldeComment () {
  useReply.on(null, null)
}
</script>

<style lang="scss" scoped>
.z-lefting {
  background-color: rgba($color: #FFFFFF, $alpha: .4);
}
</style>