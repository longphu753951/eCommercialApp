import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BoardingScreen } from "screens/BoardingScreen/BoardingScreen";
import { LoginScreen } from "screens/LoginScreen/LoginScreen";
import { HomeScreen } from "screens/HomeScreen/HomeScreen";
import { FavoriteScreen } from "screens/FavoriteScreen/FavoriteScreen";
import { ProfileScreen } from "screens/ProfileScreen/ProfileScreen";
import { NotificationScreen } from "screens/NotificationScreen/NotificationScreen";
import { ShippingScreen } from "screens/ShippingScreen/ShippingScreen";
import { PaymentMethodScreen } from "screens/PaymentMethodScreen/PaymentMethodScreen";
import { MyReviewScreen } from "screens/MyReviewScreen/MyReviewScreen";
import { ProductScreen } from "screens/ProductScreen/ProductScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";

const Tab = createMaterialTopTabNavigator();

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
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="tabNavigation"
        component={tabNavigation}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ShippingScreen"
        component={ShippingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentMethodScreen"
        component={PaymentMethodScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyReviewScreen"
        component={MyReviewScreen}
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
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            let iconName = focused ? "home" : "home-outline";
            return <Ionicons size={24} name={iconName} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="favorite"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            let iconName = focused ? "bookmark" : "bookmark-outline";
            return <Ionicons size={24} name={iconName} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            let iconName = focused ? "notifications" : "notifications-outline";
            return <Ionicons size={24} name={iconName} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            let iconName = focused ? "person" : "person-outline";
            return <Ionicons size={24} name={iconName} color={color} />;
          },
        }}
      />
    </>
  );
};

export const tabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        indicatorStyle: { backgroundColor: "white" },
        style: {
          paddingHorizontal: 42,
          height: (Dimensions.get("window").height * 8.61) / 100,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        },
      }}
      activeTintColor="black"
      inactiveColor="gray"
      tabBarPosition="bottom"
    >
      {allTabScreens(Tab)}
    </Tab.Navigator>
  );
};

const bottomTabScreen = {
  home: {
    component: HomeScreen,
    fill: "home",
    outline: "home-outline",
  },
  favorite: {
    component: HomeScreen,
    fill: "bookmark",
    outline: "bookmark-outline",
  },
  notification: {
    component: HomeScreen,
    fill: "notifications",
    outline: "notifications-outline",
  },
  profile: {
    component: HomeScreen,
    fill: "person",
    outline: "person-outline",
  },
};
