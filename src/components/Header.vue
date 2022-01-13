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
      <el-menu-item-group
        v-for=""
      >
        <template #title></template>
        <el-menu-item 
          index=""
        ></el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts">
<<<<<<< HEAD
import { elMenu}
import { defineComponent } from 'vue-demi'
=======
import { Header } from '@/DS/menu';
import { defineComponent } from 'vue'
>>>>>>> 1125fff840af8f12006dfc8b5b3295284bff2e09

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
<<<<<<< HEAD
  },
  data () {
    return {
      navigationList: [
        {
          title: "第一页",
          icon: "",
          disabled: false,
          children: []
        },
        {
          title: "编程记",
          icon: "",
          disabled: false,
          children: []
        },
        {
          title: "藏宝库",
          icon: "",
          disabled: false,
          children: []
        },
        {
          title: "call me",
          icon: "",
          disabled: false,
          children: []
        }
      ]

    }
=======
>>>>>>> 1125fff840af8f12006dfc8b5b3295284bff2e09
  }
})
</script>

<style lang="scss" scoped>
</style>
