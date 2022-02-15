import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
const categoryList = [
  {
    name: "Popular",
    outline: "fa-star",
  },
  {
    name: "Chair",
    outline: "fa-chair",
  },
  {
    name: "Table",
    outline: "fa-star",
  },
  {
    name: "Armchair",
    outline: "fa-couch",
  },
  {
    name: "Bed",
    outline: "fa-bed",
  },
  {
    name: "Lamb",
    outline: "fa-lamb-desk",
  },
];
const itemList = [
  {
    name: "Black Simple Lamp",
    price: "12.00",
    image: require('assets/images/demo-item/lamb.png')
  },
  {
    name: "Minimal Stand",
    price: "25.00",
    image: require('assets/images/demo-item/stand.png')
  },
  {
    name: "Coffee Chair",
    price: "20.00",
    image: require('assets/images/demo-item/chair.png')
  },
  {
    name: "Simple Desk",
    price: "50.00",
    image: require('assets/images/demo-item/desk.png')
  },
]
export const HomeScreen = () => {

  const categoryItem = (category: any): JSX.Element => (
    <TouchableOpacity
      onPress={() => {
        console.log(category.item.name);
      }}
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 25
      }}
    >
      <View
        style={{
          width: Dimensions.get('window').width*11.73/100,
          height: Dimensions.get('window').width*11.73/100,
          backgroundColor: "green",
          borderRadius: 12,
        }}
      ></View>
      <Text style={{ textAlign: "center" }}>{category.item.name}</Text>
    </TouchableOpacity>
  );

  const item = (item: any): JSX.Element => (
    <TouchableOpacity
      style={{
        backgroundColor: "blue",
        width: Dimensions.get('window').width*42/100,
        height: Dimensions.get('window').height*31/100,
        marginBottom: 15,
      }}
    >

    </TouchableOpacity>
  )

  return (
    <SafeAreaView
      style={styles.container}
    >
      <View style={styles.flatListContainer}>
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
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={item}
          keyExtractor={(item) => item.name}
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
    backgroundColor: 'red',
    flexGrow: 0,
    width: "100%"
  },
  itemContainer: {
    width: "100%",
    marginTop: 20,
  }
});
