import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, takeEvery, call, put } from "redux-saga/effects";
import moment from "moment";
import API from "config/API";

// =========================================================
// =========================================================
// TYPES
export const loginRoutine = createRoutine("AUTH/LOGIN");

// =========================================================
// =========================================================
// SAGAS

function* loginSaga(action: any): any {
  const data = yield call(axios.postWithoutAuth, API.LOGIN, JSON.stringify({
    'username': 'abc',
    'client_id': 'KZ1xixxuPNWvwdD7HBvOnv3hJLSEPAXGmiXr1sLV',
    'client_secret': 'uobWATBOm3H3PhFUe3PMsulizLJyTt5rj7dUkiBXfjqN6J26No7b0zGPk5omuHD9TrSwqeG286Kew2JiUBGQp96Q5VOYG4uQszLtiQ9L5ydRWtF1nBH4KYe5LfZPC9kS',
    'grant_type': 'password',
    'telephone': action.data.telephone,
    'password': action.data.password
  }));
  console.log(data);
  // yield put({
  //   type: loginRoutine.SUCCESS,
  //   payload: data,
  // });
}

export function* authSaga() {
  yield all([
    takeEvery(loginRoutine.TRIGGER, loginSaga),
  ]);
}

// =========================================================
// =========================================================
// REDUCER

const INITIAL_STATE = {};

export default createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(loginRoutine.SUCCESS, (state, action) => {
    console.log('abc')
  })
    // .addCase(categoryRoutine.SUCCESS, (state, action) => {
    //   state.loading = false;
    //   state.listCategories = [
    //     {
    //       id: 0,
    //       name: "Popular",
    //       image_outline:
    //         "http://192.168.1.13:8000/static/img/categories/2022/04/star-outline.png",
    //       image_solid:
    //         "http://192.168.1.13:8000/static/img/categories/2022/04/star-solid.png",
    //     },
    //   ];
    //   action.payload.results.forEach((item) => state.listCategories.push(item));
    // })
    // .addCase(categoryRoutine.FAILURE, (state, action) => {
    //   state.loading = false;
    // })
    // .addCase(productRoutine.SUCCESS, (state, action) => {
    //   state.loading = false;
    //   state.listProducts = action.payload.results;
    // })
    // .addCase(productByCategoryRoutime.TRIGGER, (state, action) => {
    //   state.loading = true;
    // })
    // .addCase(productByCategoryRoutime.SUCCESS, (state, action) => {
    //   state.loading = false;
    //   state.listProducts = action.payload;
    // })
    // .addCase(productByIdRoutime.TRIGGER, (state, action) => {
    //   state.loading = true;
    //   state.product = null;
    // })
    // .addCase(productByIdRoutime.SUCCESS, (state, action) => {
    //   state.loading = false;
    //   state.product = action.payload;
    // });
});
