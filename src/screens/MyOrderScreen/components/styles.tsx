import { StyleSheet, Dimensions } from "react-native";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentDetailContainer: {
    width: "100%",
    flexDirection: "column",
    flex: 1,
    marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
  text: {
    fontSize: (1.97 * height) / 100,
    fontFamily: 'NunitoSans-SemiBold'
  },
});

