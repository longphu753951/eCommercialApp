import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import API from "config/API";
import { Card } from "config/types";
import _ from "lodash";

interface paymentState {
  stripe_customer: any;
  payment_list: Card[];
  loading: string;
}

// =========================================================
// =========================================================
// TYPES

export const getAllPaymentMethod = createRoutine(
  "PAYMENT/GET_ALL_PAYMENT_METHOD"
);

export const updateDefaultPaymentMethod = createRoutine(
  "PAYMENT/UPDATE_DEFAULT_PAYMENT"
);

export const addNewPaymentMethod = createRoutine("PAYMENT/ADD_NEW_PAYMENT");

// =========================================================
// =========================================================
// SAGAS

function* getPaymentMethodSaga(): Promise<void> {
  try {
    const { cardListResponse, stripeCustomerResponse } = yield all({
      cardListResponse: yield call(
        axios.getWithAuth,
        API.GET_ALL_PAYMENT_METHOD
      ),
      stripeCustomerResponse: yield call(
        axios.getWithAuth,
        API.GET_STRIPE_CUSTOMER
      ),
    });

    yield put({
      type: getAllPaymentMethod.SUCCESS,
      payload: { cardListResponse, stripeCustomerResponse },
    });
  } catch (e) {
    console.log(e);
  }
}

function* updateDefaultPaymentSaga(action: any): Promise<void> {
  try {
    const register = action.data;
    const response = yield call(axios.putWithAuth, API.UPDATE_DEFAULT_PAYMENT, {
      card_id: register,
    });
    yield put({
      type: updateDefaultPaymentMethod.SUCCESS,
      payload: response,
    });
  } catch (e) {
    console.log(e);
  }
}

function* addNewPaymentMethodSaga(action: any): Promise<void> {
  
  const data = action.data;
  try {
    const response = yield call(axios.postWithAuth, API.ADD_NEW_PAYMENT, {
      cardDetail: data,
    });
    yield put({
      type: addNewPaymentMethod.SUCCESS,
      payload: response,
    });
  } catch (e) {
    console.log(e);
  }
}

export function* paymentSaga() {
  yield all([
    takeLatest(addNewPaymentMethod.TRIGGER, addNewPaymentMethodSaga),
    takeLatest(getAllPaymentMethod.TRIGGER, getPaymentMethodSaga),
    takeLatest(updateDefaultPaymentMethod.TRIGGER, updateDefaultPaymentSaga),
  ]);
}

const INITIAL_STATE: paymentState = {
  payment_list: [],
  loading: "",
  stripe_customer: {},
};

// =========================================================
// =========================================================
// REDUCER

export default createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(getAllPaymentMethod.SUCCESS, (state, action) => {
      state.payment_list = action.payload.cardListResponse.data;
      state.stripe_customer = action.payload.stripeCustomerResponse;
    })
    .addCase(updateDefaultPaymentMethod.SUCCESS, (state, action) => {
      state.stripe_customer = action.payload;
    });
});
