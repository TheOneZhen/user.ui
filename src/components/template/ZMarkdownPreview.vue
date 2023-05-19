<template>
  <div slide-enter class="z-markdown-preview markdown-body" v-html="html">
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  content: string
}>()

const html = app.blog.converterMdToHTML(props.content)

</script>