import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { itemList } from "config/mockData";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const FavoriteScreen = () => {
  const item = (item: any): JSX.Element => {
    return (
      <View
        style={{
          height: (Dimensions.get("window").height * 15.27) / 100,
          backgroundColor: "green",
          width: "100%",
        }}
      ></View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.titleText}>FAVORITE</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style = {{backgroundColor: 'blue', height: '100%'}}
          data={itemList}
          keyExtractor={(item) => item.name}
          renderItem={item}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
});
