import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import size from "config/size";
import { useNavigation } from "@react-navigation/native";
import { FCKeyBoardAvoidingView } from "components";
import { ScrollView } from "react-native-gesture-handler";

export const LoginScreen = () => {
  const navigation = useNavigation();

  const timeOfDay = () => {
    const today = new Date();
    const curHr = today.getHours();
    const time = curHr < 12 ? "morning" : curHr < 18 ? "afternoon" : "evening";
    return time;
  };

  return (
    <FCKeyBoardAvoidingView>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 315 }}
            resizeMode={"contain"}
            source={require("assets/images/icon.png")}
          />
        </View>
        <View style={{ marginLeft: size.h52, marginTop: 40 }}>
          <Text
            style={{
              fontFamily: "Gelasio-SemiBold",
              fontSize: 27,
              color: "#606060",
            }}
          >
            Good {timeOfDay()} !
          </Text>
          <Text
            style={{
              fontFamily: "Gelasio-SemiBold",
              fontSize: 45,
              color: "#303030",
              marginTop: size.h14,
            }}
          >
            Sign In
          </Text>
        </View>
        <View
          style={{
            marginTop: 15,
            marginHorizontal: size.h52,
          }}
        >
          <TextInput
            mode="outlined"
            activeOutlineColor={"#303030"}
            label="Telephone"
            keyboardType="phone-pad"
            onChangeText={(text) => console.log(text)}
          />
          <TextInput
            style={{ marginTop: 15 }}
            mode="outlined"
            activeOutlineColor={"#303030"}
            label="Password"
            autoCapitalize={"none"}
            secureTextEntry={true}
            onChangeText={(text) => console.log(text)}
          />
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity style={{ marginVertical: 10 }}>
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
              style={{
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
                marginTop: size.s50,
                height: 45,
                borderRadius: 4,
                backgroundColor: "#212121",
              }}
              onPress={() => navigation.navigate("tabNavigation")}
            >
              <Text
                style={{
                  fontFamily: "NunitoSans-Regular",
                  fontSize: 18,
                  width: "100%",
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
                marginTop: size.s20,
                height: 45,
                borderRadius: 4,
                backgroundColor: "#767676",
              }}
              onPress={() => navigation.navigate("tabNavigation")}
            >
              <Text
                style={{
                  fontFamily: "NunitoSans-Regular",
                  fontSize: 18,
                  width: "100%",
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                marginVertical: 25,
                fontSize: 15,
              }}
            >
              OR
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.signInWithButton}
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
                }}
              >
                Sign in with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInWithButton}
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
              style={styles.signInWithButton}
              onPress={() => navigation.navigate("tabNavigation")}
            >
              <Image
                resizeMode="contain"
                style={{ width: 23, height: 23, marginRight: 10 }}
                source={require("assets/images/facebook-logo.png")}
              />
              <Text
                style={{
                  fontFamily: "NunitoSans-Regular",
                  fontSize: 18,
                  color: "#212121",
                }}
              >
                Sign in with Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FCKeyBoardAvoidingView>
    // <SafeAreaView style={styles.containerStyle}>
    //   <ScrollView
    //     showsVerticalScrollIndicator={false}
    //     style = {{flex: 1}}>
    //     <KeyboardAvoidingView
    //       behavior={Platform.OS === "ios" ? "padding" : "height"}
    //       contentContainerStyle={styles.containerStyle}
    //       style={styles.containerStyle}
    //     >
    //       <TouchableWithoutFeedback
    //         onPress={Keyboard.dismiss}
    //         accessible={false}
    //       >

    //       </TouchableWithoutFeedback>
    //     </KeyboardAvoidingView>
    //   </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    flex: 1,
  },
  signInWithButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: size.s15,
    height: 45,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    borderColor: "#212121",
    borderWidth: size.s5,
    flexDirection: "row",
  },
});
