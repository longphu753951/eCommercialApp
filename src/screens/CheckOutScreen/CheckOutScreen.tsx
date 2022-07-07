import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "components";
import { styles } from "./components/styles";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { Header, Loading } from "components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { AddressCard, CartCard, ShippingUnitCard } from "./components";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import API from "config/API";
import { setPaymentRoutine } from "reducers/cart";

export const CheckOutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user: Array<any> = useSelector((state: RootState) => state.user.user);
  const totalPrice = useSelector((state: RootState) => state.cart.cart.total);
  const [loading, setLoading] = useState(false);

  const cartLoading = useSelector((state: RootState) => state.cart.loading);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const token = useSelector(
    (state: RootState) => state.auth.token.access_token
  );
  const shippingType: Array<any> = useSelector(
    (state: RootState) => state.cart.shippingType
  );

  const isEnable = useMemo(() => {
    if (_.isEmpty(shippingType) || _.isEmpty(user.default_address)) {
      return true;
    }
    return false;
  }, [user.default_address, shippingType]);

  console.log("is enable", isEnable);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const fetchPaymentSheetParams = async () => {
    const response = await axios.post(
      API.CREATE_PAYMENT_INTENT,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  const initializePaymentSheet = async () => {
    setLoading(true);
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();
    setPaymentIntentId(paymentIntent.id);
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent.client_secret,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(false);
    }
  };

  const handlePayPress = async () => {
    await initializePaymentSheet();
    const { error, paymentOption } = await presentPaymentSheet();
    if (!error) {
      await dispatch({
        type: setPaymentRoutine.TRIGGER,
        data: {
          paymentIntentId: paymentIntentId,
          shippingType: shippingType.id,
        },
      });
      navigation.navigate("CongratulationScreen");
    }
  };

  return (
    <>
      {(loading || cartLoading) && <Loading />}
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
            <CartCard />
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
                <Text style={styles.price}>
                  $ {Number(totalPrice).toFixed(2)}
                </Text>
              </View>
            </Card>
            <TouchableOpacity
              disabled={isEnable}
              style={[styles.checkOutButton, { opacity: isEnable ? 0.5 : 1 }]}
              onPress={() => handlePayPress()}
            >
              <Text style={styles.addAllText}>CHECK OUT</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};
