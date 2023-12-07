import { Directive } from 'vue'

export const vActive: Directive<HTMLElement, boolean> = function (el, binding) {
  if (binding.value) el.style.color = 'var(--theme-color-active)'
  else el.style.color = ''
}