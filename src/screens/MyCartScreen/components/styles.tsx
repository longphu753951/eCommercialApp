
import { Dimensions, StyleSheet } from "react-native";


export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
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
    checkOutButton: {
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
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    totalPriceItemText: {
      color: "#303030",
      fontFamily: "NunitoSans-Bold",
      fontSize: (height * 1.97) / 100,
    },
    PromoTextInput: {
      backgroundColor: "white",
      width: (width * 89.33) / 100,
      height: (height * 5.41) / 100,
      borderRadius: 10,
      shadowColor: "#000",
      fontFamily: "NunitoSans-Regular",
      fontSize: (height * 1.97) / 100,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.41,
  
      elevation: 2,
      paddingLeft: (5.33 * width) / 100,
      flexWrap: "wrap",
    },
    promoInputContainer: {
      marginBottom: (height * 2.46) / 100,
      flexDirection: "row",
    },
    promoButton: {
      width: (height * 5.41) / 100,
      height: (height * 5.41) / 100,
      backgroundColor: "rgba(48, 48, 48, 1)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    promoButtonContainer: {
      position: "absolute",
      right: 0,
      top: 0,
      elevation: 2,
    },
    totalPriceContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: (5.066 * width) / 100,
      marginBottom: (2.46 * height) / 100,
    },
    totalText: {
      fontSize: (2.46 * height) / 100,
      fontFamily: "NunitoSans-Bold",
      color: "#808080",
    },
  });