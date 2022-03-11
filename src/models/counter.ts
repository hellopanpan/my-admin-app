import { Effect, Reducer } from 'dva-core'

import { delay } from '../utils/asyncUtils'

export type CounterModelState = {
  num: number;
};

export type CounterModelType = {
  namespace: 'counter';
  state: CounterModelState;
  effects: {
    asyncAdd: Effect;
    asyncAddSome: Effect;
    asyncMinus: Effect;
  };
  reducers: {
    changeState: Reducer<CounterModelState>;
  };
};

const CounterModel: CounterModelType = {
  namespace: 'counter',
  state: {
    num: 0,
  },
  effects: { 
    *asyncAdd(_, { call, put, select }) {
      const prevNum = yield select((state: any) => state.counter.num)
      yield call(delay)
      yield put({
        type: 'changeState',
        payload: {
          num: prevNum + 1,
        },
      })
    },
    *asyncAddSome({ payload }, { call, put, select }) {
      const prevNum = yield select((state: any) => state.counter.num)
      yield call(delay)
      yield put({
        type: 'changeState',
        payload: {
          num: payload.num + prevNum,
        },
      })
    },
    *asyncMinus(_, { call, put, select }) {
      const prevNum = yield select((state: any) => state.counter.num)
      yield call(delay)
      yield put({
        type: 'changeState',
        payload: {
          num: prevNum - 1,
        },
      })
    },
  },

  reducers: {
    changeState( state, { payload }) {
      const res = { ...state, ...payload }
      console.log(state, payload, 'payload', res)
      return res
    },
  },
};

export default CounterModel