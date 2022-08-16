import auth from "reducers/auth";
import item from "reducers/item";
import user from "reducers/user";
import payment from "reducers/payment";
import cart from "reducers/cart";
import { combineReducers } from "redux";
import {firebaseReducer} from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer =  combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth,
  item,
  cart,
  user,
  payment
});

// export type RootState = ReturnType<typeof rootReducer>

// export function* rootSaga() {
//   yield all([authSaga(), itemSaga(), userSaga(), paymentSaga(), cartSaga()]);
// }

export default rootReducer;