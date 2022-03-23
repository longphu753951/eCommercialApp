import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { all, takeLatest, call, put } from "redux-saga/effects";
import moment from "moment";

// =========================================================
// =========================================================
// TYPES
export const loginRoutine = createRoutine("AUTH/LOGIN");

// =========================================================
// =========================================================
// SAGAS

export function* authSaga() {
  yield all([]);
}

// =========================================================
// =========================================================
// REDUCER

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginRoutine.SUCCESS:
      return {};
    default:
      return state;
  }
};
