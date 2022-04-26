import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, takeEvery, call, put } from "redux-saga/effects";
import moment from "moment";
import API from "config/API";

interface itemState {
  listCategories: [];
  listProducts: [];
  loading: boolean;
  error: string;
}

// =========================================================
// =========================================================
// TYPES
export const categoryRoutine = createRoutine("CATEGORY", (id: any) => id);
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

function* fetchProductByCategorySaga(action) {
  const url =
    action.id === 0
      ? API.PRODUCT
      : API.PRODUCT_BY_CATEGORY.replace("id", action.id);
  const data = yield call(axios.postWithoutAuth, url);
  
  action.id === 0
    ? (yield put({
        type: productRoutine.SUCCESS,
        payload: data,
      }))
    : (yield put({
        type: productByCategoryRoutime.SUCCESS,
        payload: data,
      }));
}

export function* itemSaga() {
  yield all([
    takeEvery(categoryRoutine.TRIGGER, fetchCategorySaga),
    takeEvery(productByCategoryRoutime.TRIGGER, fetchProductByCategorySaga),
    takeEvery(productRoutine.TRIGGER, fetchProductSaga),
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
      state.listCategories = [
        {
          id: 0,
          name: "Popular",
          image_outline:
            "http://192.168.1.13:8000/static/img/categories/2022/04/star-outline.png",
          image_solid:
            "http://192.168.1.13:8000/static/img/categories/2022/04/star-solid.png",
        },
      ];
      action.payload.results.forEach((item) => state.listCategories.push(item));
    })
    .addCase(categoryRoutine.FAILURE, (state, action) => {
      state.loading = false;
    })
    .addCase(productRoutine.SUCCESS, (state, action) => {
      state.loading = false;
      state.listProducts = action.payload.results;
    })
    .addCase(productByCategoryRoutime.TRIGGER, (state, action) => {
      state.loading = true;
    })
    .addCase(productByCategoryRoutime.SUCCESS, (state, action) => {
      state.loading = false;
      state.listProducts = action.payload;
    });
});
