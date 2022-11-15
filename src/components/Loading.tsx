import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
});

export default Loading;
