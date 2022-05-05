import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, takeEvery, call, put } from "redux-saga/effects";
import moment from "moment";
import API from "config/API";

interface itemState {
  listCategories: any[];
  listProducts: [];
  product: any;
  loading: boolean;
  error: string;
}

// =========================================================
// =========================================================
// TYPES
export const categoryRoutine = createRoutine("CATEGORIES", (id: any) => id);
export const productRoutine = createRoutine("PRODUCTS");
export const productByCategoryRoutime = createRoutine("CATEGORY/PRODUCT");
export const productByIdRoutime = createRoutine("PRODUCT", (id: any) => id);

// =========================================================
// =========================================================
// SAGAS

function* fetchCategorySaga(): any {
  console.log('abwf')
  const data = yield call(axios.getWithoutAuth, API.CATEGORY);
  yield put({
    type: categoryRoutine.SUCCESS,
    payload: data,
  });
}

function* fetchProductSaga(): any {
  const data = yield call(axios.getWithoutAuth, API.PRODUCT);
  yield put({
    type: productRoutine.SUCCESS,
    payload: data,
  });
}

function* fetchProductByCategorySaga(action): any {
  const url = API.PRODUCT_BY_CATEGORY.replace("id", action.id);
  const data = yield call(axios.getWithoutAuth, url);

  yield put({
    type: productByCategoryRoutime.SUCCESS,
    payload: data,
  });
}

function* fetchProductByIdSaga(action): any {
  const url = API.PRODUCT_BY_ID.replace("id", action.id);
  const data = yield call(axios.getWithoutAuth, url);

  yield put({
    type: productByIdRoutime.SUCCESS,
    payload: data,
  });
}

export function* itemSaga() {
  yield all([
    takeEvery(categoryRoutine.TRIGGER, fetchCategorySaga),
    takeEvery(productByCategoryRoutime.TRIGGER, fetchProductByCategorySaga),
    takeEvery(productRoutine.TRIGGER, fetchProductSaga),
    takeEvery(productByIdRoutime.TRIGGER, fetchProductByIdSaga),
  ]);
}

// =========================================================
// =========================================================
// REDUCER

const INITIAL_STATE: itemState = {
  listCategories: [],
  listProducts: [],
  product: null,
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
    })
    .addCase(productByIdRoutime.TRIGGER, (state, action) => {
      state.loading = true;
      state.product = null;
    })
    .addCase(productByIdRoutime.SUCCESS, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
});
