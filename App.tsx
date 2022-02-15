import React from 'react';
import Navigation from 'navigation/Navigations';
import {useFonts} from 'expo-font';
import _ from 'lodash';
import font from 'config/font';

const App = () => {
  const [loaded] = useFonts(font);
  if (!loaded) {
    return null;
  }
  return <Navigation/>;
};

export default App;