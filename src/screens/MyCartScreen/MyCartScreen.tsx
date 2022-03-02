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
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { myCart } from "config/mockData";
import _ from "lodash";
import { CartItem, Header, IncrementButton } from "components";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const MyCartScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [chooseCat, setChooseCat] = useState("Popular");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const item = (item: any): JSX.Element => {
    return (
      <CartItem
        image={item.item.image}
        content={
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.nameText}>{item.item.name}</Text>
          </View>
        }
        bottomContent={
          <View style={styles.bottomCotainer}>
            <IncrementButton
              defaultCount={item.item.quantity}
              onChangeValue={(value) => console.log(value)}
            />
            <Text style={styles.totalPriceItemText}>$ {item.item.price}</Text>
          </View>
        }
      />
    );
  };

  const ItemDivider = () => (
    <View
      style={{
        borderBottomColor: "rgba(240, 240, 240, 1)",
        borderBottomWidth: 1,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"MY CART"} />
        <View style={styles.bodyContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.itemFlatList}
            data={myCart}
            ItemSeparatorComponent={ItemDivider}
            keyExtractor={(item) => item.name}
            renderItem={item}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <View>
            <View style={styles.promoInputContainer}>
              <TextInput
                placeholder="Enter your promo code"
                style={styles.PromoTextInput}
              />
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  elevation: 3,
                  backgroundColor: "green",
                }}
              >
                <TouchableOpacity style={styles.promoButton}>
                  <AntDesign
                    name="right"
                    size={(height * 1.97) / 100}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.checkOutButton}>
              <Text style={styles.addAllText}>CHECK OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    marginTop: (height * 1.47) / 100,
    paddingBottom: (height * 1.47) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  itemFlatList: {
    flex: 1,
    width: "100%",
  },
  titleText: {
    fontSize: (width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  itemImage: {
    width: (height * 12.31) / 100,
    height: (height * 12.31) / 100,
    borderRadius: 10,
  },
  itemTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameText: {
    fontSize: (Dimensions.get("window").height * 1.724) / 100,
    fontFamily: "NunitoSans-Regular",
    color: "#606060",
  },
  priceText: {
    fontFamily: "NunitoSans-Bold",
    marginTop: (Dimensions.get("window").height * 0.615) / 100,
    fontSize: (Dimensions.get("window").height * 1.97) / 100,
  },
  checkOutButton: {
    width: (Dimensions.get("window").width * 89.06) / 100,
    height: (Dimensions.get("window").height * 6.15) / 100,
    backgroundColor: "rgba(48, 48, 48, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: (Dimensions.get("window").height * 2.46) / 100,
  },
  addAllText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
    color: "white",
  },
  shoppingIconContainer: {
    width: (Dimensions.get("window").height * 3.69) / 100,
    height: (Dimensions.get("window").height * 3.69) / 100,
    backgroundColor: "rgba(224, 224, 224, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  contentItemContainer: {
    justifyContent: "space-between",
    flexDirection: "column",
    marginLeft: (Dimensions.get("window").width * 5.33) / 100,
    backgroundColor: "blue",
  },
  bottomCotainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  totalPriceItemText: {
    color: "#303030",
    fontFamily: "NunitoSans-Bold",
    fontSize: (height * 1.97) / 100,
  },
  PromoTextInput: {
    backgroundColor: "white",
    width: (width * 89.33) / 100,
    height: (height * 5.41) / 100,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    paddingLeft: (5.33 * width) / 100,
  },
  promoInputContainer: {
    marginBottom: (height * 2.46) / 100,
    flexDirection: "row",
    width: (Dimensions.get("window").height * 3.69) / 100,
  },
  promoButton: {
    width: (height * 5.41) / 100,
    height: (height * 5.41) / 100,
    backgroundColor: "rgba(48, 48, 48, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
  },
});
