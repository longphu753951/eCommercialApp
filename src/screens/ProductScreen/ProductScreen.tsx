import React, { useState, useCallback, useRef } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  useWindowDimensions,
} from "react-native";
import { product } from "config/mockData";
import _ from "lodash";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { getDisplay } from "config/size";
import {IncrementButton} from "components";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const ProductScreen = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const [chosenColor, setChosenColor] = useState(product.colors[0]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  let a: number = getDisplay();

  const Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();
    return (
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 30,
          right: 50,
        }}
      >
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * ((Dimensions.get("window").width * 86.13) / 100),
            (Dimensions.get("window").width * 86.13) / 100,
            (index + 1) * ((Dimensions.get("window").width * 86.13) / 100),
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [15, 30, 15],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["#F0F0F0", "#303030", "#F0F0F0"],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index.toString()}
              style={[
                { width: dotWidth, backgroundColor },
                {
                  height: 4,
                  borderRadius: 4,
                  marginHorizontal:
                    (Dimensions.get("window").width * 0.66) / 100,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              width: (Dimensions.get("window").width * 86.13) / 100,
              height: (Dimensions.get("window").height * 56.03) / 100,
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
              data={product.images}
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
                    source={item}
                  />
                );
              }}
            />
            <Paginator data={product.images} scrollX={scrollX} />
          </View>

          <View
            style={{
              position: "absolute",
              left: responsiveWidth(5.33),
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
            <View
              style={{
                backgroundColor: "white",
                marginTop: (Dimensions.get("window").height * 4.92) / 100,
                width: (Dimensions.get("window").height * 7.88) / 100,
                height: (Dimensions.get("window").height * 23.64) / 100,
                borderRadius: (Dimensions.get("window").height * 23.64) / 100,
                shadowColor: "#8A959E",
                shadowOffset: {
                  width: 2,
                  height: 3,
                },
                shadowOpacity: 0.21,
                shadowRadius: 10,
                elevation: 2,
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: (height * 1.847) / 100,
              }}
            >
              {product.colors.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setChosenColor(item);
                    }}
                    style={{
                      width: (height * 4.5) / 100,
                      height: (height * 4.5) / 100,
                      backgroundColor: item,
                      borderRadius: 500,
                      borderWidth: (height * 0.61) / 100,
                      borderColor: chosenColor === item ? "#909090" : "#F0F0F0",
                    }}
                  ></TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <View style={styles.informationContainer}>
          <Text style={styles.itemName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>$ {product.price}</Text>
            <IncrementButton onChangeValue ={(child: number) => {
              console.log(child)
            }}/>
          </View>
          <View style={styles.ratingContainer}>
            <Rating
              type="star"
              ratingCount={1}
              imageSize={(height * 2.46) / 100}
              readonly
              startingValue={0.9}
            />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.reviews}>({product.reviews} reviews)</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bookMarkButton}>
              <FontAwesome5
                name="bookmark"
                size={(height * 2.95) / 100}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: (2.46 * height) / 100,
  },
  bookMarkButton: {
    backgroundColor: "#E0E0E0",
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
