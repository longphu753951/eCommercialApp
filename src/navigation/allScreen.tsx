import React from 'react';
import BoardingScreen from '../screens/BoardingScreen/BoardingScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

const allScreens = (Stack: any) => {
  return (
    <>
      <Stack.Screen
        name="BoardingScreen"
        component={BoardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </>
  );
};

export default allScreens;
