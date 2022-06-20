import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import _ from "lodash";
import { Header } from "components";
import { PaymentCard } from "components";
import { FCKeyBoardAvoidingView, TextField } from "components/";
import { useForm } from "react-hook-form";
import { nameRule } from "services/inputRuleService";
import { useNavigation } from "@react-navigation/native";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const EditPaymentScreen = ({ route, navigation }) => {
  const card = route.params.card;
  console.log(card)
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: card.fullName,
      number: '',
      exp_month: card.exp_month,
      exp_year: card.exp_year.toString(),
      cvc: "",
    },
  });

  return (
    <FCKeyBoardAvoidingView loading={false} style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"EDIT PAYMENT METHOD"} />
        <View style={{ marginTop: 26, flexDirection: "column", flex: 1 }}>
          <PaymentCard
            card={card}
          />
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
              rules={nameRule}
              error={errors.fullName}
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
                rules={nameRule}
                error={errors.exp_month}
              />
              <TextField
                textInputStyle={styles.nameInput}
                control={control}
                label={"Expiration Date"}
                name={"exp_year"}
                rules={nameRule}
                error={errors.exp_year}
              />
            </View>
            <View style={{ width: "100%", flexDirection: 'column' }}>
              <TouchableOpacity
                style={[styles.button, styles.signInButton]}
                onPress={() => console.log("asdas")}
              >
                <Text style={styles.buttonText}>Edit card</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => console.log("asdas")}
              >
                <Text style={styles.buttonText}>Delete card</Text>
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
  deleteButton: {
    marginTop: (height * 1.35) / 100,
    backgroundColor: "#d44c64",
    width: "100%",
  },
});
