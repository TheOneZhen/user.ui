<script lang='ts' setup>
import ZCarousel from '@/blog/ZCarousel.vue'
import { CustomMarked } from '@/blog/customMarked'
import { ZPreviewCarouselImage } from '@/blog/preview'

const content = `
前端开发中npm重中之重，但是多数情况仅限于\`npm start\`这类基础指令，本篇将从高的视角去探索npm的能力并完成简单应用。

\`\`\`mermaid
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you ?
    Bob->>Alice: Fine, thank you. And you?
    create participant Carl
    Alice->>Carl: Hi Carl!
    create actor D as Donald
    Carl->>D: Hi!
    destroy Carl
    Alice-xCarl: We are too many
    destroy Bob
    Bob->>Alice: I agree
\`\`\`

## package and module

- \`package\`可能是一个文件或者一个文件夹，但是必须有\`package.json\`文件来描述这个包。
- \`module\`可能是一些js文件，或者是一个文件夹，但这个文件夹中必须包含\`package.json\`文件，且\`package.json\`中包含\`main\`字段。\`module\`必须放在项目\`node_modules\`目录下，且可以通过CJM或者ESM的方式导入。

\`\`\`image []
https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg
\`\`\`
\`\`\`image []
https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg
\`\`\`
\`\`\`image []
https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg
\`\`\`
\`\`\`image []
https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg
\`\`\`
\`\`\`image []
https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg
\`\`\`
\`\`\`js []
function *one () { 
  yield 1
  // 首先创建一个two迭代器，然后yield *将实例委托给two迭代器
  yield *two()
  yield 3
}
function *two () {
  yield 2
}
const it = one()
it.next().value // 1
it.next().value // 2
it.next().value // 3
\`\`\`

# 引用
1. https://docs.npmjs.com/

`

const customMarked = new CustomMarked()

const data = [
  {
    title: 'image',
    node: ZPreviewCarouselImage({ src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg' })
  },
  {
    title: 'image',
    node: ZPreviewCarouselImage({ src: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg' })
  },
  {
    title: 'image',
    node: ZPreviewCarouselImage({ src: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg' })
  },
  {
    title: 'image',
    node: ZPreviewCarouselImage({ src: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg' })
  },
  {
    title: 'image',
    node: ZPreviewCarouselImage({ src: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg' })
  }
]

</script>

<template>
  <div class="z-find-me">
    <div class="part-one">
      <!-- <micro-app name="site" url="http://localhost:5173" iframe></micro-app> -->
      <component :is="customMarked.parse(content, true, false)" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.z-find-me {
  .part-one {
    height: 100%;
    width: 60%;
  }
}
</style>
