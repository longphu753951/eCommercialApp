import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import size from "config/size";

export const BoardingScreen = () => {

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("assets/images/boarding.png")}
      resizeMode="cover"
      style={{ flex: 1, width: "100%" }}
    >
      <SafeAreaView>
        <View style={{ marginLeft: size.h52, marginTop: size.s200 * 2.04 }}>
          <Text
            style={{
              fontFamily: "Gelasio-Bold",
              fontSize: 24,
              color: "#606060",
            }}
          >
            MAKE YOUR
          </Text>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "Gelasio-Bold",
              color: "#303030",
              marginTop: size.h26,
            }}
          >
            HOME BEAUTIFUL
          </Text>
          <View
            style={{
              marginTop: size.s60 * 1.03,
              marginLeft: size.s70,
            }}
          >
            <Text
              style={{
                color: "#808080",
                fontFamily: "NunitoSans-Regular",
                fontSize: 18,
                lineHeight: size.s60 * 1.03,
              }}
            >
              The best simple place where you discover most wonderful furnitures
              and make your home beautiful
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: size.s260 * 1.3,
              alignSelf: "center",
              justifyContent: "center",
              marginTop: size.s300,
              height: 54,
              borderRadius: 4,
              backgroundColor: "#212121",
            }}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "NunitoSans-Regular",
                width: "100%",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
