import React from "react";
import { SafeAreaView, ScrollView, Text, View, FlatList } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
const categoryList = [
  {
    name: "popular",
    outline: "fa-star",
  },
  {
    name: "chair",
    outline: "fa-chair",
  },
  {
    name: "table",
    outline: "fa-star",
  },
  {
    name: "armchair",
    outline: "fa-couch",
  },
  {
    name: "bed",
    outline: "fa-bed",
  },
  {
    name: "lamb",
    outline: "fa-lamb-desk",
  },
];
export const HomeScreen = () => {
  const categoryItem = (category: any): JSX.Element => (
    <TouchableOpacity
        onPress={() => {
            console.log(category.item.name)
        }}
        style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'blue',
            marginRight: 12,
        }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          backgroundColor: "green",
          
          borderRadius: 12,
        }}
      ></View>
      <Text style={{textAlign: 'center'}}>{category.item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FlatList
        data={categoryList}
        renderItem={categoryItem}
        keyExtractor={(category) => category.name}
        style={{ backgroundColor: "red", height: 50 }}
        horizontal={true}
      />
      <Text>Home</Text>
    </SafeAreaView>
  );
};
