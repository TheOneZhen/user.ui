<script lang='ts' setup>
import { VNode } from 'vue'
/**
 * 组件设计规则：
 * 1. 轮播组件，塞入组件，然后播放（类似leetcode代码轮播）
 * 2. 现阶段将此组件和markdown强绑定，所以不再支持渗透类型的功能，比如：鼠标悬浮时自动找到视频并播放
 */
const { data, autoPlay, isDisplayControls, isDisplayTitle } = defineProps({
  data: {
    type: Object as PropType<{
      node: VNode,
      title: string
    }[]>,
    required: true
  },
  /** 自动播放（ms） */
  autoPlay: {
    type: Number,
    default: 0
  },
  /** 是否展示controls（播放相关按钮） */
  isDisplayControls: {
    type: Boolean,
    default: true
  },
  /** 是否展示titles */
  isDisplayTitle: {
    type: Boolean,
    default: false
  }
})
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
  current.value = num
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
    <div></div>
    <div class="z-carousel-window">
      <div v-if="isDisplayTitle" class="z-carousel-title g-height-60px g-display-flex g-cursor-pointer">
        <span v-for="({ title }, index) in data" :key="index"
          :class="[{ 'z-carousel-title-active': index === current }, 'g-flex-auto']" @click="() => jump(index)">{{ title
          }}</span>
      </div>
      <component v-for="(item, index) in data" :key="index" v-show="index === current" :is="item.node" />
    </div>
    <div v-if="isDisplayControls" class="z-carousel-controls g-display-flex g-align-items-center g-height-30px">
      <div @click="handlePlay" :class="playing ? 'icon-carbon:pause' : 'icon-carbon:play'" class="g-cursor-pointer"></div>
      <div class="g-flex-auto"></div>
      <div @click="() => next(-1)" icon-carbon:chevron-left class="g-cursor-pointer"></div>
      <div class="g-cursor-default">{{ `${current + 1} / ${dataLength}` }}</div>
      <div @click="() => next(1)" icon-carbon:chevron-right class="g-cursor-pointer"></div>
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

  .z-carousel-window {}

  .z-carousel-controls {
  }
}
</style>
