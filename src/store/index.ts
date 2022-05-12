import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import reducers, { rootSaga } from "reducers";

//Use this for developing purpose


const config = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "settings"],
};

const reducer = persistReducer(config, reducers);

const sagaMiddleware = createSagaMiddleware();

// store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
const store = configureStore({
  reducer,
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: false,
    }).concat(sagaMiddleware),
});
// 
sagaMiddleware.run(rootSaga);

export default store;