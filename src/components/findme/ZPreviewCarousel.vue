<script lang='ts' setup>
import { ZPreviewCarouselImage, ZPreviewCarouselVideo, ZMarkdownPreview } from '@/blog/preview'
/** 是否产生上下文，以形成URL精确的索引 */
const { data, autoPlay, ifEVideoSkipQuickWhenHover } = defineProps({
  data: {
    type: Object as PropType<StationDataType['preview']>,
    required: true
  },
  /** 自动播放（ms） */
  autoPlay: {
    type: Number,
    default: 0
  },
  /** 如果存在视频，鼠标悬浮的时候快速跳到视频上 */
  ifEVideoSkipQuickWhenHover: {
    type: Boolean,
    default: false
  }
})
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

onMounted(() => {
  autoPlay && (playing.value = true)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})

</script>

<template>
  <div class="z-preview-carousel">
    <div class="z-preview-carousel-window">
      <component v-for="(item, index) in data" :key="index" v-show="index === current" :is="
          item.type === 'image'
          ? ZPreviewCarouselImage({ src: item.content })
          : (
            item.type === 'video'
            ? ZPreviewCarouselVideo({ src: item.content })
            : ZMarkdownPreview({ content: item.content })
          )
        "
        class="g-width-100% " />
    </div>
    <div class="z-preview-carousel-control-bar g-ai-c g-height-30px">
      <div @click="handlePlay">start</div>
      <div class="g-flex-auto"></div>
      <div @click="() => next(-1)">《</div>
      <div>{{ `${current + 1}/${dataLength}` }}</div>
      <div @click="() => next(1)">》</div>
    </div>
  </div>
</template>

<style lang='scss'>
.z-preview-carousel {
  border: 1px solid var(--theme-background-sun);
  background-color: #FFFFFF;
  .z-preview-carousel-control-bar {
    background-color: var(--theme-background-mountain);
  }
}
</style>
