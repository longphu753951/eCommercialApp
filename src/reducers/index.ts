import { all } from 'redux-saga/effects';
import auth, { authSaga } from 'reducers/auth';
import category, {categorySaga} from 'reducers/category';
import { combineReducers } from 'redux'

export default {
    auth,
    category
  };
  
  export function* rootSaga() {
    yield all([
      authSaga(),
      categorySaga()
    ]);
  }
  