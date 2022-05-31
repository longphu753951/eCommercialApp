import { StyleSheet, Dimensions } from "react-native";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: (width * 5.33) / 100,
  },
  contentContainerStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  nameInput: { width: (width * 42.4) / 100 },
  buttonText: {
    fontFamily: "NunitoSans-Regular",
    fontSize: (1.97 * height) / 100,
    width: "100%",
    textAlign: "center",
    color: "#ffffff",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    height: (height * 5.54) / 100,
    borderRadius: 4,
  },
  signInButton: {
    backgroundColor: "#212121",
    width: "100%",
  },

  signUpButton: {
    marginTop: (height * 1.35) / 100,
    backgroundColor: "#767676",
    width: "100%",
  },

  orText: {
    marginTop: (3.57 * height) / 100,
    marginBottom: (1.72 * height) / 100,
    fontSize: (1.6 * height) / 100,
    alignSelf: "center",
  },
  signInWithButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#212121",
    width: (27.73 * width) / 100,
    borderWidth: 0.5,
    marginBottom: (1.35 * height) / 100,
  },
  logo: { width: 18, height: 18 },
  signInWithButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  signUpContainer: {
    flexDirection: "row",
    alignSelf: 'center'
  },
  alreadyText: {
    fontSize: 16,
    fontFamily: "NunitoSans-SemiBold",
    color: "#808080",
  },
  signInText: {
    fontSize: 16,
    fontFamily: "NunitoSans-Bold",
    color: "#303030",
  },
});
