import { all } from "redux-saga/effects";
import auth, { authSaga } from "reducers/auth";
import item, { itemSaga } from "reducers/item";
import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  item,
});

export function* rootSaga() {
  yield all([
    authSaga(), 
    itemSaga()]);
}
