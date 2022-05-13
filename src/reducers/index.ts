import { all } from "redux-saga/effects";
import auth, { authSaga } from "reducers/auth";
import item, { itemSaga } from "reducers/item";
import user, {userSaga} from "reducers/user";
import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  item,
  user
});

export function* rootSaga() {
  yield all([
    authSaga(), 
    itemSaga(),
    userSaga()
  ]);
}
