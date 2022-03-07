import React from "react";
import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props {
  children?: React.ReactNode;
}

const defaultProps = {
  children: undefined,
};

const FCKeyBoardAvoidingView: React.FC<Props> = (props: Props)=> {
    const {children} = props;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback style={{ height: "100%" }}>
          {children}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

FCKeyBoardAvoidingView.defaultProps = defaultProps;

const styles = StyleSheet.create({
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
});

export default FCKeyBoardAvoidingView;
