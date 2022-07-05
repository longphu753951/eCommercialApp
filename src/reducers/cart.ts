import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import API from "config/API";
import { Alert } from "react-native";
import { createRoutine } from "redux-saga-routines";
import { put, all, takeLatest, ca, call } from "redux-saga/effects";
import { loginRoutine, signupRoutine, logoutRoutine } from "./auth";

interface cartState {
  cart: any;
  loading: boolean;
  message: '';
  shippingType: object;
}
// =========================================================
// =========================================================
// TYPES

export const getCartRoutine = createRoutine("CART/GET_CART");
export const addToCartRoutine = createRoutine("CART/ADD_TO_CART");
export const deleteToCartRoutine = createRoutine("CART/DELETE_TO_CART");
export const updateQuantityRoutine = createRoutine("CART/UPDATE_QUANTITY");
export const setPaymentRoutine = createRoutine("CART/SET_PAYMENT");
export const setShippingTypeRoutine = createRoutine("CART/SET_SHIPPING_TYPE");

// =========================================================
// =========================================================
// SAGAS

function* getCartSaga(action: any): Promise<void> {
  try {
    const data = yield call(axios.getWithAuth, API.GET_CART);
    yield put({
      type: getCartRoutine.SUCCESS,
      payload: data,
    });

  } catch (e) {
    console.log(e);
  }
}

function* addToCartSaga(action: any): Promise<void> {

  try {
    const data = yield call(axios.postWithAuth, API.ADD_TO_CART, action.data);
    yield put({
      type: addToCartRoutine.SUCCESS,
      payload: data,
    });

  } catch (e) {
    yield put({
      type: addToCartRoutine.FAILURE,
      payload: {
        errorMessage: e.response.data
      },
    });
  }
}

function* setPaymentSaga(action: any): Promise<void> {

  try {
    const data = yield call(axios.postWithAuth, API.SET_PAYMENT, action.data);
    yield put({
      type: setPaymentRoutine.SUCCESS,
      payload: data,
    });

  } catch (e) {
    console.log(e);
  }
}

function* deleteToCartSaga(action: any): Promise<void> {
  const url = API.DELETE_TO_CART.replace("id", action.data.id);
  try {
    const data = yield call(axios.deleteWithAuth, url);
    yield put({
      type: deleteToCartRoutine.SUCCESS,
      payload: {
        total: data,
        removedItem: action.data,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

function* updateQuantitySaga(action: any): Promise<void> {
  const url = API.UPDATE_QUANTITY.replace("id", action.data.id);
  try {
    const data = yield call(axios.putWithAuth, url, {'quantity': action.data.quantity});
    data["order_detail_id"] = action.data.id;
    data["new_quantity"] = action.data.quantity
    yield put({
      type: updateQuantityRoutine.SUCCESS,
      payload: data
    });
  } catch (e) {
    console.log(e);
  }
}

export function* cartSaga() {
  yield all([
    takeLatest(getCartRoutine.TRIGGER, getCartSaga),
    takeLatest(addToCartRoutine.TRIGGER, addToCartSaga),
    takeLatest(deleteToCartRoutine.TRIGGER, deleteToCartSaga),
    takeLatest(updateQuantityRoutine.TRIGGER, updateQuantitySaga),
    takeLatest(setPaymentRoutine.TRIGGER,setPaymentSaga)
  ]);
}

// =========================================================
// =========================================================
// REDUCER

const INITIAL_STATE: cartState = {
  cart: null,
  loading: false,
  message: '',
  shippingType: {},
};

export default createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(getCartRoutine.SUCCESS, (state, action) => {
      console.log(action.payload)
      state.cart = action.payload;
    })
    .addCase(addToCartRoutine.TRIGGER, (state, action) => {
      state.loading = true;
      state.message= '';
    })
    .addCase(addToCartRoutine.FULFILL, (state) => {
      state.message= '';
    })
    .addCase(addToCartRoutine.SUCCESS, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.message = 'Item has been added';
    })
    .addCase(addToCartRoutine.FAILURE, (state, action) => {
      state.loading = false;
      state.message = action.payload.errorMessage;
    })
    .addCase(deleteToCartRoutine.SUCCESS, (state, action) => {
      
      state.cart.total = action.payload.total;
      state.cart.order_details.splice(
        state.cart.order_details.findIndex(
          (x) => x.id === action.payload.removedItem
        ),
        1
      );
    })
    .addCase(updateQuantityRoutine.SUCCESS, (state, action) => {
      state.cart.total = action.payload.order_total;
      state.cart.order_details.map(x => {
        if(x.id == action.payload.order_detail_id) {
          x.final_price = action.payload.total_price_item
          x.quantity = action.payload.new_quantity
        }
      })
    })
    .addCase(setPaymentRoutine.TRIGGER, (state) => {
      state.loading = true;
    })
    .addCase(setPaymentRoutine.SUCCESS, (state) => {
      state.loading = false;
    })
    .addCase(setShippingTypeRoutine.TRIGGER, (state, action) => {
      state.shippingType = action.data.shippingType;
    })
    ;
});
