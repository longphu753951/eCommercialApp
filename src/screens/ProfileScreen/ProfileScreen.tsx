import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
} from "react-native";
import { profileCategoryList } from "config/mockData";
import { useNavigation } from "@react-navigation/native";
import { Card } from "components";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const renderCategory = (): JSX.Element => {
    const listItem = profileCategoryList.map((item) => {
      return (
        // <TouchableOpacity
        //   style={styles.itemContainer}
        //   onPress={() => navigation.navigate(item.screen)}
        // >
        //   <View style={styles.categoryTextContainer}>
        //     <Text style={styles.name}>{item.name}</Text>
        //     <Text style={styles.email}>{item.title}</Text>
        //   </View>
        //   <FontAwesomeIcon
        //     size={(Dimensions.get("window").height * 2) / 100}
        //     icon={faAngleRight}
        //     color={"#909090"}
        //   />
        // </TouchableOpacity>
        <Card isButton={true} onPress={() => navigation.navigate(item.screen)} >
          <View style={styles.categoryTextContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.title}</Text>
          </View>
          <FontAwesomeIcon
            size={(Dimensions.get("window").height * 2) / 100}
            icon={faAngleRight}
            color={"#909090"}
          />
        </Card>
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
              marginHorizontal: 1,
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
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  profileImage: {
    height: (Dimensions.get("window").height * 9.85) / 100,
    width: (Dimensions.get("window").height * 9.85) / 100,
    borderRadius: 200,
  },
  profileContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
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
  }
});
