import React from "react";
import {
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Props {
  children?: React.ReactNode;
}

const defaultProps = {
  children: undefined,
};

const FCKeyBoardAvoidingView: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> 
          <View style={{width: '100%', height: '100%'}} />
        </TouchableWithoutFeedback>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        
          {children}
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
