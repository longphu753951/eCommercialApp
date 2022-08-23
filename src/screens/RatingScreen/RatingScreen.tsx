import React, { useState, useEffect, useCallback } from "react";
import { Header } from "components";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  RefreshControl,
} from "react-native";
import { rating } from "config/mockData";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CartItem from "components/CartItem";
import { Rating } from "react-native-ratings";
import { Divider } from "react-native-paper";
import Card from "components/Card";
import { FlatList } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const RatingScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const reviewCard = (item) => {
    return (
      <Card cardStyle={styles.card}>
        <Image
          source={item.item.image}
          resizeMode={"contain"}
          style={{
            width: (4.92 * height) / 100,
            height: (4.92 * height) / 100,
            position: "absolute",
            top: -(2.46 * height) / 100,
            left: (39.46 * width) / 100,
            borderRadius: 100,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.userName}>{item.item.name}</Text>
            <Rating
              style={styles.ratingUser}
              type="star"
              ratingCount={5}
              imageSize={(height * 1.97) / 100}
              readonly
              startingValue={item.item.rating}
            />
          </View>
          <Text style={styles.votingDate}>{item.item.date}</Text>
        </View>
        <Text style={styles.detailReviewText}>
          {item.item.reviewDetail}
        </Text>
      </Card>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Header title={"RATING & REVIEW"} />
        <View style={styles.contentContainer}>
          <CartItem
            isRemoving={false}
            image={rating.product.image}
            cartStyle = {styles.cartStyle}
            content={
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.nameText}>{rating.product.name}</Text>
                <View style={styles.ratingAllContainer}>
                  <Rating
                    type="star"
                    ratingCount={1}
                    imageSize={(height * 2.46) / 100}
                    readonly
                    startingValue={0.9}
                  />
                  <Text style={styles.rating}>{rating.product.rating}</Text>
                </View>
              </View>
            }
            bottomContent={
              <Text style={styles.reviewText}>
                {rating.product.review} reviews
              </Text>
            }
          />
          <Divider />
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.itemFlatList}
            data={rating.reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={reviewCard}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    // marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
  nameText: {
    fontSize: (Dimensions.get("window").height * 1.724) / 100,
    fontFamily: "NunitoSans-Regular",
    color: "#606060",
  },
  rating: {
    fontFamily: "NunitoSans-Bold",
    fontSize: 24,
    marginLeft: (width * 2.66) / 100,
  },
  card: {
    width: (width * 89.33) / 100,
    marginTop: (height * 4.13) / 100,
    paddingVertical: (height * 2.46) / 100,
    paddingHorizontal: (width * 4.26) / 100,
  },
  ratingUser: {
    marginTop: (height * 0.615) / 100,
    marginBottom: (height * 1.847) / 100,
    marginLeft: -(width * 4) / 100,
  },
  userName: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (height * 1.72) / 100,
  },
  ratingAllContainer: {
    flexDirection: "row",
    marginTop: (height * 1.23) / 100,
    alignItems: "center",
  },
  reviewText: {
    fontSize: (height * 2.21) / 100,
    fontFamily: "NunitoSans-SemiBold",
  },
  votingDate: {
    fontSize: (1.47 * height) / 100,
    color: "#808080",
    fontFamily: "NunitoSans-Regular",
  },
  detailReviewText: {
    fontSize: (1.72 * height) / 100,
    color: "#303030",
    fontFamily: "NunitoSans-Regular",
  },
  itemFlatList: {
    flex: 1,
    width: "100%",
  },
  cartStyle: {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
  }
});
