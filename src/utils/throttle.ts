interface IThrottoleOptions {
  leading?: boolean
  trailing?: boolean
}

export function throttle(
  func,
  wait = 100,
  options: IThrottoleOptions = {}
): any {
  const { leading, trailing } = options
  let timeout = null
  let previous = 0
  let result
  const throttled = function() {
    const now = +new Date()
    if (!previous && leading === false) previous = now
    const remaining = wait - (now - previous)
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(this, arguments)
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(() => {
        timeout = null
        previous = leading === false ? 0 : +new Date()
        result = func.apply(this, arguments)
      }, remaining)
    }
    return result
  }
  throttled.cancel = function() {
    clearTimeout(timeout)
    timeout = null
    previous = 0
  }
  return throttled
}

export function debounce(func, wait: number, immediate?: boolean) {
  let timeout
  let result
  const debounced = function() {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      if (!timeout) result = func.apply(this, arguments)
      timeout = setTimeout(() => (timeout = null), wait)
    } else {
      timeout = setTimeout(() => {
        timeout = null
        result = func.apply(this, arguments)
      }, wait)
    }
    return result
  }
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}
