/**
 *  表单验证
 * 基于grace-ui的grace-checker进行改造
 * todo: 1. 考虑用async-validator来写
 * todo: 2. 使用示例需要更新
 * todo: 3. 垃圾代码太多，有空了改改
 * @example 
 *  定义表单规则
    const rules = [{
      name: 'name',
      checkType: 'notnull',
      errorMsg: '请输入管理员姓名'
    }, {
      name: 'mobile',
      checkType: 'phoneno',
      errorMsg: '请输入正确的手机号码'
    }]
    const fields = {
      name: 'lily', 
      mobile: 13012345678
    }
    if(checkAllWithErrToast(fields, rules)){
        console.log('验证通过')
    }else{
    }
    
    http://grace.hcoder.net/manual/info/149-70.html#gui-mlink-0
 */
import Taro from '@tarojs/taro'

type FieldRule = {
  name: string // field name
  checkType:
    | 'string'
    | 'int'
    | 'between'
    | 'betweenD'
    | 'beteeenF'
    | 'same'
    | 'notsame'
    | 'email'
    | 'phoneno'
    | 'zipcode'
    | 'reg'
    | 'in'
    | 'notnull'
    | 'ignoreCaseSame' // 忽略大小写
  // todo: add 'large' 'small'
  errorMsg: string
  checkRule?: string
}

type RuleGroup = Array<FieldRule>

const graceChecker = {
  error: '',
  // todo: check函数返回对象，包含全部校验信息
  checkAll: function (data: IanyObject, rule: RuleGroup) {
    const allError = []
    // todo: 遍历数据而不是规则
    for (let i = 0; i < rule.length; i++) {
      const theRule = rule[i]

      // todo: 为errorMsg等增加默认值
      if (!theRule.checkType) {
        throw new Error('请填写检查类型')
      }
      if (!theRule.name) {
        throw new Error('请填写校验项名称')
      }
      if (!theRule.errorMsg) {
        throw new Error('请填写错误信息')
      }

      if (!data[theRule.name]) {
        this.error = theRule.errorMsg
      }
      const oneError = this.findRuleAndCheck(data, theRule)
      if (oneError !== true) {
        allError.push({
          errMsg: oneError
        })
      }
    }
    if (allError.length === 0) {
      return true
    }
    return allError
  },
  checkOne: function (data, rules) {
    const fieldName = Object.keys(data)[0]
    const fieldValue = data[fieldName]
    const theRule = rules.find((item) => item.name === fieldName)
    const res = this.findRuleAndCheck(data, theRule)

    return res
  },

  findRuleAndCheck: function (data, theRule) {
    let reg
    let error = ''

    switch (theRule.checkType) {
      case 'string':
        reg = new RegExp('^.{' + theRule.checkRule + '}$')
        if (!reg.test(data[theRule.name])) {
          error = theRule.errorMsg
        }
        break
      case 'int':
        reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + theRule.checkRule + '}$')
        if (!reg.test(data[theRule.name])) {
          error = theRule.errorMsg
        }
        break
      case 'between':
        if (!this.isNumber(data[theRule.name])) {
          error = theRule.errorMsg
        }
        let minMax = theRule.checkRule.split(',')
        minMax[0] = Number(minMax[0])
        minMax[1] = Number(minMax[1])
        if (data[theRule.name] > minMax[1] || data[theRule.name] < minMax[0]) {
          error = theRule.errorMsg
        }
        break
      case 'betweenD':
        reg = /^-?[1-9][0-9]?$/
        if (!reg.test(data[theRule.name])) {
          error = theRule.errorMsg
        }
        minMax = theRule.checkRule.split(',')
        minMax[0] = Number(minMax[0])
        minMax[1] = Number(minMax[1])
        if (data[theRule.name] > minMax[1] || data[theRule.name] < minMax[0]) {
          error = theRule.errorMsg
        }
        break
      case 'betweenF':
        reg = /^-?[0-9][0-9]?.+[0-9]+$/
        if (!reg.test(data[theRule.name])) {
          error = theRule.errorMsg
        }
        minMax = theRule.checkRule.split(',')
        minMax[0] = Number(minMax[0])
        minMax[1] = Number(minMax[1])
        if (data[theRule.name] > minMax[1] || data[theRule.name] < minMax[0]) {
          error = theRule.errorMsg
        }
        break
      case 'same':
        if (data[theRule.name] != theRule.checkRule) {
          error = theRule.errorMsg
        }
        break
      case 'notsame':
        if (data[theRule.name] == theRule.checkRule) {
          error = theRule.errorMsg
        }
        break
      case 'ignoreCaseSame':
        const left = ('' + data[theRule.name]).toLocaleLowerCase()
        const right = ('' + theRule.checkRule).toLocaleLowerCase()
        if (left !== right) {
          error = theRule.errorMsg
        }
        break
      case 'email':
        reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!reg.test(data[theRule.name])) {
          error = theRule.errorMsg
        }
        break
      case 'phoneno':
        // 用宽松的规则：https://www.zhihu.com/question/333400359
        // reg = /^1[0-9]{10}$/
        reg = /^1[3-9]\d{9}$/
        if (!reg.test(data[theRule.name])) {
          error = theRule.errorMsg
        }
        break
      case 'zipcode':
        reg = /^[0-9]{6}$/
        if (!reg.test(data[theRule.name])) {
          error = theRule.errorMsg
        }
        break
      case 'reg':
        reg = new RegExp(theRule.checkRule)
        if (!reg.test(data[theRule.name])) {
          error = theRule.errorMsg
        }
        break
      case 'in':
        if (!theRule.checkRule.some((row) => row === data[theRule.name])) {
          error = theRule.errorMsg
        }
        break
      case 'notnull':
        // todo: 应该叫required，用于校验null, undefined
        if (data[theRule.name] == null || data[theRule.name].length < 1) {
          error = theRule.errorMsg
        }
        break
    }
    if (!error) {
      return true
    }
    return error
  },
  isNumber: function (checkVal) {
    const reg = /^-?[1-9][0-9]?.?[0-9]*$/
    return reg.test(checkVal)
  }
}

type validateFn = (
  fields: IanyObject,
  rules: RuleGroup,
  options?: IcheckOptions
) => boolean

interface IcheckOptions {
  /**
   * @description 是否一次性展示所有错误，默认为false，只展示第一项错误
   * @type {boolean}
   * @memberof IcheckOptions
   */
  isDisplayAll?: boolean
}

/**
 * @description 校验多个表单项，并用Toast展示出错误来
 * @param {*} fields
 * @param {*} rules 现在似乎和rules一一对应，TODO: 修改成非一一对应的
 * @param {*} [options={}]
 * @returns {boolean}
 */
export const checkAllWithErrToast: validateFn = (
  fields,
  rules,
  options = {}
) => {
  const checkAllRes: Array<any> | true = graceChecker.checkAll(fields, rules)
  const { isDisplayAll = false } = options
  if (checkAllRes === true) {
    return true
  } else {
    // checkAllRes.forEach((err) => {
    //   Taro.showToast({
    //     title: err.errMsg,
    //     icon: 'none'
    //   })
    // })
    const errTip: string = isDisplayAll
      ? checkAllRes.map((err) => err.errMsg).join(' \r\n')
      : checkAllRes[0].errMsg

    // todo: 开发者工具里不能换行，真机测试能换行
    Taro.showToast({
      title: errTip,
      icon: 'none'
    })
    return false
  }
}

export default graceChecker
