import * as Formatter from './formatter'
import { throttle, debounce } from './throttle'
import uuid from './uuid'
import Router from './routerUtils'
import * as Validator from './validator'
import Async from './asyncUtils'
import * as Copy from './copy'
import Str from './stringUtils'
import * as Types from './type.utils'
import * as Equal from './equal.utils'

const Utils = {

  Formatter,
  Validator,
  throttle,
  debounce,
  Async,
  Router,
  uuid,
  Copy,
  Str,
  Types,
  Equal
}

export default Utils
export { default as request } from './request'
