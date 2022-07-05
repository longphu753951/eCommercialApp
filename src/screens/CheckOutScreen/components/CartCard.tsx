import React from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import user from "reducers/user";
import { styles, width, height } from "./styles";
import CardInfo from "./CardInfo";
import { cardType } from "config/mockData";
import { FlatList } from "react-native-gesture-handler";
import { CartItem } from "components";

const CartCard = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const itemCarts = cart.order_details.map((orderDetail: any) => {
   

    return (
      <CartItem
        cartStyle={{ marginLeft: 20 }}
        isRemoving={false}
        key={orderDetail.id}
        size={(height * 7.39) / 100}
        content={
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.nameText, { fontSize: (height * 1.7) / 100 }]}>
              {orderDetail.product_attribute.name}
            </Text>
            <View
              style={{
                alignSelf: "flex-end",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: (height * 1.7) / 100 }}>
                $ {orderDetail.final_price}
              </Text>
              <Text style={{ fontSize: (height * 1.7) / 100 }}>
                x {orderDetail.quantity}
              </Text>
            </View>
          </View>
        }
        image={{ uri: orderDetail.product_attribute.productImage[0].image }}
      />
    );
  });

  return (
    <CardInfo
      title="Order Items"
      onChooseEdit={() => navigation.goBack()}
      child={<>{itemCarts}</>}
    />
  );
};

export default CartCard;
