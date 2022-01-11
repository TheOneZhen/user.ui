<template>
  <el-menu
    default-active="1"
    menu-trigger="click"
    :collapse="menuCollapse"
  >
    <el-sub-menu 
      v-for="(item, index) in navigationMenu"
      :key="index"
      index="index"
      :disabled="false"
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
import { Header } from '@/DS/menu';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'header',
  components: {},
  props: {

  },
  data () {
    return {
      navigationMenu: [
        {
          title: "首页",
          icon: "",
          disabled: false,
          children: []
        },
        {
          title: "资源共享",
          icon: "",
          disabled: false,
          children: []
        },
        {
          title: "问题记录",
          icon: "",
          disabled: false,
          children: []
        },
        {
          title: "留言",
          icon: "",
          disabled: false,
          children: []
        }
      ] as Header.Menu

    }
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
  }
})
</script>

<style lang="scss" scoped>
</style>
