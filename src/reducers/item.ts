import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, takeEvery, call, put } from "redux-saga/effects";
import moment from "moment";
import API from "config/API";

interface itemState {
  listCategories: []
  listProducts: [];
  loading: boolean;
  error: string;
}

// =========================================================
// =========================================================
// TYPES
export const categoryRoutine = createRoutine("CATEGORY");
export const productRoutine = createRoutine("PRODUCT");
export const productByCategoryRoutime = createRoutine("CATEGORY/PRODUCT");

// =========================================================
// =========================================================
// SAGAS

function* fetchCategorySaga() {
  const data = yield call(axios.postWithoutAuth, API.CATEGORY);
  yield put({
    type: categoryRoutine.SUCCESS,
    payload: data,
  });
}

function* fetchProductSaga() {

  const data = yield call(axios.postWithoutAuth, API.PRODUCT);
  yield put({
    type: productRoutine.SUCCESS,
    payload: data,
  });
}

function* fetchProductByCategorySaga(categoryId: any) {
  const url = API.CATEGORY.replace('id', categoryId)
  const data = yield call(axios.postWithoutAuth, url);
  yield put({
    type: productByCategoryRoutime.SUCCESS,
    payload: data,
  });
}

export function* itemSaga() {
  yield all([
    takeEvery(categoryRoutine.TRIGGER, fetchCategorySaga),
    takeEvery(productByCategoryRoutime.TRIGGER, fetchProductByCategorySaga),
    takeEvery(productRoutine.TRIGGER, fetchProductSaga)
  ]);
}

// =========================================================
// =========================================================
// REDUCER

const INITIAL_STATE: itemState = {
  listCategories: [],
  listProducts: [],
  loading: false,
  error: "",
};

export default createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(categoryRoutine.SUCCESS, (state, action) => {
      state.loading = false;
      state.listCategories = action.payload.results;
    })
    .addCase(categoryRoutine.FAILURE, (state, action) => {
      state.loading = false;
    })
    .addCase(productRoutine.SUCCESS, (state, action) => {
      state.loading = false;
      state.listProducts = action.payload.results;
    })
    .addCase(productByCategoryRoutime.SUCCESS, (state, action) => {
      state.loading = false;
      state.listProducts = action.payload.results;
    })
});
