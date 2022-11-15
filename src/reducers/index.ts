import {combineReducers} from '@reduxjs/toolkit';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
export default rootReducer;