import { call } from "redux-saga/effects";

export const sagaPromiseHelper = (innerSaga: any) => {
  return function* innerFunction(action) {
      console.log(action)
    try {
      const data = yield call(innerSaga, action.payload || {});
      if (action.resolve) {
        action.resolve(data);
      }
    } catch (e) {
      if (action.reject) {
        action.reject(e);
      }
    }
  };
};
