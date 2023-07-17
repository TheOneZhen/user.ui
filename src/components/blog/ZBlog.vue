<template>
  <div class="z-blog">
    <router-view v-slot = '{ Component, route }'>
      <component v-if="Component" :is="Component"></component>
      <z-blog-list-display v-else />
    </router-view>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.z-blog {
  margin: 5vh 10vw;
  width: 80vw;
  background-color: rgba($color: #FFFFFF, $alpha: .4);
}
</style>
