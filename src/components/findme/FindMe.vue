<script lang='ts' setup>
import { CustomMarked } from '@/blog/customMarked'

const data: StationDataType['preview'] = [
  {
    type: 'image',
    content: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  },
  {
    type: 'image',
    content: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
  },
  {
    type: 'image',
    content: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
  },
  {
    type: 'image',
    content: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
  },
  {
    type: 'image',
    content: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
  },
  {
    type: 'code',
    content: '这是一段测试文字'
  }
]

const customMarked = new CustomMarked()

const markdown = `
${'``` js'}
console.log(1)
console.log(1)
${'```'}
`
</script>

<template>
  <div class="z-find-me">
    <div class="part-one">
        <!-- <micro-app name="site" url="http://localhost:5173" iframe></micro-app> -->
        <!-- <z-preview-carousel :data="data" class="g-width-50%" /> -->
        <!-- <component :is="customMarked.parse(markdown)"></component> -->
        <!-- <customComponent/> -->
    </div>
  </div>
</template>

<style lang='scss' scoped>
.z-find-me {
  .part-one {
    height: 100%;
  }
}
</style>
