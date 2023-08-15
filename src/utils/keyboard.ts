import { Directive, DirectiveBinding } from 'vue'

type BindingValueType = {
  keyMap: Record<string, Function>
  banTitle?: string[]
}

function getKey (event: KeyboardEvent) {
  let modifier = ''
  // 不建议将`Control`，`Shift`，`Alt`作为直接快捷键
  if (['Control', 'Shift', 'Alt'].includes(modifier)) return ''
  event.ctrlKey && (modifier += 'Ctrl+')
  event.shiftKey && (modifier += 'Shift+')
  event.altKey && (modifier += 'Alt+')
  // `shift`键会导致字符大写，建议所有key都设置为大写，如：Ctrl+C
  return modifier + event.key.toLocaleUpperCase()
}

function generateListener (el: HTMLElement, binding: DirectiveBinding<BindingValueType>) {
  if (!el || !binding) throw new Error('Bindings content empty!')
  return function (event: KeyboardEvent) {
    const { value } = binding
    const tagName = (event.target as HTMLElement).tagName
    const key = getKey(event)
    // 阻止一些HTML标签的冒泡
    let banTitle = ['INPUT', 'A', 'TEXTAREA']
    if (value.banTitle?.length) banTitle = value.banTitle.map(title => title.toLocaleUpperCase())
    if (banTitle.includes(tagName)) return null
    // 默认阻止向上冒泡，避免当前区域快捷键与上层快捷键冲突
    event.stopPropagation()
    key && value.keyMap[key]?.()
  }
}

export const DirectiveKeyboard: Directive<HTMLElement, BindingValueType> & { bindingMethod: ReturnType<typeof generateListener> | null } = {
  bindingMethod: null,
  created (el, binding) {
    const { modifiers } = binding
    el.tabIndex = -1
    this.bindingMethod = generateListener(el, binding)
    // 修饰符，绑定到全局
    if (modifiers.global) {
      window.addEventListener('keydown', this.bindingMethod)
    } else {
      el.addEventListener('keydown', this.bindingMethod)
    }
  },
  mounted (el, binding) {
    // 这里可以进行聚焦，方便组件加载之后自动高亮组件
    el.focus()
  },
  beforeUnmount (el, binding) {
    const { modifiers } = binding
    if (modifiers.global) {
      this.bindingMethod !== null && window.removeEventListener('keydown', this.bindingMethod)
    } else {
      this.bindingMethod !== null && el.removeEventListener('keydown', this.bindingMethod)
    }
    this.bindingMethod = null
  }
}
