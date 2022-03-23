import { all } from 'redux-saga/effects';
import auth, { authSaga } from 'reducers/auth';

export default {
    auth,
  };
  
  export function* rootSaga() {
    yield all([
      authSaga(),
    ]);
  }
  