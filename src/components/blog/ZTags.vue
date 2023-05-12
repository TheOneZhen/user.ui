<template>
  <div class="z-tags">
    <el-scrollbar>
      <div v-if="mode === 'hover'" class="z-tags-hover">
        <el-popover placement="right" width="400" trigger="hover" v-for="[tag, catalogs] of data" :key="tag">
          <template #reference>
            <el-badge :value="catalogs.length" type="primary">
              <el-tag>{{ tag }}</el-tag>
            </el-badge>
          </template>
          <div>
            <el-scrollbar :max-height="500">
              <el-card shadow="hover" v-for="catalog in catalogs" :key="catalog.date">
                <template #header><span v-html="catalog.title"></span></template>
                <z-markdown-preview :text="catalog.description" />
              </el-card>
            </el-scrollbar>
          </div>
        </el-popover>
      </div>
      <div v-else>
        <el-row class="z-tag" v-for="[tag, catalogs] of data" :key="tag">
          <el-col :span="8">
            <el-badge :value="catalogs.length" type="primary">
              <el-tag>{{ tag }}</el-tag>
            </el-badge>
          </el-col>
          <el-col :span="16">
            <el-card shadow="hover" v-for="catalog in catalogs" :key="catalog.date">
              <template #header><span>{{ catalog.title }}</span></template>
              <z-markdown-preview:text="catalog.description" />
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  mode: 'list' | 'hover'
  height?: string
  data: typeof app.blog.filterTagMap
}>()
</script>

<style lang="scss" scoped>
.z-tags {
  height: v-bind('height || "30vh"');
  overflow: auto;
}
</style>
