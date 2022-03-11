import { AnyAction } from 'redux';
import { CounterModelState } from './counter';
import { CommonModelState } from './common';
import { Dispatch } from 'dva-core';
export {
  CounterModelState,
  CommonModelState,
};

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    counter?: boolean;
    common?: boolean;
  };
}

export interface ConnectState {
  counter: CounterModelState;
  common: CommonModelState;
  loading: Loading;
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps {
  dispatch?: Dispatch<AnyAction>;
}
