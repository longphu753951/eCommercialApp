import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import reducers, { rootSaga } from "reducers";

let store = {};

const config = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "settings"],
};

const reducer = persistCombineReducers(config, reducers);

const sagaMiddleware = createSagaMiddleware();

export default function configurationStore(initialState = {}) {
  // store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
  store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        thunk: false,
      }).concat(sagaMiddleware),
  });
  const persistor = persistStore(store);
  //sagaMiddleware.run(rootSaga);

  return { persistor, store };
}

export function getStore() {
  return store;
}
