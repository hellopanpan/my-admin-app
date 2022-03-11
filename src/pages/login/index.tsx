import React, { useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

const Index = () => {
  const getPhoneNumber = () => {}
  useEffect(() => {
    // Taro.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       Taro.request({
    //         url: 'https://test.com/onLogin',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  }, [])

  return (
    <View>
      <Text>登录</Text>
      <Button open-type="getPhoneNumber">phone</Button>
    </View>
  )
}

export default Index
