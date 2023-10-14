import { ref } from 'vue'

export const tasks = ref<Array<Task>>([])

export function record (task: Task) {
  tasks.value.push(task)
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    return descriptor
  }
}