import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import API from "config/API";
import { Card } from "config/types";
import _ from "lodash";

interface paymentState {
  payment_list: Card[];
  loading: string;
}

// =========================================================
// =========================================================
// TYPES

export const getAllPaymentMethod = createRoutine(
  "PAYMENT/GET_ALL_PAYMENT_METHOD"
);

// =========================================================
// =========================================================
// SAGAS

function* getPaymentMethod(): Promise<void> {
  try {
    const response = yield call(axios.getWithAuth, API.GET_ALL_PAYMENT_METHOD);
    const listCard: Card[] = response.data.map((billing: any) => {
      const card: Card = {
        id: billing.id,
        fullName: billing.billing_details.name,
        brand: billing.card.brand,
        number: billing.card.last4,
        exp_month: billing.card.exp_month,
        exp_year: billing.card.exp_year,
      };
      return card;
    });
    yield put({
      type: getAllPaymentMethod.SUCCESS,
      payload: listCard,
    });
  } catch (e) {
    console.log(e);
  }
}

export function* paymentSaga() {
  yield all([takeLatest(getAllPaymentMethod.TRIGGER, getPaymentMethod)]);
}

const INITIAL_STATE: paymentState = {
  payment_list: [],
  loading: "",
};

// =========================================================
// =========================================================
// REDUCER

export default createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(getAllPaymentMethod.SUCCESS, (state, action) => {
    state.payment_list = action.payload;
  });
});
