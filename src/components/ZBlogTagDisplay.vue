<template>
  <div class="g-jc-sa g-flex-wrap g-row-gap-5%">
    <el-card v-for="[, tag] in app.blog.tagMap"
             class="_item g-max-width-20% g-pointer"
             :key="tag.id">
      <template #header>
        <el-tag class="_tag" v-text="tag.title"></el-tag>
      </template>
      <el-image :src="tag.images[0]"
                loading="lazy"
                preview-teleported
                hide-on-click-modal
                class="_image"
                scroll-container="#z-main-scroll"
                :alt="tag.description"
                :preview-src-list="tag.images"/>
    </el-card>
  </div>
</template>

<style lang='scss' scoped>
._tag, ._image {
  transition: transform .3s;
}
._item:hover {
  ._tag, ._image {
    transform: scale(1.1);
  }
}
</style>
