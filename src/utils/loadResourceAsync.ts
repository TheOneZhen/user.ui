/** 这里需要进一步确定参数，以保持视觉性流程渲染 */
export function loadImageAsync (src: string) {
  return new Promise<VNode>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(h('img', { src }))
    image.onerror = () => reject(new Error(`Loaded Failed! The src is: ${src}`))
    image.src = src
  })
}

export function loadVideoAsync (src: string) {
  return new Promise<VNode>((resolve, reject) => {
    const video = document.createElement('video')
    video.onload = () => resolve(h('video', { src }))
    video.onerror = () => reject(new Error(`Loaded Failed! The src is: ${src}! Resource Type: video!`))
    video.src = src
  })
}