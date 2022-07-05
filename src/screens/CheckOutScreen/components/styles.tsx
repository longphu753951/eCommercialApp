import React from "react";
import { StyleSheet, Dimensions } from "react-native";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  card: {
    paddingVertical: (Dimensions.get("window").height * 2.21) / 100,
    paddingHorizontal: (Dimensions.get("window").height * 2.46) / 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: (Dimensions.get("window").height * 1.85) / 100,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  profileImage: {
    height: (Dimensions.get("window").height * 9.85) / 100,
    width: (Dimensions.get("window").height * 9.85) / 100,
    borderRadius: 200,
  },
  profileContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",

    marginTop: (height * 1.8) / 100,
  },
  profileTextContainer: {
    marginLeft: (Dimensions.get("window").height * 2.46) / 100,
    justifyContent: "center",
  },
  categoryTextContainer: {
    justifyContent: "center",
  },
  name: {
    fontFamily: "NunitoSans-Bold",
    fontSize: (Dimensions.get("window").height * 2.46) / 100,
  },
  email: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
  },
  nameText: {
    color: "#303030",
    fontFamily: "NunitoSans-Bold",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
  },
  addressText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 1.72) / 100,
    color: "#808080",
  },
  priceTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: (height * 1.84) / 100,
  },
  price: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (2.21 * height) / 100,
  },
  priceContainer: {
    marginTop: (height * 4.67) / 100,
    paddingHorizontal: (2.72 * width) / 100,
    paddingBottom: (height * 1.84) / 100,
  },
  checkOutButton: {
    width: (Dimensions.get("window").width * 89.06) / 100,
    height: (Dimensions.get("window").height * 6.15) / 100,
    backgroundColor: "rgba(48, 48, 48, 1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: (1.8 * height) / 100,
  },
  addAllText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (Dimensions.get("window").height * 2.21) / 100,
    color: "white",
  },
  deliveryBrandImageContainer: {
    marginHorizontal: (4.8 * width) / 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.11,
    shadowRadius: 16.0,
    elevation: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});
