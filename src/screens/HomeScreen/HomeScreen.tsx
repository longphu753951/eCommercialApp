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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faCouch } from "@fortawesome/free-solid-svg-icons";
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const categoryList = [
  {
    name: "Popular",
    outline: require("assets/images/category-item/star-outline.png"),
    solid: require("assets/images/category-item/star-solid.png"),
  },
  {
    name: "Chair",
    outline: require("assets/images/category-item/chair-outline.png"),
    solid: require("assets/images/category-item/chair-solid.png"),
  },
  {
    name: "Table",
    outline: require("assets/images/category-item/desk-outline.png"),
    solid: require("assets/images/category-item/desk-solid.png"),
  },
  {
    name: "Armchair",
    outline: require("assets/images/category-item/couch-outline.png"),
    solid: require("assets/images/category-item/couch-solid.png"),
  },
  {
    name: "Bed",
    outline: require("assets/images/category-item/bed-outline.png"),
    solid: require("assets/images/category-item/bed-solid.png"),
  },
  {
    name: "Lamb",
    outline: require("assets/images/category-item/lamp-outline.png"),
    solid: require("assets/images/category-item/lamp-solid.png"),
  },
];
const itemList = [
  {
    name: "Black Simple Lamp",
    price: "12.00",
    image: require("assets/images/demo-item/lamb.png"),
  },
  {
    name: "Minimal Stand",
    price: "25.00",
    image: require("assets/images/demo-item/stand.png"),
  },
  {
    name: "Coffee Chair",
    price: "20.00",
    image: require("assets/images/demo-item/chair.png"),
  },
  {
    name: "Simple Desk",
    price: "50.00",
    image: require("assets/images/demo-item/desk.png"),
  },
  {
    name: "Coffee Table",
    price: "50.00",
    image: require("assets/images/demo-item/table.png"),
  },
];
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [chooseCat, setChooseCat] = useState("Popular");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const categoryItem = (category: any): JSX.Element => {
    return (
      <TouchableOpacity
        onPress={() => {
          setChooseCat(category.item.name);
          setRefreshing(true);
          wait(2000).then(() => setRefreshing(false));
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginRight: (Dimensions.get("window").width * 6.66) / 100,
        }}
      >
        <View
          style={{
            width: (Dimensions.get("window").width * 11.73) / 100,
            height: (Dimensions.get("window").width * 11.73) / 100,
            backgroundColor:
              category.item.name === chooseCat ? "#303030" : "#F0F0F0",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              width: (Dimensions.get("window").width * 6) / 100,
              tintColor: category.item.name === chooseCat ? "white" : "#909090",
            }}
            source={
              category.item.name === chooseCat
                ? category.item.solid
                : category.item.outline
            }
          />
        </View>
        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
            color: "#808080",
            fontFamily: "NunitoSans-Regular",
            fontSize: (Dimensions.get("window").width * 3.73) / 100,
          }}
        >
          {category.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const item = (item: any): JSX.Element => (
    <TouchableOpacity
      onPress={() => {
        console.log((Dimensions.get("window").width * 19.04) / 100);
      }}
      style={{
        width: (Dimensions.get("window").width * 42) / 100,
        height: (Dimensions.get("window").height * 31) / 100,
        marginBottom: 15,
      }}
    >
      <View>
        <Image
          source={item.item.image}
          style={{
            width: "100%",
            height: (Dimensions.get("window").height * 24.63) / 100,
            borderRadius: 10,
          }}
        />
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: "rgba(96, 96, 96, 0.4)",
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: (Dimensions.get("window").height * 19.7) / 100,
            left: (Dimensions.get("window").width * 31.2) / 100,
            borderRadius: 8,
          }}
        >
          <Fontisto name="shopping-bag" size={16} color="white" />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "NunitoSans-Light",
            fontSize: (Dimensions.get("window").width * 3.73) / 100,
            marginTop: (Dimensions.get("window").width * 2.66) / 100,
          }}
        >
          {item.item.name}
        </Text>
        <Text
          style={{
            fontFamily: "NunitoSans-Bold",
            fontSize: (Dimensions.get("window").width * 3.73) / 100,
            marginTop: (Dimensions.get("window").width * 1.13) / 100,
          }}
        >
          $ {item.item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatListContainer}>
        <View
          style={{
            height: (Dimensions.get("window").height * 6.15) / 100,
            width: "100%",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: (Dimensions.get("window").width * 4.8) / 100,
                fontFamily: "Gelasio-Medium",
                color: "#909090",
              }}
            >
              Make home
            </Text>
            <Text
              style={{
                fontSize: (Dimensions.get("window").width * 4.8) / 100,
                fontFamily: "Gelasio-Medium",
              }}
            >
              BEAUTIFUL
            </Text>
          </View>
        </View>
        <FlatList
          style={styles.categoryContainer}
          data={categoryList}
          showsHorizontalScrollIndicator={false}
          renderItem={categoryItem}
          keyExtractor={(category) => category.name}
          horizontal={true}
        />
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={itemList}
          style={styles.itemContainer}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={item}
          keyExtractor={(item) => item.name}
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
  flatListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  categoryContainer: {
    flexGrow: 0,
    paddingLeft: 2,
    width: "100%",
    marginTop: (Dimensions.get("window").height * 2.46) / 100,
    height: (Dimensions.get("window").height * 9.6) / 100,
  },
  itemContainer: {
    width: "100%",
    marginTop: 20,
  },
});
