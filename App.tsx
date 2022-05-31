import React, { useEffect, useState } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "navigation/Navigations";
import { useFonts } from "expo-font";
import _ from "lodash";
import font from "config/font";
import store from "store";
import "middlewares";
import { StripeProvider as _StripeProvider } from "@stripe/stripe-react-native";
import type { Props as StripeProviderProps } from "@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider";
const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;
import { persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";

const FIREBASE_CONFIG: any = {
  apiKey: "AIzaSyBOJw-7JcmZrua6IS0OWWKCyOwV6LtFt2s",
  authDomain: "ecommercial-8d9ee.firebaseapp.com",
  projectId: "ecommercial-8d9ee",
  storageBucket: "ecommercial-8d9ee.appspot.com",
  messagingSenderId: "213082501110",
  appId: "1:213082501110:web:f93b9dad0ed631ae2a21d7",
  measurementId: "G-BRSDBV7BPE",
};

initializeApp(FIREBASE_CONFIG);

let persistor = persistStore(store);

AsyncStorage.clear();

const App = () => {
  const [loaded] = useFonts(font);
  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time
    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show("Double tap to exit", ToastAndroid.LONG);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  if (!loaded) {
    return null;
  }
  return (
    <StripeProvider
      publishableKey={
        "pk_test_51KAS9GEAPiKpbC1N48OEYp3ofa5Ll0aDuPI6Y8waDoh1x6otOE4bljUQa5aJY3i5lt2dH46owJRV3w9R9sbh1O7c00oZ7xp778"
      }
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

export default App;
