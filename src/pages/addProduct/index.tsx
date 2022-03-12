import { View, Text } from '@tarojs/components'
import React from 'react'
import { AtButton, AtIcon, AtList, AtListItem } from 'taro-ui'

const AddProduct: React.FC<{}> = () => {
  const handleClick = (e, e2) => {
    console.log(e, e2)
  }
  return (
    <View>
      <AtButton type="primary">
        <Text>AddProduct</Text>
        <AtIcon value="add" size="30" color="#000"></AtIcon>
      </AtButton>
      <AtList>
        <AtListItem
          title="标题文字"
          arrow="right"
          extraText={'1'}
          onClick={(e) => handleClick('1111', e)}
        />
      </AtList>
    </View>
  )
}

export default AddProduct
