import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import 'element-plus/es/components/notification/style/css'

export const tasks = ref<Array<Task>>([])

export function record (
  content: Task['content'],
  successContent = '',
  errorContent = ''
) {
  return function (target: any, name: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const task: Task = { content, id: Date.now(), controls: [], successContent, errorContent }
      const instance = ElNotification({
        message: content,
        duration: 0,
        position: 'bottom-left',
        offset: 100,
        onClose: () => {
          const index = tasks.value.findIndex(item => item.id === task.id)
          if (index !== -1) {
            tasks.value[index].controls.forEach(control => control.abort())
            tasks.value.splice(index, 1)
          }
          instance.close()
        }
      })

      tasks.value.push(task)

      return Promise.resolve(fn.apply(this, args))
        .then(res => {
          if (successContent) ElNotification({ message: successContent })
          return res
        })
        .catch(() => {
          if (!errorContent) return
          // 报告错误
          ElNotification({ message: errorContent, type: 'error' })
        })
        .finally(() => {
          removeTask(task.id)
          instance.close()
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

function removeTask (taskId: Task['id']) {
  const index = tasks.value.findIndex(item => item.id === taskId)
  index !== -1 && tasks.value.splice(index, 1)
}