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
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { Card } from "components";
import { myRating } from "config/mockData";
import { Header } from "components";
import _ from "lodash";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const MyReviewScreen = () => {
  const [name, setName] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const onChangeDefaultAddress = (name: string): void => {
    setName(name);
  };

  const item = (item: any): JSX.Element => {
    return (
      <View
        style={{ marginTop: (Dimensions.get("window").height * 2.463) / 100 }}
      >
        <Card
          cardStyle={{
            backgroundColor: "#fff",
            shadowColor: "#8A959E",
            shadowOffset: { width: 2, height: 3 },
            shadowOpacity: 0.21,
            shadowRadius: 10,
            elevation: 2,
            paddingHorizontal: (Dimensions.get("window").height * 1.97) / 100,
            paddingVertical: (Dimensions.get("window").height * 1.97) / 100,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: (Dimensions.get("window").height * 8.62) / 100,
                width: (Dimensions.get("window").height * 8.62) / 100,
                borderRadius: 6,
              }}
              source={item.item.image}
            />
            <View
              style={{
                justifyContent: "center",
                marginLeft: (Dimensions.get("window").height * 2.46) / 100,
              }}
            >
              <Text
                style={{
                  color: "#606060",
                  fontSize: (Dimensions.get("window").height * 1.97) / 100,
                  fontFamily: "NunitoSans-SemiBold",
                }}
              >
                {item.item.product}
              </Text>
              <Text
                style={{
                  color: "#303030",
                  fontSize: (Dimensions.get("window").height * 1.97) / 100,
                  fontFamily: "NunitoSans-ExtraBold",
                }}
              >
                $ {item.item.price}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: (Dimensions.get("window").height * 1.847) / 100,
            }}
          >
            <Rating
              type="star"
              imageSize={(Dimensions.get("window").height * 1.97) / 100}
              readonly
              ratingCount={5}
              fractions={1}
              startingValue={item.item.rating}
            />
            <Text
              style={{
                color: "#808080",
                fontSize: (Dimensions.get("window").height * 1.477) / 100,
                fontFamily: "NunitoSans-Regular",
              }}
            >
              {item.item.date}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: "#303030",
                fontSize: (Dimensions.get("window").height * 1.724) / 100,
                fontFamily: "NunitoSans-Regular",
              }}
            >
              {item.item.review}
            </Text>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"MY REVIEWS"} />

        <FlatList
          style={styles.itemFlatList}
          data={myRating}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
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
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  itemFlatList: {
    flex: 1,
    paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
  checkbox: {
    height: (Dimensions.get("window").height * 2.46) / 100,
    width: (Dimensions.get("window").height * 2.46) / 100,
    borderRadius: 4,
  },
  useAsAddText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
    marginLeft: (Dimensions.get("window").height * 1.23) / 100,
    color: "#808080",
  },
  nameText: {
    color: "#303030",
    fontFamily: "NunitoSans-Bold",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
  },
  addressText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
    color: "#808080",
  },
});
