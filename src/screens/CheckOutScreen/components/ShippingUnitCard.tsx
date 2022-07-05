import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import user from "reducers/user";
import { styles, width, height } from "./styles";
import CardInfo from "./CardInfo";
import { checkOutInfo, deliveryBrand } from "config/mockData";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import _ from "lodash";

const ShippingUnitCard = () => {
  const shippingType: Array<any> = useSelector(
    (state: RootState) => state.cart.shippingType
  );

  const getShippingUnitComponent = () => {
    if (!_.isEmpty(shippingType)) {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: (1.847 * height) / 100,
          }}
        >
          <View style={styles.deliveryBrandImageContainer}>
            <Image
              resizeMode="contain"
              style={{
                width: (20 * width) / 100,
                height: (2.46 * height) / 100,
              }}
              source={{ uri: shippingType.image }}
            />
          </View>
          <Text
            style={{
              fontSize: (1.72 * height) / 100,
              fontFamily: "NunitoSans-Regular",
            }}
          >
            {`${shippingType.type} (${shippingType.min_date} - ${shippingType.max_date} days)`}
          </Text>
        </View>
      );
    }
    return null;
  };
  const navigation = useNavigation();
  return (
    <>
      <CardInfo
        title="Shipping Unit"
        defaultText={"Please choose shipping type"}
        onChooseEdit={() => navigation.navigate("ShippingUnitScreen")}
        child={getShippingUnitComponent()}
      />
    </>
  );
};

export default ShippingUnitCard;
