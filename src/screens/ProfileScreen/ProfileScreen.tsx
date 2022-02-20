import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
  Button,
  TouchableOpacity
} from "react-native";
import { profileCategoryList } from "config/mockData";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const ProfileScreen = () => {
  const renderCategory = (): JSX.Element => {
    const listItem = profileCategoryList.map((item) => {
      return (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: (Dimensions.get("window").height * 2.21) / 100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            paddingHorizontal: (Dimensions.get("window").height * 2.46) / 100,
            elevation: 1,
            borderWidth: 1,
            borderColor: "white",
            marginTop: (Dimensions.get("window").height * 1.85) / 100,
          }}
        >
          <View style={styles.categoryTextContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.title}</Text>
          </View>
          <FontAwesomeIcon
            size={(Dimensions.get("window").height * 2) / 100}
            icon={faAngleRight}
            color={"#909090"}
          />
        </TouchableOpacity>
      );
    });
    return listItem;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.titleText}>PROFILE</Text>
        </View>
        <ScrollView
          style={{
            width: "100%",
            flexDirection: "column",
            // marginTop: (Dimensions.get("window").height * 3.45) / 100,
          }}
        >
          <View style={styles.profileContainer}>
            <Image
              resizeMode={"contain"}
              style={styles.profileImage}
              source={require("assets/images/profile-image.png")}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.name}>Long Phú</Text>
              <Text style={styles.email}>longphu753951@gmail.com</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: (Dimensions.get("window").height * 3.69) / 100,
            }}
          >
            {renderCategory()}
          </View>
        </ScrollView>
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
    justifyContent: "center",
    marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  profileImage: {
    height: (Dimensions.get("window").height * 9.85) / 100,
    width: (Dimensions.get("window").height * 9.85) / 100,
    borderRadius: 60,
  },
  profileContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  profileTextContainer: {
    marginLeft: (Dimensions.get("window").height * 2.46) / 100,
    justifyContent: "center",
  },
  categoryTextContainer: {
    justifyContent: "center",
  },
  name: {
    fontFamily: "NunitoSans-Bold",
    fontSize: (Dimensions.get("window").height * 2.46) / 100,
  },
  email: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
  },
});