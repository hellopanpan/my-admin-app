/**
 * @description 用于拼接字符串
 * @example
 *   pieceStr('foo', { bar: true }); // => 'foo bar'
 *   用法和classnames这个第三方包一样
 *   https://www.npmjs.com/package/classnames
 * @param {*} rest
 * @returns
 * todo: 写测试代码
 */
const pieceStr = (...rest) => {
  let piecedStr = ''
  rest.forEach(item => {
    if (typeof item === 'string') {
      piecedStr += item
    } else if (typeof item === 'object' && item !== null) {
      for (const [key, value] of Object.entries(item)) {
        if (value === true) {
          piecedStr += key
        }
      }
      piecedStr
    }
  })

  return piecedStr
}

export default { pieceStr }
