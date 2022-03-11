import { Component } from 'react'
import { connect } from 'react-redux'
import { View } from '@tarojs/components'
import { ConnectState, ConnectProps } from '../../models/connect.d'

type PageOwnProps = {}

type IProps = ConnectProps & ConnectState & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({ common }) => ({
  accessToken: common.accessToken,
}))
class Index extends Component {
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  async componentDidShow () {
    const res = await this.props.dispatch({
      type: 'common/saveStorageSync',
      payload: {
        accessToken: '1234',
        isSubscribe: false,
      },
    })
    console.log('res', res)
   }

  componentDidHide () { }

  render () {
    return (
      <View className='mine'>
        我的
      </View>
    )
  }
}

export default Index

