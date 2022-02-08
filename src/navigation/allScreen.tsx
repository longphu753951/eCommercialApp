import React from "react";
import { BoardingScreen } from "../screens/BoardingScreen/BoardingScreen";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const allScreens = (Stack: any) => {
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
      <Stack.Screen
        name="tabNavigation"
        component={tabNavigation}
        options={{
          headerShown: false,
        }}
      />
    </>
  );
};

const allTabScreens = (Tab: any) => {
  return (
    <>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Wish List"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Notification"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
      />
    </>
  );
};

export const tabNavigation = () => {
    return(
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
          }}
        >
            {allTabScreens(Tab)}
        </Tab.Navigator>
    )
}