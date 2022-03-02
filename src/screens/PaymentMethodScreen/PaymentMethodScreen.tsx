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
  ImageBackground,
  Platform,
} from "react-native";
import { FAB } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { creditCard, card, cardStyle } from "config/mockData";
import { Feather } from "@expo/vector-icons";
import { isIphoneX, ifIphoneX } from "react-native-iphone-x-helper";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Header } from "components";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const PaymentMethodScreen = () => {
  const [number, setNumber] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onChangeDefaulPayment = (number: string): void => {
    setNumber(number);
  };

  const hideCreditCard = (number: string): string => {
    const r = /\b(?:\d{4}[ -]?){3}(?=\d{4}\b)/gm;
    const subst = `**** **** **** `;
    return number.replace(r, subst);
  };

  const getImageTypeCard = (number: string): NodeRequire => {
    return card[number.charAt(0)];
  };

  const getCardStyle = (number: string): StyleSheet => {
    return cardStyle[number.charAt(0)];
  };

  const getSize = (): number => {
    return Platform.OS === "android" ? 24 : isIphoneX() ? 23 : 28.5;
  };

  const item = (item: any): JSX.Element => {
    return (
      <View
        style={{ marginTop: (Dimensions.get("window").height * 3.69) / 100 }}
      >
        <ImageBackground
          resizeMode="cover"
          style={{
            height: (Dimensions.get("window").height * getSize()) / 100,
          }}
          source={require("assets/images/creditCard.png")}
        >
          <View
            style={{
              marginLeft: (Dimensions.get("window").height * 5.66) / 100,
              marginTop: (Dimensions.get("window").height * 2.46) / 100,
              marginRight: (Dimensions.get("window").height * 4.92) / 100,
            }}
          >
            <View>
              <Image
                resizeMode="contain"
                source={getImageTypeCard(item.item.number)}
                style={getCardStyle(item.item.number)}
              />
              <Text
                style={{
                  color: "white",
                  fontFamily: "NunitoSans-Regular",
                  fontSize: (Dimensions.get("window").height * 2.5) / 100,
                  lineHeight: 27,
                  letterSpacing: 3,
                }}
              >
                {hideCreditCard(item.item.number)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: (Dimensions.get("window").height * 3.44) / 100,
              }}
            >
              <View>
                <Text style={styles.nameText}>Card Holder Name</Text>
                <Text style={styles.contentText}>{item.item.name}</Text>
              </View>
              <View>
                <Text style={styles.nameText}>Expiry Date</Text>
                <Text style={styles.contentText}>{item.item.expiryDate}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: (Dimensions.get("window").height * 1.85) / 100,
            paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
            marginTop: (Dimensions.get("window").height * 2.46) / 100,
          }}
        >
          <Checkbox
            style={styles.checkbox}
            color={number === item.item.number ? "#303030" : "#808080"}
            value={number === item.item.number ? true : false}
            onValueChange={() => onChangeDefaulPayment(item.item.number)}
          />
          <Text style={styles.useAsAddText}>Use as default payment method</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"SHIPPING ADDRESS"} />
        <FlatList
          style={styles.itemFlatList}
          data={creditCard}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.number}
          renderItem={item}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => console.log("Pressed")}
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
});
