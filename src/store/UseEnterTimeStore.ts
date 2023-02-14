import { ref } from 'vue'

export function UseEnterTimeStore () {
  const time = ref(Date.now())
  return { time }
}