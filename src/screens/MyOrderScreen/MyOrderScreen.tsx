import React, { useState, useCallback, useEffect } from "react";
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
import { Header, Card } from "components";
import { styles, width, height } from "./components/styles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabScreen } from "./components";
import { Type } from "./components/TabScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { getDeliveringRoutine, getOrderRoutine } from "reducers/cart";

export const Tab = createMaterialTopTabNavigator();

const OrderedTab = () => {
  const dispatch = useDispatch();
  const orderedList = useSelector((state: RootState) => state.cart.orderedList);

  useEffect(() => {
    dispatch({ type: getOrderRoutine.TRIGGER });
  }, []);
  return <TabScreen data={orderedList} type={"Ordered"} />;
};

const DeliveringTab = () => {
  const dispatch = useDispatch();
  const deliveringList = useSelector((state: RootState) => state.cart.deliveringList);

  useEffect(() => {
    dispatch({ type: getDeliveringRoutine.TRIGGER });
  }, []);
  return <TabScreen data={deliveringList} type={"Delivering"} />;
};

// const DeliveringTab = () => {
//   const dispatch = useDispatch();
//   const deliveringList = useSelector((state: RootState) => state.cart.deliveringList);

//   useEffect(() => {
//     dispatch({ type: getOrderRoutine.TRIGGER, data: {type: 'delivering'} });
//   }, []);
//   return <TabScreen data={deliveringList} type={"Ordered"} />;
// };

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
                marginHorizontal: 40,
                width: 140,
                height: 4,
                borderRadius: 20,
              },
              labelStyle: { fontFamily: "NunitoSans-Regular" },
            }}
            screenOptions={{
              tabBarActiveTintColor: "#303030",
              tabBarLabelStyle: { fontSize: 18 },
            }}
            indicatorContainerStyle={{
              width: Dimensions.get("screen").width,
            }}
            activeTintColor="black"
            inactiveColor="gray"
          >
            <Tab.Screen name="Ordered" component={OrderedTab} />
            <Tab.Screen name="Delivering" component={DeliveringTab} />
          </Tab.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};
