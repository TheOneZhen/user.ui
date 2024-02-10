<template>
  <el-scrollbar id="z-main-scroll">
    <css-doodle ref="doodle" class="g-position-absolute" click-to-update use="var(--rule)" />
    <div class="g-relative g-min-height-100dvh" @click.self="() => doodle.update()" >
      <z-header />
      <div class="g-flex">
        <div style="display: var(--theme-layout-left-display); flex-basis: var(--theme-layout-left);"></div>
        <router-view class="g-relative g-flex-auto" />
        <div style="display: var(--theme-layout-right-display); flex-basis: var(--theme-layout-right);"></div>
      </div>
      <!-- <z-bullet-screen></z-bullet-screen> -->
    </div>
    <z-signature v-if="tasks.length > 0" :loading="true" width="100" class="g-position-fixed g-left-1% g-bottom-10px"></z-signature>
    <el-backtop class="g-left-92%" ></el-backtop>
    <z-footer />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { tasks } from '@/utils/record'
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
        background: @var(--theme-color-active);
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
      background: @var(--theme-bar);
      border: 1px solid #000;
      transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(-30deg, 30deg), @lr);
    }
    @nth(8, 9, 10, 11, 12, 13, 14, 15, 16, 17) {
      position: absolute;
      left: @r(0, 100)%;
      bottom: 0;
      @size:@r(2vmin, 8vmin) @lr;
      background: @var(--theme-compete);
      border: 1px solid #000;
      transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(30, 40deg), @lr);
    }
  );
}
</style>