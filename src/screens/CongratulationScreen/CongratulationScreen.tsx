import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { styles, width, height } from "./components/styles";

export const CongratulationScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={{ fontSize: 36, fontFamily: "Gelasio-Medium" }}>
          SUCCESS!
        </Text>
        <Image
          resizeMode="contain"
          style={{ height: (height * 30.66) / 100, marginTop: (height * 3.07) / 100 }}
          source={require("assets/images/congratulation.png")}
        />
        <View>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "NunitoSans-Light",
              fontSize: (height * 2.21) / 100,
              marginTop: (height * 3.07) / 100
            }}
          >
            Your order will be delivered soon.{"\n"}
            Thank you for choosing our app!
          </Text>
        </View>
        <View style={{ width: "80%", marginTop: (4.9 * height) / 100 }}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.buttonText}>TRACK YOUR ORDER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.backToHomeButton]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: "#212121",
                },
              ]}
            >
              BACK TO HOME
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
