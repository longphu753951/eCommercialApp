import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useBackButton } from "@react-navigation/native";

interface Props {
  title?: string;
  isBackButton?: boolean;
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
  onPressRightButton?(): void;
  onPressLeftButton?(): void;
}

const Header: React.FC<Props> = (props: Props) => {
  const {
    title,
    isBackButton,
    rightButton,
    leftButton,
    onPressLeftButton,
    onPressRightButton,
  } = props;
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

  return (
    <View style={{ alignItems: "center" }}>
      <TitleComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: (Dimensions.get("window").width * 4.8) / 100,
    fontFamily: "Gelasio-Medium",
  },
});

export default Header;
