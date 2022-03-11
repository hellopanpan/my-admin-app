declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.styl'

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV:
      | 'weapp'
      | 'swan'
      | 'alipay'
      | 'h5'
      | 'rn'
      | 'tt'
      | 'quickapp'
      | 'qq'
    [key: string]: any
  }
}

/**
 * @description 文件类型
 * @interface Ifile
 */
interface Ifile {
  url: string
}

interface IresData {
  /**
   * @description 后端定义的错误码
   *  451: 图形验证码错误？
   *  452: 无权限
   *  500: 服务器内部错误，比较大的可能是后端的问题
   *  553: 公司全名重复
   * @type {number}
   * @memberof IresData
   */
  code: number
  data: any
  msg: string
  /**
   * 400时有以下字段
   */
  status?: number
  errors?: Array<any>
}

// todo: 让后端统一一下接口返回值的格式，不要有的直接塞jwt有的是{code: 200, data: xxx}，统一成后面这种
/**
 * @description 一般情况下来自后端接口的返回值类型
 * @interface ResType
 */
interface ResType {
  /**
   * @description 200 | 401 | 502
   * @type {number}
   * @memberof ResType
   */
  statusCode: number
  header: any
  errMsg: string
  cookies?: Array<string>
  data: IresData
}

/**
 * @description 请求的配置项
 * @interface IrequestOptions
 */
interface IrequestOptions {
  /**
   * 不展示默认的错误弹窗
   */
  noErrToast?: boolean
  /**
   * @description 以Modal形式展示错误（默认为Toast）
   * @type {boolean}
   * @memberof IrequestOptions
   */
  displayErrAsModal?: boolean
  /**
   * 获取未被处理过的返回值信息，即ResType类型的，而非ResType.data类型的
   */
  origin?: boolean
  /**
   * 不携带token发起请求
   */
  noLoginToken?: boolean
  /**
   * @description 新的baseUrl
   * @type {string}
   * @memberof IrequestOptions
   */
  baseUrl?: string
  /**
   * @description 如果res: ResType的statusCode===200，则直接resolve(res.data)
   * @type {boolean}
   * @memberof IrequestOptions
   */
  getData?: boolean
}

/**
 * request方法可能的返回值类型
 */
type RequestRes = ResType | IresData | any

/**
 * @description 所有可能的权限值
 *   90主机构负责人;80主机构管理员;20门店负责人;10门店管理员;2经纪人
 */
type AuthNumber = 90 | 80 | 20 | 10 | 2

type TrenderJsx = JSX.Element | (() => JSX.Element)

/**
 * @description 后端返回的分页列表，通用格式
 * @interface IpagedListRes
 * @template T
 */
interface IpagedListRes<T> {
  currentPage: number
  hasNext: boolean
  list: Array<T>
  pageSize: number
  totalCount: number
  totalPage: number
}

/**
 * @description 分页列表共有的state
 * @interface IpagedListState
 */
interface IpagedListState {
  currentPage: number
  hasNext: boolean
}

interface IanyObject {
  [key: string]: any
}

/* -------------------------- 修复Taro中错误的、没有列出的类型声明 -------------------------- */

declare namespace Taro {
  interface ComponentOptions {
    /**
     * @description
     * @type {boolean}
     * @default false
     */
    virtualHost?: boolean
  }
}

/* -------------------------- 修复Taro中错误的、没有列出的类型声明 -------------------------- */
