<template>
  <el-scrollbar id="z-main-scroll">
    <css-doodle ref="doodle" class="g-absolute" click-to-update use="var(--rule)" />
    <div class="z-main g-relative" @click.self="() => doodle.update()" >
      <z-header />
      <router-view class="g-relative" />
      <!-- <z-bullet-screen></z-bullet-screen> -->
    </div>
    <z-footer></z-footer>
  </el-scrollbar>
</template>

<script lang="ts" setup>
/**
 * 因为网站主体是SPA，所以我在#app上对页面的宽和高进行了约束，之后各个页面的布局建立于此
 * 1. 原子组件不允许约束任何尺寸，尺寸应由其父组件约束
 * 2. 布局层面，滚动条应该只有一个，位于本组件下
 * 3. 对于自适应布局，应尽可能使用自适应单位，比如字体全部使用rem
 */
import { useRouter } from 'vue-router'
const doodle = ref<any>(null)

app.router = useRouter()
</script>

<style lang="scss" scoped>
.z-main {
  min-height: 100vh;
}

css-doodle {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  --rule: (
    :doodle {
      @grid: 17x1 / 100% 100%;
      overflow: hidden;
      background: @var(--theme-background);
      transition: background 1s ease;
    }
    transition: @r(0.3, 0.7)s ease all;
    @nth(1) {
      position: absolute;
      @place-cell: @m2(@r(0, 100)%);
      @size: @r(3vmin, 20vmin) @lr;
      ::before, ::after {
        content: "";
        position: absolute;
        @place-cell: 0 0;
        @size: 100% 100%;
        background: @var(--theme-background-sun);
        border-radius: 100%;
        transition: inherit;
      }
      ::before {
        opacity: 0.25;
        transform: scale(@r(1.01, 1.5));
      }
      ::after {
        border: 1px solid #000;
      }
    }
    @nth(2, 3, 4, 5, 6, 7) {
      position: absolute;
      left: @r(0, 100)%;
      bottom: 0;
      @size:@r(8vmin, 20vmin) @lr;
      background: @var(--theme-background-mountain);
      border: 1px solid #000;
      transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(-30deg, 30deg), @lr);
    }
    @nth(8, 9, 10, 11, 12, 13, 14, 15, 16, 17) {
      position: absolute;
      left: @r(0, 100)%;
      bottom: 0;
      @size:@r(2vmin, 8vmin) @lr;
      background: @var(--theme-background-tree);
      border: 1px solid #000;
      transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(30, 40deg), @lr);
    }
  );
}
</style>