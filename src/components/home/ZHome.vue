<template>
  <div class="z-home">
    <css-doodle click-to-update :use="rule" />
    <div class="z-home-signature">
      <component :is="ZSignature" width="220" />
      <h2>你好呀！</h2>
      <p>欢迎来到我的主页，这是一个简单的博客小站。</p>
      <p>在这里，你可以看到各式各样的技术和它的应用</p>
      <p>找到可能困扰你许久的问题的解决方案</p>
      <p>感受到技术变革为生活带来的进步</p>
    </div>
  </div>
</template>

<script lang='ts' setup>
import ZSignature from '../signature/ZSignature.vue'
import dayjs from 'dayjs'

const rule = ref('')
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

<style lang='scss' scoped>
.z-home {
  height: 100vh;
  css-doodle {
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
  .z-home-signature {
    position: absolute;
    top: 30%;
    left: 30%;
  }
}
</style>
