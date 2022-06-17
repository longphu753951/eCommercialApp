import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Modal,
  Animated,
} from "react-native";
import _ from "lodash";
import {
  FCKeyBoardAvoidingView,
  TextField,
  PaymentCard,
  Header,
  DateTimePickerModal,
} from "components/";
import { useForm } from "react-hook-form";
import { nameRule, rules } from "services/inputRuleService";
import { useStripe, CardField, } from "@stripe/stripe-react-native";
import { useDispatch } from "react-redux";
import { addNewPaymentMethod } from "reducers/payment";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const AddPaymentScreen = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "TRAN LONG PHU",
      number: "5555558265554449",
      exp_dateTime: "06/2023",
      cvc: "341",
    },
  });

  const handlingCardNumber = (number: string) => {
    this.setState({
      cardNumber: number
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim(),
    });
  };

  const onSubmit = async  (data) => {
    const dateTimeArray = data['exp_dateTime'].split("/");
    delete data['exp_dateTime'];
    data['exp_month'] = dateTimeArray[0];
    data['exp_year'] = dateTimeArray[1];
    
    await dispatch({ type: addNewPaymentMethod.TRIGGER, data: data });
  };

  return (
    <FCKeyBoardAvoidingView loading={true} style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"ADD PAYMENT METHOD"} />
        <View style={{ marginTop: 26, flexDirection: "column", flex: 1 }}>
          <PaymentCard />
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              paddingHorizontal: (width * 5.33) / 100,
              width: width,
              marginTop: 20,
            }}
          >
            <TextField
              textInputStyle={{
                width: "100%",
                backgroundColor: "white",
                marginTop: (height * 0.5) / 100,
              }}
              control={control}
              label={"Cardholder name"}
              name={"fullName"}
              rules={nameRule}
              error={errors.fullName}
            />
            <TextField
              textInputStyle={{
                width: "100%",
                backgroundColor: "white",
                marginTop: (height * 0.5) / 100,
              }}
              control={control}
              label={"Card Number"}
              name={"number"}
              rules={rules}
              error={errors.number}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextField
                textInputStyle={styles.nameInput}
                control={control}
                label={"CVC"}
                name={"cvc"}
                rules={rules}
                error={errors.cvc}
              />
              <View>
                <DateTimePickerModal
                  inputStyle={styles.nameInput}
                  control={control}
                  name={"exp_dateTime"}
                  rules={rules}
                  error={errors.exp_dateTime}
                />
              </View>
            </View>
            
            <View style={{ width: "100%", flexDirection: "column" }}>
              <TouchableOpacity
                style={[styles.button, styles.signInButton]}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.buttonText}>Add new card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </FCKeyBoardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  nameInput: { width: (width * 42.4) / 100, backgroundColor: "white" },
  buttonText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (1.97 * height) / 100,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    height: (height * 5.54) / 100,
    borderRadius: 4,
  },
  signInButton: {
    backgroundColor: "#212121",
    width: "100%",
  },
});
