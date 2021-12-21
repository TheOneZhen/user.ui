<template>
  <el-menu
    default-active="2"
    menu-trigger="click"
    :collapse="menuCollapse"
  ></el-menu>
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


    }
  }
})
</script>

<style lang="scss" scoped>
</style>
