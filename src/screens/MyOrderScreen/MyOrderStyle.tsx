import { StyleSheet, Dimensions } from "react-native";

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
  contentDetailContainer: {
    width: "100%",
    flexDirection: "column",
    flex: 1,
    marginHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
});

export default styles;
