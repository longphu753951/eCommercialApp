import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, takeEvery, call, put } from "redux-saga/effects";
import moment from "moment";
import { category } from "config/types";
import API from "config/API";

interface CategoryState {
  listCategories: category[];
  loading: boolean;
  error: string;
}

// =========================================================
// =========================================================
// TYPES
export const categoryRoutine = createRoutine("CATEGORY");

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

export function* categorySaga() {
  yield all([takeEvery(categoryRoutine.TRIGGER, fetchCategorySaga)]);
}

// =========================================================
// =========================================================
// REDUCER

const INITIAL_STATE: CategoryState = {
  listCategories: [],
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
      console.log(action);
    });
});
