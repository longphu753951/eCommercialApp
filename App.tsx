import React, { useEffect, useState } from "react";
import { Platform, BackHandler, ToastAndroid } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import Navigation from "navigation/Navigations";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import _ from "lodash";
import font from "config/font";
import configureStore from "store";
import 'middlewares';
const App = () => {
  const [loaded] = useFonts(font);
  const [exitApp, setExitApp] = useState(0);
  const { persistor, store } = configureStore();
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
    <StripeProvider publishableKey={"pk_test_51KAS9GEAPiKpbC1N48OEYp3ofa5Ll0aDuPI6Y8waDoh1x6otOE4bljUQa5aJY3i5lt2dH46owJRV3w9R9sbh1O7c00oZ7xp778"}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

export default App;
