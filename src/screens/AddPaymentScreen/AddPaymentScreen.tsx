import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import _ from "lodash";
import {
  FCKeyBoardAvoidingView,
  TextField,
  PaymentCard,
  Header,
} from "components/";
import { useForm } from "react-hook-form";
import { nameRule } from "services/inputRuleService";
import { useStripe } from "@stripe/stripe-react-native";
import { Picker } from "@react-native-picker/picker";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const AddPaymentScreen = () => {
  const stripe = useStripe();
  const openModal = useRef();
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand: "",
      fullName: "",
      number: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
    },
  });
  const [selectedLanguage, setSelectedLanguage] = useState();

  const handlingCardNumber = (number: string) => {
    this.setState({
      cardNumber: number
        .replace(/\s?/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim(),
    });
  };

  const onSubmit = async (data) => {
    stripe.createToken(data).then((payload) => console.log("[token]", payload));
  };

  return (
    <FCKeyBoardAvoidingView loading={false} style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"ADD PAYMENT METHOD"} />
        <View style ={{flexDirection: 'row'}}>
          <Picker
          style ={{width: 160}}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="January" value="java" />
            <Picker.Item label="December" value="js" />
          </Picker>
          <Picker
          style ={{width: 160}}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
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
              name={"number"}
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
              name={"fullName"}
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
              <Pressable
                onPress={() => {
                  console.log('asd')
                }}
              >
                <TextField
                  textInputStyle={styles.nameInput}
                  control={control}
                  label={"Expiration Date"}
                  name={"exp_year"}
                  rules={nameRule}
                  error={errors.exp_year}
                />
              </Pressable>
            </View>
            <View style={{ width: "100%", flexDirection: "column" }}>
              <TouchableOpacity
                style={[styles.button, styles.signInButton]}
                onPress={() => handleSubmit(onSubmit)}
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
