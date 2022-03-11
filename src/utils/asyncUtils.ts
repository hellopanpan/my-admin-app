type DelayFn = (time: number) => Promise<undefined>

export const delay: DelayFn = (time = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export default {
  delay
}
