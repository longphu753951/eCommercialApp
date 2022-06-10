import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ConnectionStatusBar } from "react-native-ui-lib";
import { allScreens } from "./allScreen";
import { Alert, StatusBar } from "react-native";
//import { navigationRef } from 'services/navigationService';
import store from "store/";
import { isEmpty } from "lodash";

const Stack = createStackNavigator();

ConnectionStatusBar.registerGlobalOnConnectionLost(() => {
   Alert.alert('what what?!? connection has been lost');
});

const Navigation = (props) => {
  const [isConnected, setIsConnected] = useState(true);
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <ConnectionStatusBar
      useAbsolutePosition ={true}
        label="Internet is disconnected"
        onConnectionChange={(isConnected) => {
          console.log(isConnected);
          setIsConnected(isConnected);
        }}
      />

      <Stack.Navigator
        initialRouteName={
          isEmpty(store.getState().auth.token)
            ? "BoardingScreen"
            : "tabNavigation"
        }
      >
        {allScreens(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
