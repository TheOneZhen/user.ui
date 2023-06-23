<template>
  <el-scrollbar id="z-main-scroll">
    <css-doodle ref="doodle" class="g-absolute" click-to-update :use="rule" />
    <div class="z-main g-relative" @click.self="() => doodle.update()" >
      <z-header />
      <router-view class="g-relative" />
      <z-bullet-screen></z-bullet-screen>
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
import dayjs from 'dayjs'

const rule = ref('')
const doodle = ref<any>(null)
const interval = setInterval(getRule, 1000 * 60 * 60 * 3)

function getRule () {
  const index = Math.floor(dayjs().hour() / 3)
  rule.value = `var(--rule-${index}), var(--rule)`
}

onMounted(() => {
  getRule()
})

onUnmounted(() => {
  clearInterval(interval)
})
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
      background: @var(--sky);
      transition: @r(0.3, 0.7)s ease all;
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
        background: @var(--sun);
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
      background: @var(--mountain);
      border: 1px solid #000;
      transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(-30deg, 30deg), @lr);
    }
    @nth(8, 9, 10, 11, 12, 13, 14, 15, 16, 17) {
      position: absolute;
      left: @r(0, 100)%;
      bottom: 0;
      @size:@r(2vmin, 8vmin) @lr;
      background: @var(--tree);
      border: 1px solid #000;
      transform: translateY(@p(50%, 100%)) rotate(45deg) skew(@r(30, 40deg), @lr);
    }
  );
  --rule-0: (:doodle {--sun: #f0943a; --sky: #3d2333; --mountain: #452340; --tree: #e284af;});
  --rule-1: (:doodle {--sun: #de6b70; --sky: #f0e87f; --mountain: #6a73c2; --tree: #9596be;});
  --rule-2: (:doodle {--sun: #f0e87f; --sky: #57b2cf; --mountain: #c79498; --tree: #9596be;});
  --rule-3: (:doodle {--sun: #f0933b; --sky: #de6b6f; --mountain: #85616e; --tree: #b14b34;});
  --rule-4: (:doodle {--sun: #f0e87f; --sky: #0e1116; --mountain: #c89598; --tree: #e284af;});
  --rule-5: (:doodle {--sun: #f0f0f0; --sky: #eacdb1; --mountain: #f5aeb2; --tree: #b04b35;});
  --rule-6: (:doodle {--sun: #f0f0f0; --sky: #57b2cf; --mountain: #85616e; --tree: #452340;});
  --rule-7: (:doodle {--sun: #f0f0f0; --sky: #de6b6f; --mountain: #f5aeb2; --tree: #e284ae;});
  --rule-8: (:doodle {--sun: #f0f0f0; --sky: #25272b; --mountain: #452340; --tree: #85616e;});
}
</style>