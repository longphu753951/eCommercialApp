import { all } from "redux-saga/effects";
import auth, { authSaga } from "reducers/auth";
import item, { itemSaga } from "reducers/item";
import user, { userSaga } from "reducers/user";
import payment,{ paymentSaga } from "reducers/payment";
import { combineReducers } from "redux";

export default combineReducers({
  auth,
  item,
  user,
  payment
});

export function* rootSaga() {
  yield all([authSaga(), itemSaga(), userSaga(), paymentSaga()]);
}
