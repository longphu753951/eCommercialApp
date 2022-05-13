import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, takeEvery, call, put, takeLatest } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "config/API";
import { Alert } from "react-native";
import { Bookmark, User } from "config/types";
import _ from "lodash";

interface userState {
  bookmark: Bookmark;
  user: User;
}

// =========================================================
// =========================================================
// TYPES

export const getCurrentUser = createRoutine("AUTH/GET_CURRENT_USER");

// =========================================================
// =========================================================
// SAGAS

function* getCurrentUserSaga(): Promise<void> {
  try {
    const data = yield call(axios.getWithAuth, API.GET_CURRENT_USER);
    yield put({
      type: getCurrentUser.SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield all([takeLatest(getCurrentUser.TRIGGER, getCurrentUserSaga)]);
}

const INITIAL_STATE: userState = {
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    avatar_path: "empty",
  },
  bookmark: {
    id: 0,
    bookmarkDetail: [],
  },
};

// =========================================================
// =========================================================
// REDUCER

export default createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(getCurrentUser.SUCCESS, (state, action) => {
    let user = (({ bookmark, ...o }) => bookmark)(action.payload);
    state.user = _.omit(action.payload, ["bookmark"]);
    state.bookmark = action.payload.bookmark;
  });
});
