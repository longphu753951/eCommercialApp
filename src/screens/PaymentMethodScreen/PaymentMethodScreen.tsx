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
import { ifIphoneX } from "react-native-iphone-x-helper";
import _ from "lodash";
import { Header } from "components";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "config/types";
import { PaymentCard } from "components";
import { getAllPaymentMethod, updateDefaultPaymentMethod } from "reducers/payment";
import { useNavigation } from "@react-navigation/native";

export const PaymentMethodScreen = () => {
  const [number, setNumber] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const listPayment = useSelector((state) => state.payment.payment_list);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const defaultPayment = useSelector(
    (state) => state.payment.stripe_customer.default_source
  );

  useEffect(() => {
    setNumber(defaultPayment);
  }, []);

  const onRefresh = useCallback(async () => {
    await dispatch({ type: getAllPaymentMethod.TRIGGER });
  }, []);

  const onChangeDefaulPayment = async (number: string): Promise<void> => {
    await dispatch({ type: updateDefaultPaymentMethod.TRIGGER, data: number });
    setNumber(number);
  };

  const item = (item: any): JSX.Element => {
    return (
      <View
        style={{ marginTop: (Dimensions.get("window").height * 3.69) / 100 }}
      >
        <PaymentCard
          card={item.item}
          isPressable={true}
          onPressCard={() =>
            navigation.navigate({
              name: "EditPaymentScreen",
              params: {
                card: item.item,
              },
            })
          }
        />
        <View style={styles.checkBoxContainer}>
          <Checkbox
            style={styles.checkbox}
            color={number === item.item.id ? "#303030" : "#808080"}
            value={number === item.item.id ? true : false}
            onValueChange={() => onChangeDefaulPayment(item.item.id)}
          />
          <Text style={styles.useAsAddText}>Use as default payment method</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"PAYMENT METHOD"} />
        <FlatList
          style={styles.itemFlatList}
          data={listPayment}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={item}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate("AddPaymentScreen")}
          color={"#0D1C2E"}
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
  },
});
