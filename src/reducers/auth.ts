import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import { all, takeEvery, call, put, takeLatest } from "redux-saga/effects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "config/API";
import { Alert } from "react-native";

interface authState {
  loading: string;
  token: any;
}
// =========================================================
// =========================================================
// TYPES
export const loginRoutine = createRoutine("AUTH/LOGIN");
export const getCurrentUser = createRoutine("AUTH/GET_CURRENT_USER");

// =========================================================
// =========================================================
// SAGAS

function* loginSaga(action: any): Promise<void> {
  try {
    const data = yield call(axios.postWithoutAuth, API.LOGIN, {
      username: "abc",
      client_id: "KZ1xixxuPNWvwdD7HBvOnv3hJLSEPAXGmiXr1sLV",
      client_secret:
        "uobWATBOm3H3PhFUe3PMsulizLJyTt5rj7dUkiBXfjqN6J26No7b0zGPk5omuHD9TrSwqeG286Kew2JiUBGQp96Q5VOYG4uQszLtiQ9L5ydRWtF1nBH4KYe5LfZPC9kS",
      grant_type: "password",
      telephone: action.data.telephone,
      password: action.data.password,
    });
    yield put({
      type: loginRoutine.SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: loginRoutine.FAILURE,
    });
  }
}

function* getCurrentUserSaga(): Promise<void> {
  try {
    const data = yield call(axios.getWithAuth, API.GET_CURRENT_USER);
    console.log(data);

    yield put({
      type: getCurrentUser.SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e);
  }
}

export function* authSaga() {
  yield all([
    takeLatest(loginRoutine.TRIGGER, loginSaga),
    takeLatest(getCurrentUser.TRIGGER, getCurrentUserSaga),
  ]);
}

// =========================================================
// =========================================================
// REDUCER

const INITIAL_STATE = {
  loading: "",
  token: undefined,
} as authState;

export default createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(loginRoutine.TRIGGER, (state, action) => {
      state.loading = "TRIGGER";
    })
    .addCase(loginRoutine.SUCCESS, (state, action) => {
      state.loading = "SUCCESS";
      state.token = action.payload;
    })
    .addCase(loginRoutine.FAILURE, (state, action) => {
      state.loading = "FAILURE";
      Alert.alert("Login failed", "Wrong password or telephone number");
    })
    .addCase(getCurrentUser.SUCCESS, (state, action) => {
      console.log("abc");
    });
});
