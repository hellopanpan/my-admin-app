/**
 * @description
 *   判断是否为null, undefined, ''
 *   常用于表单校验
 * @export
 * @param {*} item
 * @returns {boolean}
 */
export function isEmpty(item: any): boolean {
  if (item === null || typeof item === 'undefined' || item === '') return true
  return false
}

/**
 * @description
 *  判断传入的数组里是否有某一个元素为empty
 *  常用于表单校验
 * @export
 * @param {Array<any>} arr
 * @returns {boolean}
 */
export function hasEmpty(arr: Array<any>): boolean {
  return arr.some(item => isEmpty(item))
}
