import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import size from "config/size";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { FCKeyBoardAvoidingView } from "components";
import { loginRoutine } from "reducers/auth";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
  const onSubmit = (data) => {
    console.log(data);
    dispatch({ type: loginRoutine.TRIGGER, data: data });
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <FCKeyBoardAvoidingView style={styles.container}>
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
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                activeOutlineColor={"#303030"}
                label="Telephone"
                keyboardType="phone-pad"
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="telephone"
            rules={{ required: true }}
          />
          {errors.telephone && <Text>This is required.</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={{ marginTop: (1 * height) / 100 }}
                mode="outlined"
                activeOutlineColor={"#303030"}
                label="Password"
                autoCapitalize={"none"}
                secureTextEntry={true}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          {errors.password && <Text>This is required.</Text>}

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{ marginVertical: 10 }}
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
              onPress={() => navigation.navigate("tabNavigation")}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>OR</Text>
          <View>
            <TouchableOpacity
              style={[styles.button, styles.signInWithButton]}
              onPress={() => navigation.navigate("tabNavigation")}
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
              onPress={() => navigation.navigate("tabNavigation")}
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
              onPress={() => navigation.navigate("tabNavigation")}
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
    fontSize: 45,
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
    marginTop: (3.45 * height) / 100,
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
