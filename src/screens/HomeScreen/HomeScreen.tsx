import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar} from '@fortawesome/free-regular-svg-icons'
import {  } from '@fortawesome/fontawesome-svg-core';

import { TouchableOpacity } from "react-native-gesture-handler";
const categoryList = [
  {
    name: "Popular",
    outline: faStar,
  },
  {
    name: "Chair",
    outline: faStar,
  },
  {
    name: "Table",
    outline: faStar,
  },
  {
    name: "Armchair",
    outline: faStar,
  },
  {
    name: "Bed",
    outline: faStar,
  },
  {
    name: "Lamb",
    outline: faStar,
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
  },{
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
  }
];
const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const categoryItem = (category: any): JSX.Element => (
    <TouchableOpacity
      onPress={() => {
        console.log(category.item.name);
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
          backgroundColor: "#F0F0F0",
          borderRadius: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <FontAwesomeIcon size={(Dimensions.get("window").width * 6) / 100} icon={ category.item.outline } />
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
      <Image
        source={item.item.image}
        style={{
          width: "100%",
          height: (Dimensions.get("window").height * 24.63) / 100,
          borderRadius: 10,
        }}
      />
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
        <View style={{height: (Dimensions.get("window").height * 6.15) / 100, width: '100%'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: (Dimensions.get("window").width * 4.8) / 100, fontFamily: 'Gelasio-Medium', color: '#909090'}}>Make home</Text>
            <Text style={{fontSize: (Dimensions.get("window").width * 4.8) / 100, fontFamily: 'Gelasio-Medium'}}>BEAUTIFUL</Text>
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
