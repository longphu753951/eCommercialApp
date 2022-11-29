import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from 'services/navigationService';
import {allScreens} from './allScreen';
import {Alert, StatusBar} from 'react-native';
//import { navigationRef } from 'services/navigationService';
import store from 'store';
import {isEmpty} from 'lodash';

const Stack = createNativeStackNavigator();

const Navigation = (props: any) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>{allScreens(Stack)}</Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
