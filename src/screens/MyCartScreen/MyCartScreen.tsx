import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { myCart } from "config/mockData";
import _ from "lodash";
import {
  CartItem,
  Header,
  IncrementButton,
  FCKeyBoardAvoidingView,
} from "components";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const MyCartScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

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
    <FCKeyBoardAvoidingView>
      <View style={styles.contentContainer}>
        <Header title={"MY CART"} />
        <View style={styles.bodyContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.itemFlatList}
            data={myCart}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={ItemDivider}
            keyExtractor={(item) => item.name}
            renderItem={item}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <View>
            <View style={[styles.promoInputContainer]}>
              <TextInput
                placeholder="Enter your promo code"
                style={styles.PromoTextInput}
              />
              <View style={styles.promoButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("asd");
                  }}
                  style={styles.promoButton}
                >
                  <AntDesign
                    name="right"
                    size={(height * 1.97) / 100}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalText}>Total: </Text>
              <Text style={[styles.totalText, { color: "#303030" }]}>
                $ 95.00
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkOutButton}
              onPress={() => navigation.navigate("CheckOutScreen")}
            >
              <Text style={styles.addAllText}>CHECK OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FCKeyBoardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: "NunitoSans-Regular",
    fontSize: (height * 1.97) / 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 2,
    paddingLeft: (5.33 * width) / 100,
    flexWrap: "wrap",
  },
  promoInputContainer: {
    marginBottom: (height * 2.46) / 100,
    flexDirection: "row",
  },
  promoButton: {
    width: (height * 5.41) / 100,
    height: (height * 5.41) / 100,
    backgroundColor: "rgba(48, 48, 48, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  promoButtonContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    elevation: 2,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: (5.066 * width) / 100,
    marginBottom: (2.46 * height) / 100,
  },
  totalText: {
    fontSize: (2.46 * height) / 100,
    fontFamily: "NunitoSans-Bold",
    color: "#808080",
  },
});
