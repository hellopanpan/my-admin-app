import Taro from '@tarojs/taro'
import store from '@/store'
import actionTypes from '@/constants/actionTypes'

/**
 * @description 小程序的page
 * @interface Ipage
 */
interface Ipage {
  route: string
}

/**
 * @description 获取当前页面的路由信息
 * @returns
 * @todo 返回页面参数
 */
const getCurrentRoute: () => string = () => {
  const pages: Array<Ipage> = Taro.getCurrentPages()
  const lastIndex = pages.length - 1
  const currentPage = pages[lastIndex]
  if (!currentPage) {
    // 处理刚进APP，路由为空的情况
    return '/pages/index/index'
  }
  return `/${currentPage.route}`
}

// FIXME: 路由带参数的时候会有问题吧？
const redirectToLogin: () => void = () => {
  store.dispatch({ type: actionTypes.User.RESET_USER })
  const currentRoute = getCurrentRoute()
  console.log('currentRoute', currentRoute)
  Taro.redirectTo({
    url: `/pages/login/index/index?from=${currentRoute}`
  })
}

const getQuery: <T extends Record<string, string>>() => T = () => {
  // todo: issue for uni-app for the options
  const routerHistory = Taro.getCurrentPages()
  return routerHistory[routerHistory.length - 1].options
}

const routerUtils = {
  getCurrentRoute,
  redirectToLogin,
  getQuery
}

export default routerUtils
