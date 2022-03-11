/*
 * @Description:
 *   目前生产环境的服务器还没有部署后端服务
 *    故先用下面的测试地址来build
 *    以方便打包过程能进行压缩（taro的一点限制=> 没有设置NODE_ENV的入口）
 */
import { Tenv } from './env.d'

// todo: 把项目中所有的baseURL都提取到这个文件，并在上线前配置好
export const isProd = process.env.NODE_ENV === 'production'

// FIXME: 上线前把这个地址换成prod
export const env: Tenv = 'prod'

// eslint-disable-next-line import/no-mutable-exports
export let baseUrl: string
// eslint-disable-next-line import/no-mutable-exports
export let focusLoginBaseUrl: string

switch (env as Tenv) {
  case 'test':
    baseUrl = 'http://xxx.focus-test.cn'
    focusLoginBaseUrl = 'http://login.focus-test.cn'
    break

  case 'prod':
    baseUrl = 'https://xxx.focus.cn'
    focusLoginBaseUrl = 'https://login.focus.cn'
    break

  case 'auto':
  default:
    baseUrl = isProd ? 'https://xxx.focus.cn' : 'http://xxx.focus-test.cn'
    focusLoginBaseUrl = isProd
      ? 'https://login.focus.cn'
      : 'http://login.focus-test.cn'
    break
}
