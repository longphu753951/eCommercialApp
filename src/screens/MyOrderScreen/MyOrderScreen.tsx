import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Header } from "components";
import styles from "./MyOrderStyle";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

export const Tab = createMaterialTopTabNavigator();

const ChildScreen = () => {
  return <View></View>;
};

export const MyOrderScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"MY ORDERS"} />
        <View style={styles.contentDetailContainer}>
          <Tab.Navigator
            tabBarOptions={{
              indicatorStyle: {
                backgroundColor: "#303030",
                width: (Dimensions.get("screen").width * 10.66) / 100,
                height: 4,
                borderRadius: 20,
                left: Dimensions.get("screen").width / 9,
              },
              labelStyle: {fontFamily: "NunitoSans-Regular" }
            }}
            screenOptions={{
              tabBarActiveTintColor: "#303030",
              tabBarLabelStyle: { fontSize: 18, },
            }}
            activeTintColor="black"
            inactiveColor="gray"
          >
            <Tab.Screen name="Delivered" component={ChildScreen} />
            <Tab.Screen name="Processing" component={ChildScreen} />
            <Tab.Screen name="Canceled" component={ChildScreen} />
          </Tab.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};
