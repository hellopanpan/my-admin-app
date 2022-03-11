export default {
  networkTimeout: {
    request: 10000, // ms
    uploadFile: 10000 // 防止上传大图片时耗时太久影响用户体验
  },
  pages: ['pages/index/index', 'pages/login/index', 'pages/mine/index'],
  // subPackages: [
  //   {
  //     root: 'pages/common/',
  //     pages: [
  //       'city/index'
  //     ]
  //   },
  // ],
  tabBar: {
    borderStyle: 'black',
    backgroundColor: '#fff',
    color: '#999',
    selectedColor: '#FD5544',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/img/tabbar/index.png',
        selectedIconPath: './assets/img/tabbar/index_active.png'
      },
      {
        pagePath: 'pages/login/index',
        text: '我的',
        iconPath: './assets/img/tabbar/mine.png',
        selectedIconPath: './assets/img/tabbar/mine_active.png'
      }
    ]
  },
  window: {
    // ‘dark’使得下拉刷新的动画在白色背景下可见
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'

    // enablePullDownRefresh: true
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序展示'
    }
  }
}
