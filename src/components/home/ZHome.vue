<template>
  <div class="z-home g-absolute">
    <z-signature width="200" />
    <!-- <component :is="ZSignature" width="220" /> -->
    <div slide-enter class="g-user-select-none">
      <h2>哈！</h2>
      <p>欢迎来到我的主页！</p>
      <p>浏览<el-link :href="blog.title"><el-icon :[blog.icon]="''"></el-icon>博客</el-link>，这里有简单的技术分享；</p>
      <p>你可以在每篇博客或窗口中留言，再或者在
        <el-link :href="lefting.title"><el-icon :[lefting.icon]="''"></el-icon>留言</el-link>
        中留下你的建议和疑问；
      </p>
      <p>你还可以在其他平台发现我
        <el-link href="https://github.com/TheOneZhen"><el-icon icon-carbon:logo-github></el-icon>GitHub</el-link>、
        <el-link href="https://leetcode.cn/u/zhen-zd/"><el-icon><el-image src="https://static.leetcode-cn.com/cn-frontendx-assets/production/_next/static/images/logo-ff2b712834cf26bf50a5de58ee27bcef.png"></el-image></el-icon>LeetCode</el-link>、
        <el-link href="https://juejin.cn/user/3017492587878349"><el-icon><el-image src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/juejin.7948662.png"></el-image></el-icon>稀土掘金</el-link>
        虽然其他平台可能也很空白；
      </p>
      <p>如果你有一些悄悄话，可以使用上述方式@我，但我不一定回复，哈！</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { NavigationMenu } from '../header/header.config'

const blog = NavigationMenu[1]
const lefting = NavigationMenu[2]
</script>

<style lang='scss' scoped>
.z-home {
  top: 30%;
  left: 30%;
}
</style>
