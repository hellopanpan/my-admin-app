import Taro from '@tarojs/taro'
import { baseUrl } from '@/env'
import Constants from '@/constants'
import Utils from '@/utils'
import { consoleReqGroup } from './log.utils'

function request(
  url: string,
  data: IanyObject = {},
  method: keyof Taro.request.method = 'GET',
  options: IrequestOptions = {}
): Promise<RequestRes> {
  const {
    noErrToast = false,
    displayErrAsModal = false,
    origin = false,
    noLoginToken = false,
    baseUrl: newBaseUrl,
    getData = false
  } = options
  const header: IanyObject = {
    'Content-Type': 'application/json'
  }
  const finalBaseUrl: string = newBaseUrl || baseUrl

  // 下面这行很有用
  Utils.Formatter.removeGenericEmpty(data)

  /* --start 从storage里获取Token并放入header中 */
  const userInfo = Taro.getStorageSync(Constants.Storage.USER)
  const loginToken = userInfo && userInfo.jwt
  if (loginToken && !noLoginToken) {
    header.Token = loginToken
  }
  /* --end   从storage里获取Token并放入header中 */

  /* --start 按接口特性，当为GET请求时，处理data中的数组类型 */
  if (method.toLowerCase() === 'get') {
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Array) {
        // [1,2] => 1,2
        data[key] = value.toString()
      }
    }
  }
  /* --end 按接口特性，当为GET请求时，处理data中的数组类型 */

  const finalUrl = /(https?:)?\/\//.test(url) ? url : `${finalBaseUrl}${url}`

  return new Promise(function (resolve, reject) {
    Taro.request({
      url: finalUrl,
      data,
      method,
      header,
      success(res: ResType) {
        consoleReqGroup(
          {
            method,
            url: finalUrl,
            data,
            header
          },
          {
            res,
            status: 'success'
          }
        )

        if (origin) {
          resolve(res)
          return
        }

        // 未携带token去请求需要token的接口
        if (res.statusCode === 401) {
          reject(res)
          return
        }

        if (res.statusCode === 502) {
          Taro.showToast({
            title: '服务器可能在部署中...',
            icon: 'none'
          })
          reject(res)
          return
        }

        if (res.data.code === 500) {
          Taro.showToast({
            title: '似乎出了点问题',
            icon: 'none'
          })
          reject(res.data.msg)
          return
        }

        // 可以考虑移动这部分代码到工具函数confirmLoginStatus
        if (res.data.code === 5501) {
          Taro.showToast({
            title: '登录已失效，请重新登录',
            icon: 'none'
          })
          // 移除token信息
          Taro.removeStorageSync(Constants.Storage.USER)

          Utils.Router.redirectToLogin()
          // 不reject了
          return
        }

        // 接口完善后可以去掉
        if (res.data.status === 400) {
          console.log(`400 resp: `, res.data.errors)
          // 处理表单校验失败时的错误
          const errMsgs = Array.isArray(res.data.errors)
            ? res.data.errors.map((err) => err.defaultMessage).join('\r\n')
            : '请输入正确的信息'
          Taro.showToast({
            title: errMsgs,
            icon: 'none'
          })
          reject(res.data)
          return
        }

        /* 无权限，452，不展示errToast，在此处统一处理 */
        if (res.data.code === 452) {
          reject(res.data.msg)
          return
        }

        if (res.data.code !== 200) {
          if (!noErrToast) {
            if (displayErrAsModal) {
              Taro.showModal({
                content: res.data.msg || '网络错误',
                confirmText: '我知道了',
                showCancel: false
              })
            } else {
              Taro.showToast({
                title: res.data.msg || '网络错误',
                icon: 'none',
                duration: 2500
              })
            }
          }
        }

        if (getData) {
          resolve(res.data)
          return
        }

        if (res.data.code === 200) {
          // console.log(`resp: `, res.data.data)
          resolve(res.data.data)
          return
        }

        reject(res.data.msg)
      },
      fail(err) {
        consoleReqGroup(
          {
            method,
            url: finalUrl,
            data,
            header
          },
          {
            res: err,
            status: 'fail'
          }
        )

        // todo: 该判断方式可能有问题
        if (err.errMsg === 'request:fail timeout') {
          Taro.showToast({
            title: '网络超时',
            icon: 'none'
          })
          // todo: 在这里return可能有问题
          reject(err.errMsg)
          return
        }

        // todo: 等微信官方出错误信息的文档后，换成根据err code来判断
        if (
          typeof err.errMsg === 'string' &&
          err.errMsg.startsWith('request:fail')
        ) {
          Taro.showToast({
            title: '网络开小差了...',
            icon: 'none'
          })
          // todo: 错误日志收集
          reject(err.errMsg)
          return
        }

        if (!noErrToast) {
          if (displayErrAsModal) {
            Taro.showModal({
              title: '错误',
              content: err.errMsg || '网络错误',
              confirmText: '我知道了',
              showCancel: false
            })
          } else {
            Taro.showToast({
              title: err.errMsg || '网络错误',
              icon: 'none'
            })
          }
        }

        reject(err)
      }
    })
  })
}

request.get = (url, data = {}, options: IrequestOptions = {}) => {
  return request(url, data, 'GET', options)
}

request.post = (url, data = {}, options: IrequestOptions = {}) => {
  return request(url, data, 'POST', options)
}

request.getOrigin = (url, data?: any) => {
  return request(url, data, 'GET', { origin: true })
}

export default request
