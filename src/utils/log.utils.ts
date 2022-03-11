import chalk from 'chalk'

interface IresponseParams {
  res: any
  status: 'success' | 'fail'
}

/**
 * @description 以优雅的console.group形式打印请求参数和请求结果
 * @param {Taro.request.Option<IanyObject>} options
 * @param {IresponseParams} response
 * todo: 该代码是从线上展厅小程序复制过来的，后面可以考虑做个公共库？
 */
// eslint-disable-next-line import/prefer-default-export
export const consoleReqGroup = (
  options: Taro.request.Option<IanyObject>,
  response: IresponseParams
): void => {
  // const canUseGroup = true
  // try {
  //   console.log('vConsole', vConsole)
  //   canUseGroup = !!vConsole
  // } catch (err) {
  //   console.log('vConsole', err)
  //   canUseGroup = true
  // }
  // if (canUseGroup) {
  //   console.groupCollapsed(`${options.method} url: ${options.url} `)
  // } else {
  //   console.log('-----------------------------------')
  //   console.log(`${options.method} url: ${options.url} `)
  // }

  // WARN: 小程序的vconsole不支持console.group，故先用这样的格式来打印
  console.groupCollapsed(`${options.method} url: ${options.url} `)
  console.log('-----------------------------------')
  console.log(`${options.method} url: ${options.url} `)

  console.log(`params: ${JSON.stringify(options.data)}`)
  options.header &&
    Object.keys(options.header).length &&
    console.log(`header: ${JSON.stringify(options.header)}`)
  if (response.status === 'success') {
    // todo: chalk not working?
    console.log(`${chalk.green(response.status)}:`, response.res)
  } else {
    console.log(`${chalk.red(response.status)}:`, response.res)
  }

  // if (canUseGroup) {
  //   console.log('-----------------------------------')
  //   console.groupEnd()
  // } else {
  //   console.log('-----------------------------------')
  // }
  // WARN: 小程序的vconsole不支持console.group，故先用这样的格式来打印
  console.log('-----------------------------------')
  console.groupEnd()
}
