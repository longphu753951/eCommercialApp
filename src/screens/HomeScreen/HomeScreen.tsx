import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import {} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useRefreshing } from "./HomeFunction";
import {
  categoryRoutine,
  productByCategoryRoutime,
  productByIdRoutime,
} from "reducers/item";
import { Header } from "components";
import { Category, Item } from "./components";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.item.listCategories);
  const flatListRef = React.useRef();
  const products = useSelector((state) => state.item.listProducts);
  const cart = useSelector((state) => state.cart);
  console.log(cart)

  useEffect(() => {
    dispatch({ type: categoryRoutine.TRIGGER });
    dispatch({ type: productByCategoryRoutime.TRIGGER, id: 0 });
  }, []);

  const [chooseCat, setChooseCat] = useState(0);
  const { refreshing, onRefresh } = useRefreshing();
  const onSelectCategory = (category) => {
    setChooseCat(category.id);
    onRefresh(category.id);
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const onSelectItem = async (id) => {
    await dispatch({
      type: productByIdRoutime.TRIGGER,
      id: id,
    });
    navigation.navigate("ProductScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header
          leftButton={"search1"}
          isBackButton={false}
          rightButton={"shoppingcart"}
          onPressRightButton={() => {
            navigation.navigate("MyCartScreen");
          }}
        />

        <View style={styles.bodyContainer}>
          <FlatList
            style={styles.categoryContainer}
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={(category) => (
              <Category
                category={category.item}
                isChoosen={category.item.id === chooseCat}
                onSelectCategory={() => onSelectCategory(category.item)}
              />
            )}
            keyExtractor={(category) => category.id}
            horizontal={true}
          />

          <FlatList
            ref={flatListRef}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={products}
            style={styles.itemContainer}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={(item) => (
              <Item
                item={item.item}
                onSelectItem={() => onSelectItem(item.item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  onRefresh(chooseCat);
                }}
              />
            }
          />
        </View>
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
  bodyContainer: {
    paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
});
