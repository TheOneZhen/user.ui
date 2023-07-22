<template>
  <div slide-enter class="z-markdown-preview markdown-body" v-html="html">
  </div>
</template>

<script lang="ts" setup>
// import hljs from 'highlight.js'

const props = defineProps<{
  content: string
}>()

const html = app.blog.converterMdToHTML(props.content)

</script>

<style lang="scss" scoped>
.z-markdown-preview {
  background-color: transparent;
}
</style>