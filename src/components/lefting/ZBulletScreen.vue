<template>
  <Teleport to="#z-bullet-screen-container">
    <div class="z-bullet-screen">
      <z-bullet-comment :bullet-comment="item"></z-bullet-comment>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
/**
 * - design interation
 *   - get the BCs and key in hash
 *   - averagely launching the BC interval
 *   - pushing the key in another hash when launched the BC
 *   - restarting when all BC was launched
 *     - judgement condition: anotherHash.size == initHash.size
 * - performance
 *   - the number of BCs' component only supporting cover the coverageRation number
 */

const item: ZComment = {
  id: '1',
  userId: '2',
  quoteId: '4',
  content: '这是一段测试文字',
  likes: 1,
  dislikes: 10,
  create_time: '2023',
  update_time: '2024',
  blogId: 'adasd'
}
</script>

<style lang="scss" scoped>

</style>
