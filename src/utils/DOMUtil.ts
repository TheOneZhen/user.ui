import { Teleport } from 'vue'
import type { SetupContext } from 'vue'
import ZSignature from '@/global/ZSignature.vue'

export function getScrollOffset (dom: HTMLElement) {
  const res = { x: 0, y: 0 }
  return res
}

export function AsyncTeleport (
  props: {
    to: string
  },
  { slots }: SetupContext<{}>
) {
  const isDOMExist = ref(false)

  function middle (count = 0, relay = 100) {
    if (count === 10) {
      console.warn('Async Teleport Loaded Failed!')
      return
    }

    const DOM = document.querySelector(props.to)

    if (DOM === null) setTimeout(() => middle(count + 1, relay), relay)
    else isDOMExist.value = true
  }

  middle()

  return isDOMExist.value === true
    ? h(Teleport, { to: props.to }, { default: slots.default })
    : h(ZSignature, { loading: true, style: 'position: absolute; left: 1%; bottom: 10px;' })
}

AsyncTeleport.props = {
  to: {
    type: String,
    required: true
  }
}