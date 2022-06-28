import React, { useState, useCallback, useEffect } from "react";
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
import { Card, Header } from "components";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const ShippingScreen = () => {
  const [number, setNumber] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const addresses = useSelector((state) => state.user.shippingContacts);
  const defaultAddress = useSelector(
    (state) => state.user.user.default_address
  );

  useEffect(() => {
    console.log(defaultAddress)
    setNumber(defaultAddress);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onChangeDefaultAddress = (name: string): void => {
    setName(name);
  };

  const item = (item: any): JSX.Element => {
    const getAddress = ():string => {
      return item.item.address+","+ item.item.ward+","+ item.item.district+","+ item.item.province
    }
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
            color={number == item.item.id ? "#303030" : "#808080"}
            value={number == item.item.id ? true : false}
            onValueChange={() => {}}
          />
          <Text style={styles.useAsAddText}>Use as the shipping address</Text>
        </View>
        <Card cardStyle={styles.card}>
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
            <TouchableOpacity onPress={() => {
              navigation.navigate({
                name: "EditShippingContactScreen",
                params: {
                  shippingContact: item.item,
                },
              })
            }}>
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
            <Text style={styles.addressText}>{getAddress()}</Text>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"SHIPPING ADDRESS"} />

        <FlatList
          style={styles.itemFlatList}
          data={addresses}
          contentContainerStyle={{paddingBottom: (Dimensions.get("window").height * 7.4) / 100}}
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
          onPress={() => navigation.navigate("AddShippingContactScreen")}
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
