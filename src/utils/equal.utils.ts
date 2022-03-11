export function isArrayEqual(a: Array<any>, b: Array<any>): boolean {
  // 判断数组的长度
  if (a.length !== b.length) {
    return false
  } else {
    // 循环遍历数组的值进行比较
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false
      }
    }
    return true
  }
}

export function isNumArrayEqual(a: Array<number>, b: Array<number>): boolean {
  const sortedA = [...a].sort((x, y) => x - y)
  const sortedB = [...b].sort((x, y) => x - y)
  return isArrayEqual(sortedA, sortedB)
}
