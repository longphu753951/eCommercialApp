import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import { FAB } from "react-native-paper";
import Checkbox from "expo-checkbox";
import {  ifIphoneX } from "react-native-iphone-x-helper";
import _ from "lodash";
import { Header } from "components";
import { useSelector } from "react-redux";
import { Card } from "config/types";
import { PaymentCard } from "components";
import { FCKeyBoardAvoidingView } from "components/";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const AddPaymentScreen = () => {
  

  
  return (
    <FCKeyBoardAvoidingView loading={false} style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"ADD PAYMENT METHOD"} />
          <PaymentCard card ={{
            "brand": "visa",
            "exp_month": 12,
            "exp_year": 2025,
            "fullName": "Tran Long Phu",
            "id": "card_1L7xJHEAPiKpbC1Nu5S0UkAd",
            "number": "XXXX",
          }}/>
      </View>
    </FCKeyBoardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: (Dimensions.get("window").height * 7.4) / 100,
    height: (Dimensions.get("window").height * 7.4) / 100,
    marginRight: (Dimensions.get("window").height * 2.463) / 100,
    ...ifIphoneX(
      {
        marginBottom: 0,
      },
      {
        marginBottom: (Dimensions.get("window").height * 4.31) / 100,
      }
    ),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  itemFlatList: {
    flex: 1,
  },
  checkbox: {
    height: (Dimensions.get("window").height * 2.46) / 100,
    width: (Dimensions.get("window").height * 2.46) / 100,
    borderRadius: 4,
  },
  useAsAddText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
    marginLeft: (Dimensions.get("window").height * 1.23) / 100,
    color: "#222222",
  },
  contentText: {
    marginTop: (Dimensions.get("window").height * 0.54) / 100,
    color: "white",
    fontFamily: "NunitoSans-SemiBold",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
  },
  nameText: {
    color: "white",
    fontSize: (Dimensions.get("window").height * 1.477) / 100,
    fontFamily: "NunitoSans-SemiBold",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: (Dimensions.get("window").height * 1.85) / 100,
    paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
    marginTop: (Dimensions.get("window").height * 2.46) / 100,
  }
});
