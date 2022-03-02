import React, {useEffect, useState} from 'react';
import {Platform, BackHandler, ToastAndroid} from 'react-native';
import Navigation from 'navigation/Navigations';
import {useFonts} from 'expo-font';
import _ from 'lodash';
import font from 'config/font';

const App = () => {
  const [loaded] = useFonts(font);
  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show("Double tap to exit", ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });
  if (!loaded) {
    return null;
  }
  return <Navigation/>;
};

export default App;