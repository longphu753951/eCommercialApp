import React, { useEffect, useState } from "react";
import { BackHandler, ToastAndroid, LogBox } from "react-native";
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
import { initializeApp, getApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

let persistor = persistStore(store);

const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'strong-maker-353301.firebaseapp.com',
  databaseURL: 'https://strong-maker-353301.firebaseio.com',
  projectId: 'strong-maker-353301',
  storageBucket: 'strong-maker-353301.appspot.com',
  messagingSenderId: '818164448023',
  appId: '1:818164448023:web:29e0b85d87741f9cc91552',
  measurementId: 'G-6S539S9K5Z',
};


function initializeAppIfNecessary() {
  try {
    return getApp();
  } catch (any) {
    return initializeApp(firebaseConfig);
  }
}

const app = initializeAppIfNecessary();


const analytics = getAnalytics(app);

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

    return () => {
      backHandler.remove();
    };
  });

  if (!loaded) {
    return null;
  }
  return (
    <StripeProvider
    merchantIdentifier="merchant.identifier"
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
