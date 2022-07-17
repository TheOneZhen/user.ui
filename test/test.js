function debounce (fn, delay) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(context, args), delay)
  }
}

function throttle (fn, threshhold) {
  let timeout = null
  let start = new Date()
  threshhold = threshhold || 160
  return function () {
    const context = this
    const args = arguments
    const currentDate = new Date() - 0
    clearTimeout(timeout)
    if (currentDate - start >= threshhold) {
      fn.apply(context, args)
      start = currentDate
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args)
      }, threshhold)
    }
  }
}