<template>
  <div slide-enter class="z-markdown-preview markdown-body" v-html="html">
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  text: string
}>()

const html = app.blog.converterMdToHTML(props.text)

</script>