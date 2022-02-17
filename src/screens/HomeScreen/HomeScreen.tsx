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
import { Fontisto } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { categoryList, itemList } from "config/mockData";
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
        style={styles.categoryButtonContainer}
      >
        <View
          style={{
            width: (Dimensions.get("window").height * 5.42) / 100,
            height: (Dimensions.get("window").height * 5.42) / 100,
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
              height: (Dimensions.get("window").height * 3.44) / 100,
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
            marginTop: (Dimensions.get("window").height * 0.61) / 100,
            textAlign: "center",
            color: "#808080",
            fontFamily: "NunitoSans-Regular",
            fontSize: (Dimensions.get("window").height * 1.724) / 100,
          }}
        >
          {category.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const item = (item: any): JSX.Element => (
    <TouchableOpacity
      style={styles.itemButtonContainer}
    >
      <View>
        <Image source={item.item.image} style={styles.itemImage} />
        <View style={styles.shoppingIconContainer}>
          <Fontisto name="shopping-bag" size={(Dimensions.get("window").height * 1.97) / 100} color="white" />
        </View>
      </View>
      <View style={styles.itemContentContainer}>
        <Text
          style={[
            {
              fontFamily: "NunitoSans-Light",
              fontSize: (Dimensions.get("window").height * 1.724) / 100,
              marginTop: (Dimensions.get("window").width * 2.66) / 100,
            },
          ]}
        >
          {item.item.name}
        </Text>
        <Text
          style={{
            fontFamily: "NunitoSans-Bold",
            fontSize: (Dimensions.get("window").height * 1.724) / 100,
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
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={[{ color: "#909090" }, styles.titleText]}>
            Make home
          </Text>
          <Text style={styles.titleText}>BEAUTIFUL</Text>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
  categoryContainer: {
    flexGrow: 0,
    paddingLeft: 2,
    width: "100%",
    marginTop: (Dimensions.get("window").height * 2.46) / 100,
    height: (Dimensions.get("window").height * 10.83) / 100,
  },
  itemContainer: {
    width: "100%",
    marginTop: (Dimensions.get("window").height * 2.46) / 100,
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  shoppingIconContainer: {
    width: (Dimensions.get("window").height * 3.69) / 100,
    height: (Dimensions.get("window").height * 3.69) / 100,
    backgroundColor: "rgba(96, 96, 96, 0.4)",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: (Dimensions.get("window").height * 19.7) / 100,
    left: (Dimensions.get("window").width * 31.2) / 100,
    borderRadius: 8,
  },
  itemImage: {
    width: "100%",
    height: (Dimensions.get("window").height * 24.63) / 100,
    borderRadius: 10,
  },
  itemButtonContainer: {
    width: (Dimensions.get("window").width * 42) / 100,
    height: (Dimensions.get("window").height * 31) / 100,
    marginBottom: 15,
  },
  categoryButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: (Dimensions.get("window").width * 6.66) / 100,
  },
  itemContentContainer: { 
    flexDirection: "column" 
  },
});
