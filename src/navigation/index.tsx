import React, {useState, useEffect, useRef, SetStateAction} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from 'services/navigationService';
import {allScreens} from './allScreen';
import {Alert, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';
//import { navigationRef } from 'services/navigationService';
import store from 'store';

import {isEmpty} from 'lodash';

const Stack = createNativeStackNavigator();

const Navigation = (props: any) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    console.log(isEmpty(user) ? 'BoardingScreen' : 'TestScreen');
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName={isEmpty(user) ? 'BoardingScreen' : 'TestScreen'}>
        {allScreens(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
