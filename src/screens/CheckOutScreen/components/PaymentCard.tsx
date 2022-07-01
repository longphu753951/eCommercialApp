import React from "react";
import { View, Dimensions, Text, Image, ImageSourcePropType } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import user from "reducers/user";
import { styles, width, height } from "./styles";
import CardInfo from "./CardInfo";
import { cardType } from "config/mockData";

const PaymentCard = () => {
  const stripeInfo = useSelector(
    (state: RootState) => state.payment.stripe_customer
  );
  const listCard: Array<any> = useSelector(
    (state: RootState) => state.payment.payment_list
  );

  const navigation = useNavigation();
  const defaultCard = listCard.filter((card) => {
    return card.id == stripeInfo.default_source;
  })[0];

  const getImageTypeCard = (): ImageSourcePropType => {
    return cardType[defaultCard.brand];
  };

  const getColor = () => {
    return defaultCard.brand == "Visa" ? "#263771" : "white";
  };

  return (
    <CardInfo
      title="Payment"
      onChooseEdit={() => navigation.navigate("PaymentMethodScreen")}
      child={
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: getColor(),
              paddingHorizontal: (4.26 * width) / 100,
              paddingVertical: (0.86 * height) / 100,
              marginVertical: (1.847 * height) / 100,
              marginHorizontal: (4.8 * width) / 100,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.11,
              shadowRadius: 16.0,
              elevation: 20,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                width: (8.533 * width) / 100,
                height: (2.46 * height) / 100,
              }}
              source={getImageTypeCard()}
            />
          </View>
          <Text
            style={{
              fontSize: (1.72 * height) / 100,
              fontFamily: "NunitoSans-Regular",
            }}
          >
            **** **** **** {defaultCard.last4}
          </Text>
        </View>
      }
    />
  );
};


export default PaymentCard;