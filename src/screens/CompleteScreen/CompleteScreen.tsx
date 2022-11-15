import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import _ from "lodash";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const CompleteScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text
          style={{
            fontFamily: "Gelasio-SemiBold",
            fontSize: 43,
            color: "#303030",
            marginTop: (height * 9.85) / 100,
            marginBottom: (height * 4.92) / 100,
          }}
        >
          Thank you!
        </Text>
        <Image
          resizeMode="contain"
          style={{ height: (height * 30.66) / 100 }}
          source={require("assets/images/image5.png")}
        />
        <Text
          style={{
            fontFamily: "NunitoSans-Regular",
            fontSize: 18,
            width: (75.46 * width) / 100,
            textAlign: "center",
            letterSpacing: 1,
            color: "#606060",
          }}
        >
          Now go back to login to join our service
        </Text>
        <View style={{ width: "80%", marginTop: (4.9 * height) / 100 }}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.buttonText}>GO BACK TO LOG IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 2.09 * height / 100,
    borderRadius: 10,
  },
  signInButton: {
    backgroundColor: "#212121",
    width: "100%",
  },

  buttonText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (1.97 * height) / 100,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
  },
});
