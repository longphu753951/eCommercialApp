import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {allScreens} from './allScreen';
import { StatusBar } from 'react-native';
//import { navigationRef } from 'services/navigationService';
import store from 'store/';
import { isEmpty } from 'lodash';

const Stack = createStackNavigator();

const Navigation = props => {

  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content'/>
      <Stack.Navigator initialRouteName={isEmpty(store.getState().auth.token) ? 'BoardingScreen' :'tabNavigation'}>
        {allScreens(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
