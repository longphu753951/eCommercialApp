import React, {useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import allScreens from './allScreen';

const Stack = createStackNavigator();

const Navigation = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {allScreens(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
