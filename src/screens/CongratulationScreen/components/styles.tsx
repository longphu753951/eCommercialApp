import { Dimensions, StyleSheet } from "react-native";

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
    marginTop: (height * 9.85) / 100
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: (2.09 * height) / 100,
    borderRadius: 10,
  },
  signInButton: {
    backgroundColor: "#212121",
    width: "100%",
  },
  backToHomeButton: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderWidth: 1,
    marginTop: (3.07 * height) / 100,
    borderColor: '#212121',
  },
  buttonText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (1.97 * height) / 100,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
  },
});