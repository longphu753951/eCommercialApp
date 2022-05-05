import { all } from "redux-saga/effects";
import auth, { authSaga, loginSaga } from "reducers/auth";
import item, { itemSaga } from "reducers/item";

export default {
  auth,
  item,
};

export function* rootSaga() {
  yield all([
    authSaga(), 
    itemSaga()]);
}
