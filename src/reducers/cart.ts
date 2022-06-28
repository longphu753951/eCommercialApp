import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import API from "config/API";
import { Alert } from "react-native";
import { createRoutine } from "redux-saga-routines";
import { put, all, takeLatest, ca, call } from "redux-saga/effects";
import { loginRoutine, signupRoutine, logoutRoutine } from "./auth";

interface cartState {
  cart: any;
}
// =========================================================
// =========================================================
// TYPES

export const getCartRoutine = createRoutine("CART/GET_CART");
export const addToCartRoutine = createRoutine("CART/ADD_TO_CART");

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

    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

function* addToCartSaga(action: any): Promise<void> {
    console.log(action);
  try {
    const data = yield call(axios.postWithAuth, API.ADD_TO_CART, action.data);
    yield put({
      type: addToCartRoutine.SUCCESS,
      payload: data,
    });

    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

export function* cartSaga() {
  yield all([
    takeLatest(getCartRoutine.TRIGGER, getCartSaga),
    takeLatest(addToCartRoutine.TRIGGER, addToCartSaga),
  ]);
}

// =========================================================
// =========================================================
// REDUCER

const INITIAL_STATE: cartState = {
  cart: null,
};

export default createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(getCartRoutine.SUCCESS, (state, action) => {
      state.cart = action.payload[0];
    })
    .addCase(addToCartRoutine.SUCCESS, (state, action) => {
        console.log(action.payload);
      state.cart = action.payload;
    });
});
