<template>
  <div class="z-tags">
    <div v-if="mode === 'hover'">
      <el-popover placement="right" :title="tag" trigger="hover" v-for="[tag, catalogs] of data" :key="tag">
        <template #reference>
          <el-badge :value="catalogs.length" type="info">{{ tag }}</el-badge>
        </template>
        <el-card shadow="hover" v-for="catalog in catalogs" :key="catalog.date">
          <template #header><span>{{ catalog.title }}</span></template>
          <v-md-preview :text="catalog.description" />
        </el-card>
      </el-popover>
    </div>
    <div v-else>
      <el-row class="z-tag" v-for="[tag, catalogs] of data" :key="tag">
        <el-col :span="8">
          <el-badge :value="catalogs.length" type="info">{{ tag }}</el-badge>
        </el-col>
        <el-col :span="16">
          <el-card shadow="hover" v-for="catalog in catalogs" :key="catalog.date">
            <template #header><span>{{ catalog.title }}</span></template>
            <v-md-preview :text="catalog.description" />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  mode: 'list' | 'hover'
  data: Map<CatalogType['title'], Array<CatalogType>>
}>()
</script>

<style lang="scss" scoped></style>
