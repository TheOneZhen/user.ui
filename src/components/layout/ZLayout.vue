<template>
  <el-scrollbar id="z-main-scroll">
    <css-doodle ref="doodle" class="g-position-absolute g-width-100% g-height-100%" click-to-update use="var(--rule)" />
    <div class="g-relative g-min-height-100vh" @click.self="() => doodle.update()" >
      <z-header />
      <router-view class="g-relative" />
      <!-- <z-bullet-screen></z-bullet-screen> -->
    </div>
    <el-backtop target="#z-main-scroll .el-scrollbar__wrap" class="g-left-92%" ></el-backtop>
    <z-footer />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
app.router = useRouter()

const doodle = ref<any>(null)
</script>

<style lang="scss" scoped>

css-doodle {
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