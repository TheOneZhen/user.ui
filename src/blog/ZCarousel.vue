<script lang='ts' setup>
/**
 * # 组件说明
 * 该组件为轮播组件，用于阅读模式、markdown解析内部资源轮播。
 * ## 基本功能
 * - 不会自动播放
 * ## 阅读模式功能
 * - 在底部添加跳转按钮，点击可以跳转到对应block
 * - 切换时会自动跳转到对应block
 * ## markdown内部组件功能
 */
const { data, autoPlay, isDisplayButton } = defineProps({
  data: {
    type: Object as PropType<VNode[]>,
    required: true
  },
  /** 自动播放（ms） */
  autoPlay: {
    type: Number,
    default: 0
  },
  /** 是否展示底部菜单 */
  isDisplayButton: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits<{
  (event: 'jumpToContent', content: VNode): void
}>()
defineExpose({ jump })
const dataLength = data.length
const current = ref(0)
const playing = ref(false)

let timer: undefined | NodeJS.Timeout = undefined

watch(playing, val => {
  if (val) {
    timer = setInterval(() => next(1), autoPlay || 4000)
  } else {
    clearTimeout(timer)
  }
})

function handlePlay () {
  playing.value = !playing.value
}

function next (num: number) {
  current.value = (current.value + num + dataLength) % dataLength
}

function jump (num: number) {
  playing.value = false
  current.value = (num + dataLength) % dataLength
}

onMounted(() => {
  autoPlay && (playing.value = true)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})

</script>

<template>
  <div class="z-carousel">
    <component v-for="(item, index) in data" :key="index" v-show="index === current" :is="item" class="z-carousel-inner" />
    <div v-if="isDisplayButton" class="z-carousel-controls g-display-flex g-align-items-center g-height-30px">
      <div @click="handlePlay" :class="playing ? 'icon-carbon:pause' : 'icon-carbon:play'" class="g-cursor-pointer g-margin-0-1rem"></div>
      <!-- go to -->
      <div v-if="$attrs['jumpToContent'] !== undefined" class="g-flex-auto"></div>
      <template v-else>
        <div class="g-flex-auto"></div>
        <div style="flex-basis: content; min-width: 0; overflow: hidden;" @click="() => emit('jumpToContent', data[current])"></div>
        <div class="g-flex-auto"></div>
      </template>

      <div @click="() => jump(current - 1)" icon-carbon:chevron-left class="g-cursor-pointer g-margin-0-1rem"></div>
      <div class="g-cursor-default">{{ `${current + 1} / ${dataLength}` }}</div>
      <div @click="() => jump(current + 1)" icon-carbon:chevron-right class="g-cursor-pointer g-margin-0-1rem"></div>
    </div>
  </div>
</template>

<style lang='scss'>
.z-carousel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--theme-color-active);
  background-color: var(--theme-bar);

  .z-carousel-title {
    .z-carousel-title-active {
      background-color: var(--theme-compete);
    }
  }

  .z-carousel-inner {
    max-width: 100%;
  }

  .z-carousel-controls {
    background-color: var(--theme-compete);
  }
}
</style>
