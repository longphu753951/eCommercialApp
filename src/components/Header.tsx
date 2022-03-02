import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useBackButton } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  title?: string;
  isBackButton?: boolean;
  rightButton?: string;
  leftButton?: string;
  onPressRightButton?(): void;
  onPressLeftButton?(): void;
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Header: React.FC<Props> = (props: Props) => {
  const {
    title,
    isBackButton,
    rightButton,
    leftButton,
    onPressLeftButton,
    onPressRightButton,
  } = props;
  const navigation = useNavigation();

  const TitleComponent: React.FC = () => {
    if (title) {
      return <Text style={styles.titleText}>{title}</Text>;
    }
    return (
      <>
        <Text style={[{ color: "#909090" }, styles.titleText]}>Make home</Text>
        <Text style={styles.titleText}>BEAUTIFUL</Text>
      </>
    );
  };

  const LeftButton: React.FC = () => {
    const leftFunction = () => {
      isBackButton ? navigation.goBack() : onPressLeftButton;
    };
    return (
      <TouchableOpacity onPress={() => leftFunction()}>
        <AntDesign
          name={isBackButton ? "left" : leftButton}
          size={(height * 2.95) / 100}
          color="#808080"
        />
      </TouchableOpacity>
    );
  };

  const RightButton: React.FC = () => {
    return (
      <TouchableOpacity>
        <AntDesign
          name={rightButton}
          size={(height * 2.95) / 100}
          color="#808080"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.sideButton}>
        <LeftButton />
      </View>
      <View style={styles.titleContainer}>
        <TitleComponent />
      </View>
      <View style={styles.sideButton}>
        {rightButton ? <RightButton /> : null}
      </View>
    </View>
  );
};

Header.defaultProps = {
  title: "",
  isBackButton: true,
  rightButton: "",
  leftButton: "",
  onPressRightButton: () => {},
  onPressLeftButton: () => {},
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
  titleContainer: {
    alignItems: "center",
  },
  sideButton: {
    width: (height * 2.955) / 100,
    height: (height * 2.955) / 100,
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: (8 * height) / 100,
    paddingHorizontal: (Dimensions.get("window").width * 5.33) / 100,
  },
});

export default Header;
