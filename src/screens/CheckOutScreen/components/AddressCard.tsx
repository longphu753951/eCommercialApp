import React from "react";
import { View, Dimensions, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import user from "reducers/user";
import { styles, width, height } from "./styles";
import CardInfo from "./CardInfo";

const AddressCard = () => {
  const user: Array<any> = useSelector((state: RootState) => state.user.user);

  const listAddress: Array<any> = useSelector(
    (state: RootState) => state.user.shippingContacts
  );
  const navigation = useNavigation();
  const defaultAddress = listAddress.filter((address) => {
    return address.id == user.default_address;
  })[0];

  const getAddress = (): string => {
    return (
      defaultAddress.address +
      "," +
      defaultAddress.ward +
      "," +
      defaultAddress.district +
      "," +
      defaultAddress.province
    );
  };

  const getAddressComponent = () => {
    if (defaultAddress) {
      return (
        <>
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
            <Text style={styles.nameText}>{defaultAddress.name}</Text>
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
        </>
      );
    }
    return null;
  };

  return (
    <CardInfo
      title="Shipping Address"
      onChooseEdit={() => navigation.navigate("ShippingScreen")}
      defaultText = {"Please choose address for shipping"}
      child ={getAddressComponent()}
    />
  );
};

export default AddressCard;
