/**
 * @description
 * @param {(string | number)} mobile
 * @returns
 * @example
 *  secertMobile('13012345678')
 *  > 130****5678
 */
export const secertMobile: (mobile: string | number) => string = (
  mobile: string | number
) => {
  const strMobile = '' + mobile
  return `${strMobile.slice(0, 3)}****${strMobile.slice(-4)}`
}

/**
 * @description 移除对象中的null, undefined
 * @param {*} obj
 */
export const removeGenericEmpty = (obj: object) => {
  for (const [key, value] of Object.entries(obj)) {
    if ([null, undefined].includes(value)) {
      delete obj[key]
    }
  }
}
