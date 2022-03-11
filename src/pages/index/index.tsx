import { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import { ConnectState, ConnectProps } from '../../models/connect.d'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

// interface OwnProps {
//   // 父组件要传的prop放这
//   value: number;
// }
// interface OwnState {
//   // 自己要用的state放这
// }

// type IProps = ConnectProps & OwnProps;

type PageOwnProps = {}

type IProps = ConnectProps & ConnectState & PageOwnProps

interface Page {
  props: IProps;
}

// FIXME: ts
@connect(({ counter }) => ({
  counter
}))
class Page extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    console.log(this.props, 'this.props')
  }

  componentDidHide () { }
  asyncAdd = () => {
    this.props.dispatch({
      type: 'counter/asyncAdd'
    })
  }
  asyncAddSome = () => {
    this.props.dispatch({
      type: 'counter/asyncAddSome',
      payload: {
        num: 3,
      },
    })
  }
  asyncMinus = () => {
    this.props.dispatch({
      type: 'counter/asyncMinus'
    })
  }

  render () {
    return (
      <View className='index'>
        {/* <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button> */}
        <Button className='dec_btn' onClick={this.asyncAdd}>async add</Button>
        <Button className='dec_btn' onClick={this.asyncAddSome}>async add some</Button>
        <Button className='dec_btn' onClick={this.asyncMinus}>async minus</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

export default Page

