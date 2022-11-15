import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { profileCategoryList } from "config/mockData";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Header, Card } from "components";
import { useDispatch, useSelector } from "react-redux";
import { logoutRoutine } from "reducers/auth";
import * as RootNavigation from 'services/navigationService';


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const renderCategory = (): JSX.Element => {
    const listItem = profileCategoryList.map((item) => {
      return (
        <Card
          cardStyle={styles.card}
          isButton={true}
          onPress={() => navigation.navigate(item.screen)}
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
        </Card>
      );
    });
    return listItem;
  };

  

  const logOut = () => {
    Alert.alert("Log out", "Are you sure you want to log out ?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await dispatch({type: logoutRoutine.TRIGGER});
          RootNavigation.navigate('LoginScreen')
          
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header
          title={"PROFILE"}
          leftButton={"search1"}
          isBackButton={false}
          rightButton={"logout"}
          onPressRightButton={() => logOut()}
        />
        <ScrollView
          style={{
            width: "100%",
            flexDirection: "column",
          }}
          contentContainerStyle={{
            marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
          }}
        >
          <View style={styles.profileContainer}>
            <Image
              resizeMode={"contain"}
              style={styles.profileImage}
              source={{ uri: user.avatar_path }}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.name}>
                {user.last_name + " " + user.first_name}
              </Text>
              <Text style={styles.email}>{user.email}</Text>
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
  card: {
    paddingVertical: (Dimensions.get("window").height * 2.21) / 100,
    paddingHorizontal: (Dimensions.get("window").height * 2.46) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: (Dimensions.get("window").height * 1.85) / 100,
  },
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

    marginTop: (height * 1.8) / 100,
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
