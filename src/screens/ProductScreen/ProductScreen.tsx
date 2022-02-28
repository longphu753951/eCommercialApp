import React, { useState, useCallback, useRef } from "react";
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
  TouchableOpacity,
  PixelRatio,
  Animated,
  useWindowDimensions,
} from "react-native";
import { product } from "config/mockData";
import _ from "lodash";
import { ScrollView } from "react-native-gesture-handler";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { getDisplay } from "config/size";

export const ProductScreen = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

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
          <FlatList
            style={{
              width: (Dimensions.get("window").width * 86.13) / 100,
              height: (Dimensions.get("window").height * 56.03) / 100,
              borderBottomLeftRadius: 50,
              overflow: "hidden",
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
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
          <Paginator data={product.images} scrollX={scrollX} />
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
              }}
            ></View>
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
});
