import React, { useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'

const Index: React.FC<{}> = () => {
  const getPhoneNumber = (e) => {
    console.log(e.detail)
    Taro.showToast({ title: '登录成功' })
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }
  useEffect(() => {
    Taro.login({
      success: function (res) {
        console.log('res', res)
        if (res.code) {
          //发起网络请求
          Taro.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }, [])

  return (
    <View>
      <Text>登录2</Text>
      <Button open-type="getPhoneNumber" onGetPhoneNumber={getPhoneNumber}>
        phone
      </Button>
    </View>
  )
}

export default Index
