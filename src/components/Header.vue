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
import { elMenu}
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
  }
})
</script>

<style lang="scss" scoped>
</style>
