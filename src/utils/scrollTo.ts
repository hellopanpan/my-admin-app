/*
 * @Description: 页面滚动到某id所属dom
 */
import Taro from '@tarojs/taro'

const scrollTo = (id: string, cb: (p: any) => void) => {
  if (id) {
    const query = Taro.createSelectorQuery()
    query.selectViewport().scrollOffset()
    query.select(`#${id}`).boundingClientRect()
    query.exec(res => {
      try {
        Taro.pageScrollTo({
          scrollTop: res[0].scrollTop + res[1].top,
          duration: 100,
          complete: cb
        })
      } catch (err) {
        console.log(err)
      }
    })
  } else {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 100,
      complete: cb
    })
  }
}
export default scrollTo
