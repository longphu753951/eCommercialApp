import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
  TextInput,
  Animated,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { myCart } from "config/mockData";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import _ from "lodash";
import {
  CartItem,
  Header,
  IncrementButton,
  FCKeyBoardAvoidingView,
} from "components";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteToCartRoutine,
  getCartRoutine,
  updateQuantityRoutine,
} from "reducers/cart";
import ItemCart from "./components/ItemCart";
import { width, height, styles } from "./components/styles";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const MyCartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = useCallback(async () => {
    await dispatch({ type: getCartRoutine.TRIGGER });
  }, []);

  const item = (item: any): JSX.Element => {
    const onChangeQuantity = async (value) => {
      await dispatch({
        type: updateQuantityRoutine.TRIGGER,
        data: { id: item.item.id, quantity: value },
      });
    };

    return (
      <CartItem
        onRemoving={async () => {
          await dispatch({
            type: deleteToCartRoutine.TRIGGER,
            data: { id: item.item.id },
          });
        }}
        image={{ uri: item.item.product_attribute.productImage[0].image }}
        content={
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.nameText}>
              {item.item.product_attribute.name}
            </Text>
          </View>
        }
        bottomContent={
          <View style={styles.bottomCotainer}>
            <IncrementButton
              defaultCount={item.item.quantity}
              onChangeValue={(value) => onChangeQuantity(value)}
            />
            <Text style={styles.totalPriceItemText}>
              $ {item.item.final_price}
            </Text>
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
    <FCKeyBoardAvoidingView isFlatList={true}>
      <Header title={"MY CART"} />
      <View style={styles.bodyContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.itemFlatList}
          data={cart.order_details}
          ItemSeparatorComponent={ItemDivider}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <ItemCart item={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <View
          style={{
            height: (21.05 * height) / 100,
          }}
        >
          <LinearGradient
            colors={[
              "#FFFFFF",
              "rgba(255, 255, 255, 0.9)",
              "rgba(255, 255, 255, 0.2)",
            ]}
            style={{
              width: width,
              paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
            }}
          >
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
                $ {Number(cart.total).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkOutButton}
              onPress={() => navigation.navigate("CheckOutScreen")}
            >
              <Text style={styles.addAllText}>CHECK OUT</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </FCKeyBoardAvoidingView>
  );
};
