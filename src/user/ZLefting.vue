<template>
  <div class="z-lefting">
    <z-comments :article="null" :quote="null" />
    <async-teleport to="#z-layout-sider-right">
      <el-button circle class="fixed-button" style="bottom: 100px;" @click="hanldeComment">
        <el-icon icon-pajamas:comment-dots />
      </el-button>
    </async-teleport>
  </div>
</template>

<script lang="ts" setup>
import { AsyncTeleport } from '@/utils/DOMUtil';

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