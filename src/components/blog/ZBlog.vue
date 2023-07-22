<template>
  <div class="z-blog g-margin-5vh-10vw g-width-80vw">
    <router-view v-slot = '{ Component, route }'>
      <component v-if="Component" :is="Component"></component>
      <z-blog-list-display v-else />
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.z-blog {
  background-color: rgba($color: #FFFFFF, $alpha: .4);
}
</style>
