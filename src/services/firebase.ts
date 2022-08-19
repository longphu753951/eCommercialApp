import Constants from "expo-constants";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/functions";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  enableClaims: true, // Get custom claims along with the profile
};

firebase.initializeApp(Constants.manifest?.extra?.firebase);
firebase.firestore();
firebase.functions();

export {firebase, rrfConfig};