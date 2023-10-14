import { ref, watch } from 'vue'

export const tasks = ref<Array<Task>>([])

export function record (content: Task['content'], level: Task['level'] = 1) {
  console.log('record start: ', content)
  const task: Task = { content, level, id: Date.now(), controls: [] }
  tasks.value.push(task)
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = async function (...args: any[]) {
      return Promise.resolve(fn.apply(this, args))
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          const index = tasks.value.findIndex(item => item.id === task.id)
          index !== -1 && tasks.value.splice(index, 1)
          console.log('record end: ', content)
          // 如果存在特殊任务，进入后续队列中
        })
    }
    return descriptor
  }
}

export function getCurrentTask () {
  if (tasks.value.length > 0) {
    return tasks.value[tasks.value.length - 1]
  } else return null
}

watch(tasks, () => {
  console.log('asdasda')
})

// 直接在这里进行组件的渲染