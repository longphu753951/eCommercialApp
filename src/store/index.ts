import AsyncStorage from "@react-native-async-storage/async-storage";
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
  store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { persistor, store };
}

export function getStore() {
  return store;
}
