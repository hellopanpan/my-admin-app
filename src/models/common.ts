import Taro from '@tarojs/taro';

import { Effect, Reducer } from 'dva-core'

export type CommonModelState = {
  accessToken: string;
  isSubscribe: boolean;
};

export type CommonModelType = {
  namespace: 'common';
  state: CommonModelState;
  effects: {
    saveStorageSync: Effect;
  };
  reducers: {
    save: Reducer<CommonModelState>;
  };
};
const Common: CommonModelType = {
  namespace: 'common',
  state: {
    accessToken: Taro.getStorageSync('accessToken') || '',
    isSubscribe: !!Taro.getStorageSync('isSubscribe'),
  },

  effects: { 
    *saveStorageSync({ payload, cb }, { call, put }) {
      for (let index = 0; index <  Object.keys(payload).length; index++) {
        yield call(Taro.setStorage, {
          key: Object.keys(payload)[index],
          data: payload[Object.keys(payload)[index]]
        });
      }
      cb && cb();
      return yield put({
        type: 'save',
        payload,
      })
    },
  },

  reducers: {
    save( state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Common