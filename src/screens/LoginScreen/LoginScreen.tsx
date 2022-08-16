import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
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
import * as AppleAuthentication from "expo-apple-authentication";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Facebook from "expo-facebook";
import { useFirestoreConnect } from 'react-redux-firebase'


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [user, setUser] = useState<GoogleSignIn.GoogleUser | null>(null);
  const loading = useSelector((state) => state.auth.loading);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  
  useFirestoreConnect([
    { collection: 'todos' } // or 'todos'
  ])

  const todos = useSelector((state) => state?.firestore?.ordered?.todos)


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

  useEffect(() => {console.log(todos);},[todos])
  

  useEffect(async () => {
    console.log(todos);
    try {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: "818164448023-7cmb24u4tm0a5vg30bldadi7fgff7lj0.apps.googleusercontent.com",
    });
  }catch ({ message }) {
    alert('GoogleSignIn.initAsync(): ' + message);
  }
    _syncUserWithStateAsync();
  }, []);

  const _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    console.log(user)
    setUser(user);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  

  useEffect(async () => {
    console.log(loading);
    if (loading === "SUCCESS") {
      await dispatch({ type: getCurrentUser.TRIGGER });
      await dispatch({ type: getAddresses.TRIGGER });
      await dispatch({ type: getAllPaymentMethod.TRIGGER });
      await dispatch({ type: getCartRoutine.TRIGGER });
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
                console.log(todos);
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
              onPress={() => console.log("SignUpScreen")}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>OR</Text>
          <View>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
              }
              cornerRadius={5}
              style={[styles.button, styles.signInWithButton]}
              onPress={async () => {
                console.log(
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL
                );
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />

            <TouchableOpacity
              style={[styles.button, styles.signInWithButton]}
              onPress={() => {
                signInAsync();
              }}
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
              onPress={async () => {
                try {
                  await Facebook.initializeAsync({
                    appId: "600246601082072",
                  });
                  const {
                    type,
                    token,
                    expirationDate,
                    permissions,
                    declinedPermissions,
                  } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ["public_profile"],
                  });
                  if (type === "success") {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(
                      `https://graph.facebook.com/me?access_token=${token}`
                    );
                    Alert.alert(
                      "Logged in!",
                      `Hi ${(await response.json()).name}!`
                    );
                  } else {
                    // type === 'cancel'
                  }
                } catch ({ message }) {
                  alert(`Facebook Login Error: ${message}`);
                }
              }}
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
