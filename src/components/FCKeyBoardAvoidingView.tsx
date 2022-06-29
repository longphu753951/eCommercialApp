import React from "react";
import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props {
  children?: React.ReactNode;
  loading: string;
  isFlatList: boolean;
}

const defaultProps = {
  children: undefined,
  loading: "",
  isFlatList: false
};

const FCKeyBoardAvoidingView: React.FC<Props> = (props: Props) => {
  const { children, loading, isFlatList } = props;

  const getHOCType = () => {
    return isFlatList ? (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >{children}</KeyboardAvoidingView>
     
    ) : (
      <TouchableWithoutFeedback
      style={{ width: "100%", height: "100%" }}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      {loading === "TRIGGER" && (
        <View
          style={{
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
          }}
        >
          <ActivityIndicator size={"large"} color={"white"} />
        </View>
      )}
      <SafeAreaView style={styles.container}>{getHOCType()}</SafeAreaView>
    </>
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
