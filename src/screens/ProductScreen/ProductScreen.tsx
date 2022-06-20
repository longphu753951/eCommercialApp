import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { product } from "config/mockData";
import _ from "lodash";
import { FontAwesome } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { getDisplay } from "config/size";
import { IncrementButton } from "components";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, deleteBookmark } from "reducers/user";
import { PageControl, Colors } from "react-native-ui-lib";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const ProductScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(1);
  const productMain = useSelector((state) => state.item.product);
  const bookmark: any[] = useSelector((state) => state.user.bookmark);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const goBack = () => {
    navigation.goBack();
  };

  const [chosenProductAttribute, setChosenProductAttribute] = useState([]);
  const [isShowingModal, setIsShowingModal] = useState(false);

  useEffect(() => {
    if (productMain !== null) {
      onSetChosenItem(productMain.productAttribute[0]);
    }
  }, [productMain]);

  let a: number = getDisplay();

  const onSetChosenItem = useCallback(
    (item: any) => {
      const choosenProduct = item;
      setChosenProductAttribute(choosenProduct);
      const listBookmarkId: string[] = bookmark.bookmarkDetail.map(
        (item) => item.productAttribute.sku
      );
      setIsBookmarked(listBookmarkId.includes(item.sku));
    },
    [chosenProductAttribute]
  );

  const setBookmark = async () => {
    if (!isBookmarked) {
      await dispatch({
        type: addBookmark.TRIGGER,
        data: {
          bookmark: bookmark.id,
          productAttribute: chosenProductAttribute.sku,
        },
      });
    } else {
      const selectedBookmark = bookmark.bookmarkDetail.find((item) => {
        return item.productAttribute.sku === chosenProductAttribute.sku;
      });
      await dispatch({
        type: deleteBookmark.TRIGGER,
        id: selectedBookmark.id,
      });
    }

    setIsBookmarked(!isBookmarked);
  };

  const Modal = (props: any) => {
    const { showing } = props;

    return (
      <Modal animationType="slide" transparent={true} visible={showing}>
        <View>
          <Text>asdasdasdasdas</Text>
        </View>
      </Modal>
    );
  };

  if (productMain !== null)
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={{
                width: (Dimensions.get("window").width * 86.13) / 100,
                height: (Dimensions.get("window").height * 54.03) / 100,
                borderBottomLeftRadius: 50,
                overflow: "hidden",
              }}
            >
              <FlatList
                style={{
                  width: (Dimensions.get("window").width * 86.13) / 100,
                }}
                horizontal
                pagingEnabled
                data={chosenProductAttribute.productImage}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <Image
                      resizeMode="cover"
                      style={{
                        width: (Dimensions.get("window").width * 86.13) / 100,
                        height: (Dimensions.get("window").height * 56.03) / 100,
                      }}
                      key={index}
                      source={{ uri: item.image }}
                    />
                  );
                }}
              />
            </View>
            <PageControl
              size={20}
              spacing={8}
              limitShownPages={true}
              containerStyle={{
                position: "absolute",
                bottom: 30,
                right: 50,
                flexWrap: "wrap",
              }}
              inactiveColor={'#d4d4d4'}
              color={Colors.grey20}
              numOfPages={20}
              currentPage={currentIndex}
              onPagePress={(index) => {setCurrentIndex(index)}}
            />
            <View
              style={{
                position: "absolute",
                left: responsiveWidth(5.33 * a),
                top: responsiveHeight(7.26 * a),
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: (Dimensions.get("window").height * 6.157) / 100,
                  height: (Dimensions.get("window").height * 6.157) / 100,
                  backgroundColor: "white",
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#8A959E",
                  shadowOffset: {
                    width: 2,
                    height: 3,
                  },
                  shadowOpacity: 0.21,
                  shadowRadius: 10,
                  elevation: 2,
                }}
                onPress={() => goBack()}
              >
                <Entypo
                  name="chevron-thin-left"
                  size={(Dimensions.get("window").height * 2.95) / 100}
                  color="black"
                />
              </TouchableOpacity>
              {productMain.productAttribute.length >= 2 && (
                <View
                  style={{
                    backgroundColor: "white",
                    marginTop: (Dimensions.get("window").height * 4.92) / 100,
                    width: (Dimensions.get("window").height * 7.88) / 100,
                    height: (Dimensions.get("window").height * 23.64) / 100,
                    borderRadius:
                      (Dimensions.get("window").height * 23.64) / 100,
                    shadowColor: "#8A959E",
                    shadowOffset: {
                      width: 2,
                      height: 3,
                    },
                    shadowOpacity: 0.21,
                    shadowRadius: 10,
                    elevation: 2,
                    alignItems: "center",
                    justifyContent:
                      productMain.productAttribute.length == 2
                        ? "flex-start"
                        : "space-between",
                    paddingVertical: (height * 1.847) / 100,
                  }}
                >
                  {productMain.productAttribute.map((item: any) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onSetChosenItem(item)}
                        disabled={loading === "LOADING"}
                        style={{
                          width: (height * 4.5) / 100,
                          height: (height * 4.5) / 100,
                          backgroundColor: item.hexColor,
                          borderRadius: 500,
                          marginBottom:
                            productMain.productAttribute.length == 2
                              ? (height * 3.69) / 100
                              : 0,
                          borderWidth: (height * 0.61) / 100,
                          borderColor:
                            chosenProductAttribute === item
                              ? "#909090"
                              : "#F0F0F0",
                        }}
                      ></TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.itemName}>{productMain.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>
                $ {chosenProductAttribute.price}
              </Text>
              <IncrementButton
                defaultCount={1}
                onChangeValue={(child: number) => {}}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("RatingScreen")}
              style={styles.ratingContainer}
            >
              <Rating
                type="star"
                ratingCount={1}
                imageSize={(height * 2.46) / 100}
                readonly
                startingValue={productMain.rating / 5}
              />
              <Text style={styles.rating}>{productMain.rating}</Text>
              <Text style={styles.reviews}>(50 reviews)</Text>
            </TouchableOpacity>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{productMain.description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={loading === "LOADING"}
                onPress={() => setBookmark()}
                style={[
                  styles.bookMarkButton,
                  { backgroundColor: isBookmarked ? "#303030" : "#E0E0E0" },
                ]}
              >
                <FontAwesome
                  name={isBookmarked ? "bookmark" : "bookmark-o"}
                  size={(height * 2.95) / 100}
                  color={isBookmarked ? "white" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addToCartButton}
                disabled={loading === "LOADING"}
              >
                <Text style={styles.addToCartText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  else {
    return (
      <View
        style={[
          styles.container,
          { alignContent: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#8A959E" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  informationContainer: {
    marginHorizontal: (height * 3.07) / 100,
    marginTop: (height * 3.07) / 100,
  },
  itemName: {
    fontSize: (height * 2.95) / 100,
    fontFamily: "Gelasio-Medium",
  },
  priceText: {
    fontSize: (height * 3.69) / 100,
    fontFamily: "NunitoSans-Bold",
    color: "#303030",
  },
  priceContainer: {
    marginTop: (height * 1.23) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: (height * 3.69) / 100,
    height: (height * 3.69) / 100,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  icrementButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countNumber: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (height * 2.21) / 100,
    marginHorizontal: (width * 4) / 100,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: (1.412 * height) / 100,
    justifyContent: "flex-start",
  },
  rating: {
    fontFamily: "NunitoSans-Bold",
    fontSize: (height * 2.21) / 100,
    marginLeft: (width * 2.66) / 100,
  },
  reviews: {
    marginLeft: (5.33 * width) / 100,
    color: "#808080",
    fontSize: (1.72 * height) / 100,
    fontFamily: "NunitoSans-Regular",
  },
  descriptionContainer: {
    marginTop: (1.72 * height) / 100,
  },
  description: {
    fontFamily: "NunitoSans-Light",
    fontSize: (1.72 * height) / 100,
    height: (14.02 * height) / 100,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: (2.46 * height) / 100,
  },
  bookMarkButton: {
    borderRadius: 16,
    width: (height * 7.4) / 100,
    height: (height * 7.4) / 100,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: "#303030",
    marginLeft: (5.33 * width) / 100,
    width: (66.66 * width) / 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartText: {
    fontFamily: "NunitoSans-Regular",
    color: "#fff",
    fontSize: (2.46 * height) / 100,
  },
});
