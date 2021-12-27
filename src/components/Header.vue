<template>
  <el-menu
    default-active="1"
    menu-trigger="click"
    :collapse="menuCollapse"
  >
    <el-sub-menu 
      v-for="(item, index) in navigationList"
      :key="index"
      index="index"
      disabled="false"
    >
      <template #title>
        <span></span>
        <el-icon v-html="item.icon"></el-icon>
      </template>
      <el-menu-item-graoup
        v-for=""
      >
        <template #title></template>
        <el-menu-item 
          index=""

        ></el-menu-item>
      </el-menu-item-graoup>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'header',
  components: {},
  props: {

  },
  beforeMount () {

  },
  mounted () {

  },
  computed: {
      menuMode (): String {
        return "horizontal";
      },
      menuCollapse () {
        return false;
      }
  },
  data () {
    return {
      navigationList: [
        {
          title: "",
          icon: "",
          disabled: false,
          children: []
        }
      ]

    }
  }
})
</script>

<style lang="scss" scoped>
</style>
