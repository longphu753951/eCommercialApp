import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Card } from "components";
import { cardType, checkOutInfo, deliveryBrand } from "config/mockData";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const CheckOutScreen = () => {
  const navigation = useNavigation();
  const user: Array<any> = useSelector((state: RootState) => state.user.user);
  const stripeInfo = useSelector(
    (state: RootState) => state.payment.stripe_customer
  );
  const listAddress: Array<any> = useSelector(
    (state: RootState) => state.user.shippingContacts
  );
  const listCard: Array<any> = useSelector(
    (state: RootState) => state.payment.payment_list
  );

  const CardInfo = (props) => {
    const { child, title, screen } = props;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: (3.69 * height) / 100,
          }}
        >
          <Text
            style={{
              fontFamily: "NunitoSans-Regular",
              fontSize: (height * 2.21) / 100,
              color: "#909090",
            }}
          >
            {title}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(screen)}>
            <Feather
              name="edit-3"
              size={(Dimensions.get("window").height * 2.95) / 100}
              color="#808080"
            />
          </TouchableOpacity>
        </View>
        <Card
          cardStyle={{
            marginTop: (1.23 * height) / 100,
          }}
        >
          {child}
        </Card>
      </View>
    );
  };

  const AddressCard = () => {
    const defaultAddress = listAddress.filter((address) => {
      return address.id == user.default_address;
    })[0];
    console.log(defaultAddress);

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
    return (
      <CardInfo
        title = "Shipping Address"
        screen={"ShippingScreen"}
        child={
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
        }
      />
    );
  };

  const PaymentCard = () => {
    const defaultCard = listCard.filter((card) => {
      return card.id == stripeInfo.default_source;
    })[0];
    console.log(defaultCard);

    const getImageTypeCard = (): ImageSourcePropType => {
      return cardType[defaultCard.brand];
    };

    const getColor = () => {
      return defaultCard.brand == "Visa" ? "#263771" : "white";
    }

    return (
      <CardInfo
        title = "Payment"
        screen={"PaymentMethodScreen"}
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"CHECK OUT"} isBackButton={true} />
        <ScrollView
          style={{
            width: "100%",
            flexDirection: "column",
          }}
          contentContainerStyle={{
            marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
          }}
        >
          <AddressCard />
          <PaymentCard />
          <CardInfo
            title = "Delivery method"
            child={
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: (1.847 * height) / 100,
                }}
              >
                <View
                  style={{
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
                      width: (20 * width) / 100,
                      height: (2.46 * height) / 100,
                    }}
                    source={deliveryBrand[checkOutInfo[2].name]}
                  />
                </View>
                <Text
                  style={{
                    fontSize: (1.72 * height) / 100,
                    fontFamily: "NunitoSans-Regular",
                  }}
                >
                  {checkOutInfo[2].type}
                </Text>
              </View>
            }
          />
          <Card cardStyle={styles.priceContainer}>
            <View style={styles.priceTextContainer}>
              <Text style={[styles.price, { color: "#909090" }]}>Order:</Text>
              <Text style={styles.price}>$ 95.00</Text>
            </View>
            <View style={styles.priceTextContainer}>
              <Text style={[styles.price, { color: "#909090" }]}>
                Delivery:
              </Text>
              <Text style={styles.price}>$ 5.00</Text>
            </View>
            <View style={styles.priceTextContainer}>
              <Text style={[styles.price, { color: "#909090" }]}>Total:</Text>
              <Text style={styles.price}>$ 100.00</Text>
            </View>
          </Card>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={() => navigation.navigate("CheckOutScreen")}
          >
            <Text style={styles.addAllText}>CHECK OUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: (Dimensions.get("window").height * 2.21) / 100,
    paddingHorizontal: (Dimensions.get("window").height * 2.46) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: (Dimensions.get("window").height * 1.85) / 100,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  profileImage: {
    height: (Dimensions.get("window").height * 9.85) / 100,
    width: (Dimensions.get("window").height * 9.85) / 100,
    borderRadius: 200,
  },
  profileContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",

    marginTop: (height * 1.8) / 100,
  },
  profileTextContainer: {
    marginLeft: (Dimensions.get("window").height * 2.46) / 100,
    justifyContent: "center",
  },
  categoryTextContainer: {
    justifyContent: "center",
  },
  name: {
    fontFamily: "NunitoSans-Bold",
    fontSize: (Dimensions.get("window").height * 2.46) / 100,
  },
  email: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
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
  priceTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: (height * 1.84) / 100,
  },
  price: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (2.21 * height) / 100,
  },
  priceContainer: {
    marginTop: (height * 4.67) / 100,
    paddingHorizontal: (2.72 * width) / 100,
    paddingBottom: (height * 1.84) / 100,
  },
  checkOutButton: {
    width: (Dimensions.get("window").width * 89.06) / 100,
    height: (Dimensions.get("window").height * 6.15) / 100,
    backgroundColor: "rgba(48, 48, 48, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: (1.8 * height) / 100,
  },
  addAllText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
    color: "white",
  },
});
