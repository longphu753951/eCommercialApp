import {configureStore} from '@reduxjs/toolkit';
import {getFirebase, actionTypes as rrfActionTypes} from 'react-redux-firebase';
import {constants as rfConstants} from 'redux-firestore';

import rootReducer from 'reducers';



export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // FLUSH,
          // REHYDRATE,
          // PAUSE,
          // PERSIST,
          // PURGE,
          // REGISTER,
          // just ignore every redux-firebase and react-redux-firebase action type
          ...Object.keys(rfConstants.actionTypes).map(
            type => `${rfConstants.actionsPrefix}/${type}`,
          ),
          ...Object.keys(rrfActionTypes).map(
            type => `@@reactReduxFirebase/${type}`,
          ),
        ],
        ignoredPaths: ['firebase', 'firestore'],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
