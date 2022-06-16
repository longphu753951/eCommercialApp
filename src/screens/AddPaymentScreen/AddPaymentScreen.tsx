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
import { nameRule } from "services/inputRuleService";
import { useStripe } from "@stripe/stripe-react-native";
import DatePicker from "@dietime/react-native-date-picker";
import moment from "moment";

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const AddPaymentScreen = () => {
  const stripe = useStripe();
  const openModal = useRef();
  const [time, setTime] = useState(new Animated.Value(0));
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
      exp_dateTime: "XX/XXXX",
      cvc: "",
    },
  });
  const [modalVisible, setModalVisible] = useState(false);

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
    <FCKeyBoardAvoidingView loading={true} style={styles.container}>
      {/* <Modal animationType="fade" transparent={true} visible={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.68)",
            flexDirection: "column-reverse",
          }}
        >
          <Animated.View
            style={{
              width: "100%",
              height: "50%",
              bottom: 0,
              backgroundColor: "white",
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
            }}
          >
            <View
              style={{
                width: "100%",
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                padding: 15,
                flexDirection: "row-reverse",
                borderBottomWidth: 0.2,
              }}
            >
              <TouchableOpacity>
                <Text style={{ fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              
            </View>
          </Animated.View>
        </View>
      </Modal> */}
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
              <View>
                <DateTimePickerModal />
              </View>
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
