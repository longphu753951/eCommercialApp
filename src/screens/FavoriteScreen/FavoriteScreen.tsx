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
import { Fontisto } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { itemList } from "config/mockData";
import _ from "lodash";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const FavoriteScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [chooseCat, setChooseCat] = useState("Popular");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const item = (item: any): JSX.Element => {
    return (
      <View style={styles.itemContainer}>
        <View style={{ flexDirection: "row" }}>
          <Image style={styles.itemImage} source={item.item.image} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.nameText}>{item.item.name}</Text>
            <Text style={styles.priceText}>$ {item.item.price}</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <FontAwesomeIcon
              size={(Dimensions.get("window").height * 2.401) / 100}
              icon={faCircleXmark}
              color={'#BDBDBD'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shoppingIconContainer}>
            <Fontisto
              name="shopping-bag"
              size={(Dimensions.get("window").height * 1.97) / 100}
              color="#303030"
            />
          </TouchableOpacity>
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
          <Text style={styles.titleText}>FAVORITE</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.itemFlatList}
          data={itemList}
          ItemSeparatorComponent={ItemDivider}
          keyExtractor={(item) => item.name}
          renderItem={item}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <TouchableOpacity style={styles.addAllButton}>
          <Text style={styles.addAllText}>Add all to my cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  itemContainer: {
    marginTop: (Dimensions.get("window").height * 1.47) / 100,
    paddingBottom: (Dimensions.get("window").height * 1.47) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
  itemFlatList: {
    flex: 1,
    width: "100%",
    marginTop: (Dimensions.get("window").height * 1.72) / 100,
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  itemImage: {
    width: (Dimensions.get("window").height * 12.31) / 100,
    height: (Dimensions.get("window").height * 12.31) / 100,
    borderRadius: 10,
  },
  itemTextContainer: {
    marginLeft: (Dimensions.get("window").width * 5.33) / 100,
  },
  nameText: {
    fontSize: (Dimensions.get("window").height * 1.724) / 100,
    fontFamily: "NunitoSans-Regular",
    color: "#606060",
  },
  priceText: {
    fontFamily: "NunitoSans-Bold",
    marginTop: (Dimensions.get("window").height * 0.615) / 100,
    fontSize: (Dimensions.get("window").height * 1.97) / 100,
  },
  addAllButton: {
    width: (Dimensions.get("window").width * 89.06) / 100,
    height: (Dimensions.get("window").height * 6.15) / 100,
    backgroundColor: "rgba(48, 48, 48, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: (Dimensions.get("window").height * 2.46) / 100,
  },
  addAllText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
    color: "white",
  },
  shoppingIconContainer: {
    width: (Dimensions.get("window").height * 3.69) / 100,
    height: (Dimensions.get("window").height * 3.69) / 100,
    backgroundColor: "rgba(224, 224, 224, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
