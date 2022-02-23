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
  Button,
  TouchableOpacity,
} from "react-native";
import { FAB } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { addressList } from "config/mockData";
import { Feather } from "@expo/vector-icons";
import { ifIphoneX } from "react-native-iphone-x-helper";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const ShippingScreen = () => {
  const [name, setName] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onChangeDefaultAddress = (name: string): void => {
    setName(name);
  };

  const item = (item: any): JSX.Element => {
    console.log(item);
    return (
      <View
        style={{ marginTop: (Dimensions.get("window").height * 3.69) / 100 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: (Dimensions.get("window").height * 1.85) / 100,
          }}
        >
          <Checkbox
            style={styles.checkbox}
            color={name === item.item.name ? "#303030" : "#808080"}
            value={name === item.item.name ? true : false}
            onValueChange={() => onChangeDefaultAddress(item.item.name)}
          />
          <Text style={styles.useAsAddText}>Use as the shipping address</Text>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            shadowColor: "#8A959E",
            shadowOffset: {
              width: 2,
              height: 3,
            },
            shadowOpacity: 0.21,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <View
            style={{
              paddingLeft: (Dimensions.get("window").height * 2.46) / 100,
              paddingTop: (Dimensions.get("window").height * 1.85) / 100,
              paddingBottom: (Dimensions.get("window").height * 1.23) / 100,
              borderBottomWidth: 2,
              borderBottomColor: "#F0F0F0",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: (Dimensions.get("window").height * 1.85) / 100,
            }}
          >
            <Text style={styles.nameText}>{item.item.name}</Text>
            <TouchableOpacity>
              <Feather
                name="edit-3"
                size={(Dimensions.get("window").height * 2.95) / 100}
                color="#808080"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingLeft: (Dimensions.get("window").height * 2.46) / 100,
              paddingTop: (Dimensions.get("window").height * 1.23) / 100,
              paddingBottom: (Dimensions.get("window").height * 1.85) / 100,
              paddingRight: (Dimensions.get("window").height * 2.34) / 100,
            }}
          >
            <Text style={styles.addressText}>{item.item.address}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.titleText}>SHIPPING ADDRESS</Text>
        </View>
        <FlatList
          style={styles.itemFlatList}
          data={addressList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name}
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
    marginTop: (Dimensions.get("window").height * 1.72) / 100,

    paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
  checkbox: {
    height: (Dimensions.get("window").height * 2.46) / 100,
    width: (Dimensions.get("window").height * 2.46) / 100,
    borderRadius: 4,
  },
  useAsAddText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
    marginLeft: (Dimensions.get("window").height * 1.23) / 100,
    color: "#808080",
  },
  nameText: {
    color: "#303030",
    fontFamily: "NunitoSans-Bold",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
  },
  addressText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
    color: "#808080",
  },
});