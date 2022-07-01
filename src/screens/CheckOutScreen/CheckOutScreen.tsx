import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "components";
import { styles, width, height } from "./components/styles";
import { cardType, checkOutInfo, deliveryBrand } from "config/mockData";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { AddressCard, PaymentCard, ShippingUnitCard } from "./components";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import type { PaymentMethodCreateParams } from "@stripe/stripe-react-native";
import axios from "axios";
import API from "config/API";

export const CheckOutScreen = () => {
  const navigation = useNavigation();
  const totalPrice = useSelector((state: RootState) => state.cart.cart.total);
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = axios
      .post(API.CREATE_PAYMENT_INTENT)
      .then((response) => {
        console.log(response.data.client_secret);
        return response.data.client_secret;
      })
      .catch((e) => {
        console.log(e);
      });
    return response;
  };

  const handlePayPress = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const billingDetails: PaymentMethodCreateParams.BillingDetails = {
      email: "longphu753951@gmail.com",
    };
    const { error, paymentIntent } = await confirmPayment("pi_3LGfsMEAPiKpbC1N0Ju4Vh6E_secret_xpb0xsOOIADr2EG1MdZB8TdQp", {
      type: "Card",
      cvc: '424',
      paymentMethodId: 'card_1L7xJHEAPiKpbC1Nu5S0UkAd',
    });

    if (error) {
      console.log(error);
    }
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
          <ShippingUnitCard />
          <Card cardStyle={styles.priceContainer}>
            <View style={styles.priceTextContainer}>
              <Text style={[styles.price, { color: "#909090" }]}>Order:</Text>
              <Text style={styles.price}>
                $ {Number(totalPrice).toFixed(2)}
              </Text>
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
            disabled={loading}
            onPress={() => handlePayPress()}
          >
            <Text style={styles.addAllText}>CHECK OUT</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
