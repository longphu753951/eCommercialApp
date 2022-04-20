import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, takeLatest, call, put } from "redux-saga/effects";
import moment from "moment";
import { category } from "config/types";

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
  const { data } = yield call(axios.postWithoutAuth, API.AGENT_COMPANIES);
}

export function* authSaga() {
  yield all([
    fetchCategorySaga(),
  ]);
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
    .addCase(categoryRoutine.TRIGGER, (state, action) => {
        state.loading = true;
    })
    .addCase(categoryRoutine.SUCCESS, (state, action) => {
      state.loading = false
      console.log(action);
    })
    .addCase(categoryRoutine.FAILURE, (state, action) => {
      state.loading = false;
      console.log(action);
    });
});
