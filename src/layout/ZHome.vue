<script lang='ts' setup>
import { NavigationMenu } from './header.config'

const blog = NavigationMenu[1]
const lefting = NavigationMenu[2]
</script>

<template>
  <div class="z-home">
    <div class="g-padding-5%">
      <z-signature width="200" />
      <!-- <component :is="ZSignature" width="220" /> -->
      <div slide-enter class="g-user-select-none">
        <h2>哈！</h2>
        <p>欢迎来到我的主页！</p>
        <p>浏览
          <el-link @click="() => app.router?.push({ name: blog.title })"><el-icon :[blog.icon]="''"></el-icon>博客</el-link>
          ，这里有简单的技术分享；
        </p>
        <p>你可以在每篇博客或窗口中留言，再或者在
          <el-link @click="() => app.router?.push({ name: lefting.title })"><el-icon :[lefting.icon]="''"></el-icon>留言</el-link>
          中留下你的建议和疑问；
        </p>
        <p>你还可以在其他平台发现我
          <el-link href="https://github.com/TheOneZhen" target="_blank"><el-icon icon-carbon:logo-github />GitHub</el-link>、
          <el-link href="https://leetcode.cn/u/zhen-zd/" target="_blank"><el-icon icon-tabler:brand-leetcode />LeetCode</el-link>、
          <el-link href="https://juejin.cn/user/3017492587878349" target="_blank"><el-icon icon-tabler:brand-juejin />稀土掘金</el-link>，
          虽然它们可能也很空白；
        </p>
        <p>如果你有一些悄悄话，可以使用上述方式@我，但我不一定会回复
          <el-icon icon-carbon:face-wink></el-icon>
          。
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.z-home {
}
</style>../../app/header.config