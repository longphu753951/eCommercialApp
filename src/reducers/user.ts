import axios from "axios";
import { createRoutine } from "redux-saga-routines";
import { createReducer } from "@reduxjs/toolkit";
import {
  all,
  takeEvery,
  call,
  put,
  takeLatest,
  actionChannel,
} from "redux-saga/effects";
import API from "config/API";
import { Alert } from "react-native";
import { Bookmark, User } from "config/types";
import _ from "lodash";
import store from "store";

interface userState {
  bookmark: Bookmark;
  user: User;
  loading: string;
  bookmarkId: Number;
  shippingContactLoading: boolean;
  shippingContacts: Array<any>;
}

// =========================================================
// =========================================================
// TYPES

export const getCurrentUser = createRoutine("USER/GET_CURRENT_USER");
export const getBookmark = createRoutine("USER/GET_BOOKMARK");
export const addBookmark = createRoutine("USER/ADD_BOOKMARK");
export const deleteBookmark = createRoutine("USER/DELETE_BOOKMARK");
export const addNewAddress = createRoutine("USER/ADD_NEW_ADDRESS");
export const getAddresses = createRoutine("USER/GET_ADDRESSES");
export const updateDefaultAddressRoutine = createRoutine(
  "USER/UPDATE_DEFAULT_ADDRESS"
);

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

function* getBookmarkSaga(): Promise<void> {
  try {
    const data = yield call(axios.getWithAuth, API.BOOKMARK_BY_USER);
    yield put({
      type: getBookmark.SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: addBookmark.FAILURE,
    });
  }
}

function* addBookmarkSaga(action: any): Promise<void> {
  try {
    const data = yield call(
      axios.postWithAuth,
      API.ADD_NEW_BOOKMARK,
      action.data
    );
    yield put({
      type: addBookmark.SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: addBookmark.FAILURE,
    });
  }
}

function* addNewAddressSaga(action: any): Promise<void> {
  try {
    const data = yield call(
      axios.postWithAuth,
      API.ADD_NEW_ADDRESS,
      action.data
    );
  } catch (e) {
    console.log(e);
  }
}

function* getAllAddressesSaga(action: any): Promise<void> {
  try {
    const data = yield call(axios.getWithAuth, API.GET_ALL_ADDRESSES);
    yield put({
      type: getAddresses.SUCCESS,
      payload: data,
    });

  } catch (e) {
    console.log(e);
  }
}

function* deleteBookmarkSaga(action: any): Promise<void> {
  try {
    const url = API.DELETE_BOOKMARK.replace("id", action.id);
    const data = yield call(axios.deleteWithAuth, url);
    yield put({
      type: deleteBookmark.SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: deleteBookmark.FAILURE,
    });
  }
}

function* updateDefaultAddressSaga(action: any): Promise<void> {
  try {
    const url = API.UPDATE_DEFAULT_ADDRESS.replace("id", action.data);
    const data = yield call(axios.putWithAuth, url, {});
  
    yield put({
      type: updateDefaultAddressRoutine.SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: updateDefaultAddressRoutine.FAILURE,
    });
  }
}

export function* userSaga() {
  yield all([
    takeLatest(getCurrentUser.TRIGGER, getCurrentUserSaga),
    takeLatest(getBookmark.TRIGGER, getBookmarkSaga),
    takeLatest(addBookmark.TRIGGER, addBookmarkSaga),
    takeLatest(deleteBookmark.TRIGGER, deleteBookmarkSaga),
    takeLatest(addNewAddress.TRIGGER, addNewAddressSaga),
    takeLatest(getAddresses.TRIGGER, getAllAddressesSaga),
    takeLatest(updateDefaultAddressRoutine.TRIGGER, updateDefaultAddressSaga),
  ]);
}

const INITIAL_STATE: userState = {
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    avatar_path: "empty",
    payment_info: "",
    default_address: "",
  },
  bookmark: {
    id: 0,
    bookmarkDetail: [],
  },
  loading: "",
  shippingContactLoading: false,
  shippingContacts: [],
};

// =========================================================
// =========================================================
// REDUCER

export default createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(getCurrentUser.SUCCESS, (state, action) => {
      state.user = _.omit(action.payload, ["bookmark"]);
      state.bookmark = action.payload.bookmark;
      state.bookmarkId = action.payload.id;
    })
    .addCase(getBookmark.TRIGGER, (state) => {
      state.loading = "LOADING";
    })
    .addCase(getBookmark.SUCCESS, (state, action) => {
      state.bookmark = action.payload;
      state.loading = "SUCCESS";
    })
    .addCase(getBookmark.FAILURE, (state) => {
      state.loading = "FAILURE";
    })
    .addCase(addBookmark.TRIGGER, (state) => {
      state.loading = "LOADING";
    })
    .addCase(addBookmark.SUCCESS, (state, action) => {
      state.bookmark = action.payload;
      state.loading = "SUCCESS";
    })
    .addCase(addBookmark.FAILURE, (state) => {
      state.loading = "FAILURE";
    })
    .addCase(deleteBookmark.TRIGGER, (state) => {
      state.loading = "LOADING";
    })
    .addCase(deleteBookmark.SUCCESS, (state, action) => {
      state.bookmark = action.payload;
      state.loading = "SUCCESS";
    })
    .addCase(deleteBookmark.FAILURE, (state) => {
      state.loading = "FAILURE";
    })
    .addCase(getAddresses.SUCCESS, (state, action) => {
      state.shippingContacts = action.payload;
    })
    .addCase(updateDefaultAddressRoutine.TRIGGER, (state, action) => {
      state.shippingContactLoading = true;
    })
    .addCase(updateDefaultAddressRoutine.SUCCESS, (state, action) => {
      state.shippingContactLoading = false;
      state.user.default_address = action.payload;
    });
});
