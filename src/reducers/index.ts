import { all } from "redux-saga/effects";
import auth, { authSaga } from "reducers/auth";
import item, { itemSaga } from "reducers/item";
import user, { userSaga } from "reducers/user";
import payment,{ paymentSaga } from "reducers/payment";
import cart, {cartSaga} from "reducers/cart";
import { combineReducers } from "redux";


const rootReducer =  combineReducers({
  auth,
  item,
  cart,
  user,
  payment
});

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([authSaga(), itemSaga(), userSaga(), paymentSaga(), cartSaga()]);
}

export default rootReducer;