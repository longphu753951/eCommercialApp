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
} from "react-native";
import { notificationList } from "config/mockData";
import _ from "lodash";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const NotificationScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [chooseCat, setChooseCat] = useState("Popular");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const item = (item: any): JSX.Element => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          backgroundColor: item.item.status && "rgba(240, 240, 240, 1)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingTop: 15,
            marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
          }}
        >
          {item.item.image && (
            <Image style={styles.itemImage} source={item.item.image} />
          )}
          <View
            style={
              item.item.image
                ? styles.itemTextContainer
                : styles.itemTextWithoutImageContainer
            }
          >
            <Text
              style={[
                styles.titleNotifiText,
                {
                  fontSize: item.item.image
                    ? (Dimensions.get("window").height * 1.477) / 100
                    : (Dimensions.get("window").height * 1.724) / 100,
                },
              ]}
            >
              {item.item.title}
            </Text>
            <Text style={styles.contentText}>{item.item.content}</Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              textAlign: "right",
              marginRight: 20,
              paddingBottom: 10,
              fontFamily: "NunitoSans-ExtraBold",
              fontSize: (Dimensions.get("window").height * 1.724) / 100,
              color: item.item.status === 'New' ? '#27AE60': '#EB5757'
            }}
          >
            {item.item.status}
          </Text>
        </View>
      </View>
    );
  };

  const ItemDivider = () => (
    <View
      style={{
        borderBottomColor: "rgba(240, 240, 240, 1)",
        borderBottomWidth: 1,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.titleText}>NOTIFICATION</Text>
        </View>
        <FlatList
          data={notificationList}
          showsVerticalScrollIndicator={false}
          style={styles.itemFlatList}
          ItemSeparatorComponent={ItemDivider}
          keyExtractor={(item) => item.title}
          renderItem={item}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
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
    // marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  itemFlatList: {
    flex: 1,
    marginTop: (Dimensions.get("window").height * 1.72) / 100,
  },
  itemImage: {
    width: (Dimensions.get("window").height * 8.62) / 100,
    height: (Dimensions.get("window").height * 8.62) / 100,
    borderRadius: 10,
  },
  itemTextContainer: {
    width: (Dimensions.get("window").width * 68) / 100,
    marginLeft: (Dimensions.get("window").width * 2.66) / 100,
  },
  itemTextWithoutImageContainer: {
    width: "100%",
  },
  titleNotifiText: {
    fontFamily: "NunitoSans-Bold",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  contentText: {
    fontFamily: "NunitoSans-Regular",
    marginTop: (Dimensions.get("window").height * 0.61) / 100,
    fontSize: (Dimensions.get("window").height * 1.23) / 100,
  },
});
