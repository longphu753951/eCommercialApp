import React, { useState, useCallback, useEffect } from "react";
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
  TouchableOpacity
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { itemList } from "config/mockData";
import _ from "lodash";
import { CartItem, Header } from "components";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookmark, getBookmark } from "reducers/user";
const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const FavoriteScreen = () => {
  const navigation = useNavigation();
  const bookmark = useSelector((state) => state.user.bookmark);
  const [bookmarkDetailList, setBookmarkDetailList] = useState(
    bookmark?.bookmarkDetail
  );
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const onRefresh = useCallback(() => {
    dispatch({ type: getBookmark.TRIGGER });
  }, []);

  useEffect(() => {
    setBookmarkDetailList(bookmark?.bookmarkDetail);
  }, [bookmark]);

  const listFavorite = () => {
    return bookmarkDetailList.length > 0 ? (
      <>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.itemFlatList}
          data={bookmarkDetailList}
          ItemSeparatorComponent={ItemDivider}
          keyExtractor={(item) => item.id}
          renderItem={item}
          refreshControl={
            <RefreshControl
              refreshing={loading === "LOADING"}
              onRefresh={onRefresh}
            />
          }
        />
        <TouchableOpacity style={styles.addAllButton}>
          <Text style={styles.addAllText}>Add all to my cart</Text>
        </TouchableOpacity>
      </>
    ) : (
      <View style={{ alignItems: "center" }}>
        <Image
          resizeMode="contain"
          style={{ height: (height * 30.66) / 100 }}
          source={require("assets/images/emptyCart.png")}
        />
        <Text
          style={{
            fontFamily: "Gelasio-SemiBold",
            fontSize: (3.5 * height) / 100,
            color: "#303030",
            marginTop: (4 * height) / 100,
            letterSpacing: (width * 0.5) / 100,
          }}
        >
          Collect love!
        </Text>
        <Text
          style={{
            fontFamily: "NunitoSans-SemiBold",
            fontSize: (2.21 * height) / 100,
            color: "#606060",
            letterSpacing: (width * 0.13) / 100,
            textAlign: 'center',
            marginTop: (1.3 * height) / 100
          }}
        >
          Like a product you see ? save them here to your favourites
        </Text>
      </View>
    );
  };

  const item = (item: any): JSX.Element => {
    return (
      <CartItem
        image={{ uri: item.item.productAttribute.productImage[0].image }}
        disable={loading === "LOADING"}
        onRemoving={async () => {
          await dispatch({
            type: deleteBookmark.TRIGGER,
            id: item.item.id,
          });
        }}
        content={
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.nameText}>
              {item.item.productAttribute.name}
            </Text>
            <Text style={styles.priceText}>
              $ {item.item.productAttribute.price}
            </Text>
          </View>
        }
        bottomContent={
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity style={styles.shoppingIconContainer}>
              <Fontisto
                name="shopping-bag"
                size={(height * 1.97) / 100}
                color="#303030"
              />
            </TouchableOpacity>
          </View>
        }
      />
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
        <Header
          title={"FAVORITE"}
          leftButton={"search1"}
          isBackButton={false}
          rightButton={"shoppingcart"}
          onPressRightButton={() => {
            navigation.navigate("MyCartScreen");
          }}
        />
        <View style={styles.bodyContainer}>{listFavorite()}</View>
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
    marginTop: (height * 1.47) / 100,
    paddingBottom: (height * 1.47) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
  },
  itemFlatList: {
    flex: 1,
    width: "100%",
  },
  titleText: {
    fontSize: (width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  itemImage: {
    width: (height * 12.31) / 100,
    height: (height * 12.31) / 100,
    borderRadius: 10,
  },
  itemTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  contentItemContainer: {
    justifyContent: "space-between",
    flexDirection: "column",
    marginLeft: (Dimensions.get("window").width * 5.33) / 100,
    backgroundColor: "blue",
  },
  bottomCotainer: {
    alignContent: "flex-end",
  },
});
