import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import size from "config/size";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FCKeyBoardAvoidingView, TextField } from "components";
import { loginRoutine } from "reducers/auth";
import { getAddresses, getCurrentUser } from "reducers/user";
import { getAllPaymentMethod } from "reducers/payment";
import { getCartRoutine } from "reducers/cart";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const timeOfDay = () => {
    const today = new Date();
    const curHr = today.getHours();
    const time = curHr < 12 ? "morning" : curHr < 18 ? "afternoon" : "evening";
    return time;
  };

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      telephone: "",
      password: "",
    },
  });


  useEffect(async () => {
    console.log(loading)
    if (loading === "SUCCESS") {
      await dispatch({ type: getCurrentUser.TRIGGER });
      await dispatch({type: getAddresses.TRIGGER})
      await dispatch({type: getAllPaymentMethod.TRIGGER});
      await dispatch({type: getCartRoutine.TRIGGER});
      await dispatch({ type: loginRoutine.FULFILL });
      reset();
      navigation.navigate("tabNavigation");
    }
    
  }, [loading]);

  const onSubmit = async (data) => {
    
    await dispatch({ type: loginRoutine.TRIGGER, data: data });
  };

  return (
    <FCKeyBoardAvoidingView loading={loading} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center", width: "100%" }}>
          <Image
            style={styles.topImage}
            resizeMode={"contain"}
            source={require("assets/images/icon.png")}
          />
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Good {timeOfDay()} !</Text>
          <Text style={styles.signInText}>Sign In</Text>
        </View>
        <View
          style={{
            marginTop: (1.847 * height) / 100,
            width: "100%",
          }}
        >
          <TextField
            textInputStyle={{ width: "100%" }}
            control={control}
            label={"Telephone"}
            name={"telephone"}
            keyboardType={"phone-pad"}
            error={errors.telephone}
          />

          <TextField
            textInputStyle={{ width: "100%" }}
            control={control}
            isSecure={true}
            label={"Password"}
            name={"password"}
            error={errors.password}
          />

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{ marginBottom: (height * 1.01) / 100 }}
              onPress={() => {
                console.log("forgot the password");
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "NunitoSans-SemiBold",
                }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <TouchableOpacity
              style={[styles.button, styles.signInButton]}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.signUpButton]}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>OR</Text>
          <View>
            <TouchableOpacity
              style={[styles.button, styles.signInWithButton]}
              onPress={() => console.log('apple')}
            >
              <Image
                resizeMode="contain"
                style={{ width: 18, height: 18, marginRight: 10 }}
                source={require("assets/images/apple-logo.png")}
              />
              <Text
                style={{
                  fontFamily: "NunitoSans-Regular",
                  fontSize: 18,
                  color: "#212121",
                  textAlignVertical: "center",
                }}
              >
                Sign in with Apple
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.signInWithButton]}
              onPress={() => console.log('google')}
            >
              <Image
                resizeMode="contain"
                style={{ width: 18, height: 18, marginRight: 10 }}
                source={require("assets/images/google-logo.png")}
              />
              <Text
                style={{
                  fontFamily: "NunitoSans-Regular",
                  fontSize: 18,
                  color: "#212121",
                  textAlignVertical: "center",
                }}
              >
                Sign in with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.signInWithButton]}
              onPress={() => console.log('facebook')}
            >
              <Image
                resizeMode="contain"
                style={{ width: 18, height: 18, marginRight: 10 }}
                source={require("assets/images/facebook-logo.png")}
              />
              <Text
                style={{
                  fontFamily: "NunitoSans-Regular",
                  fontSize: 18,
                  color: "#212121",
                  textAlignVertical: "center",
                }}
              >
                Sign in with Facebook
              </Text>
            </TouchableOpacity>
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
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: (width * 5.33) / 100,
  },
  topImage: {
    width: (84 * width) / 100,
  },
  welcomeContainer: { marginTop: (4.92 * height) / 100 },
  signInText: {
    fontFamily: "Gelasio-SemiBold",
    fontSize: 43,
    color: "#303030",
    marginTop: size.h14,
  },
  welcomeText: {
    fontFamily: "Gelasio-SemiBold",
    fontSize: 27,
    color: "#606060",
  },
  buttonText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (1.97 * height) / 100,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
  },
  button: {
    width: (width * 89.06) / 100,
    alignSelf: "center",
    justifyContent: "center",

    height: (height * 5.54) / 100,
    borderRadius: 4,
  },
  signInButton: {
    backgroundColor: "#212121",
  },
  signUpButton: {
    marginTop: (height * 1.35) / 100,
    backgroundColor: "#767676",
  },
  orText: {
    marginVertical: (2.8 * height) / 100,
    fontSize: (1.6 * height) / 100,
    alignSelf: "center",
  },
  signInWithButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#212121",
    borderWidth: 3,
    marginBottom: (1.35 * height) / 100,
  },
});
